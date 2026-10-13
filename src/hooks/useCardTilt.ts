import { useCallback, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

const MAX_DEG = 3.2;

const canTilt = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 카드 기울기 + 커서 스포트라이트 — 데스크톱(정밀 포인터)에서만 동작합니다.
 * CSS 변수(--rx, --ry, --mx, --my, --spot)만 갱신하므로 리렌더가 없습니다.
 */
export function useCardTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const raf = useRef(0);

  const onPointerMove = useCallback((e: ReactPointerEvent<T>) => {
    if (e.pointerType !== 'mouse' || !canTilt()) return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      el.dataset.tilting = 'true';
      el.style.setProperty('--ry', `${((px - 0.5) * 2 * MAX_DEG).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - py) * 2 * MAX_DEG).toFixed(2)}deg`);
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      el.style.setProperty('--spot', '1');
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    delete el.dataset.tilting;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--spot', '0');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
