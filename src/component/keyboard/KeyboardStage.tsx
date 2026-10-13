import { useContext, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import { ThemeContext } from 'contexts';
import { useIdleReady } from 'hooks';

import type { KeyboardSceneHandle } from './keyboardScene';
import { FallbackBoard, Stage } from './keyboardStage.styles';

type KeyboardStageProps = {
  /** 히어로 섹션이 화면에 떠 있는지 — 아니면 렌더 루프를 멈춥니다. */
  active: boolean;
  mobile: boolean;
  onType?: (ch: string) => void;
};

function webglSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** 캔버스 키캡 라벨이 폴백 폰트로 구워지지 않도록 폰트를 잠깐(최대 1.2s) 기다립니다. */
function waitForFonts() {
  const fonts = document.fonts;
  if (!fonts?.load) return Promise.resolve();
  const loads = Promise.all([
    fonts.load('500 20px "JetBrains Mono"'),
    fonts.load('500 20px "IBM Plex Sans KR"', 'ㅂ'),
  ]).catch(() => undefined);
  return Promise.race([loads, new Promise((r) => setTimeout(r, 1200))]);
}

const FALLBACK_KEYS = Array.from({ length: 18 }, (_, i) => i);
const FALLBACK_ACCENT = new Set([0, 11, 17]);

/**
 * 히어로의 3D 키보드 무대.
 * 텍스트·레이아웃이 먼저 그려진 뒤(load → 첫 페인트 → idle) three 청크를 동적으로 받습니다.
 * 모션 감소 설정이나 WebGL 미지원 환경에서는 CSS로 그린 정적 키보드를 보여 줍니다.
 */
export default function KeyboardStage({ active, mobile, onType }: KeyboardStageProps) {
  const reduceMotion = useReducedMotion();
  const { isDarkMode } = useContext(ThemeContext);
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<KeyboardSceneHandle | null>(null);
  const onTypeRef = useRef(onType);
  onTypeRef.current = onType;
  const activeRef = useRef(active);
  activeRef.current = active;
  const darkRef = useRef(isDarkMode);
  darkRef.current = isDarkMode;

  const [everActive, setEverActive] = useState(active);
  const [shown, setShown] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (active) setEverActive(true);
  }, [active]);

  const useFallback = !!reduceMotion || failed;
  const ready = useIdleReady(everActive && !useFallback, { delay: 250, timeout: 1200 });

  useEffect(() => {
    if (!ready || useFallback) return;
    const host = hostRef.current;
    if (!host) return;
    if (!webglSupported()) {
      setFailed(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [{ createKeyboardScene }] = await Promise.all([
          import('./keyboardScene'),
          waitForFonts(),
        ]);
        if (cancelled) return;
        const handle = createKeyboardScene(host, {
          mobile,
          dark: darkRef.current,
          onType: (ch) => onTypeRef.current?.(ch),
          onReady: () => requestAnimationFrame(() => !cancelled && setShown(true)),
        });
        if (cancelled) {
          handle.dispose();
          return;
        }
        handle.setActive(activeRef.current);
        sceneRef.current = handle;
      } catch (err) {
        if (!cancelled) {
          // eslint-disable-next-line no-console
          console.warn('[keyboard] WebGL 초기화 실패 — 정적 키보드로 대체합니다.', err);
          setFailed(true);
        }
      }
    })();
    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
      setShown(false);
    };
    // mobile은 첫 생성 시점 기준으로 고정합니다(회전·리사이즈마다 다시 만들지 않음).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, useFallback]);

  useEffect(() => {
    sceneRef.current?.setActive(active);
  }, [active]);

  useEffect(() => {
    sceneRef.current?.setDark(isDarkMode);
  }, [isDarkMode]);

  if (useFallback) {
    return (
      <Stage $shown data-fallback="true" aria-hidden="true">
        <FallbackBoard>
          {FALLBACK_KEYS.map((i) => (
            <i key={i} className={FALLBACK_ACCENT.has(i) ? 'a' : undefined} />
          ))}
        </FallbackBoard>
      </Stage>
    );
  }

  return <Stage ref={hostRef} $shown={shown} aria-hidden="true" data-keyboard-stage="true" />;
}
