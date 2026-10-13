import { useCallback, useRef } from 'react';

import KeyboardStage from 'component/keyboard/KeyboardStage';
import { MOD_KEY } from 'component/palette/CommandPalette';
import { heroTypingSteps } from 'data/heroTyping';
import { profile } from 'data/profile';
import { useScramble } from 'hooks';

import { Copy, Cta, Eyebrow, Foot, Headline, HeroRoot, Ticker } from './homeHero.styles';

/** heroTyping 데이터의 두 문장(숫자는 react-typical 시절의 대기 시간) */
const HERO_LINES = heroTypingSteps.filter(
  (s): s is Extract<typeof s, string> => typeof s === 'string',
);
const TYPED_MAX = 22;

type HomeHeroProps = {
  active: boolean;
  isMobile: boolean;
  onExplore: () => void;
  onOpenPalette: () => void;
};

/** 두 번째 줄의 이름(채종원)만 액센트 색 — 글자 단위 span이라 스크램블 중에도 자리가 고정됩니다. */
function renderLine2(text: string, final: string) {
  const at = final.indexOf(profile.name);
  if (at < 0) return text;
  const end = at + profile.name.length;
  return (
    <>
      {text.slice(0, at)}
      {text
        .slice(at, end)
        .split('')
        .map((c, i) => (
          <span key={i} className="name">
            {c}
          </span>
        ))}
      {text.slice(end)}
    </>
  );
}

export default function HomeHero({ active, isMobile, onExplore, onOpenPalette }: HomeHeroProps) {
  const [line1 = '', line2 = ''] = useScramble(HERO_LINES, active);
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef('surf');

  // 키 입력은 초당 수십 번 올 수 있어 React 상태 대신 DOM을 직접 갱신합니다.
  const onType = useCallback((ch: string) => {
    if (ch === '\b') typed.current = typed.current.slice(0, -1);
    else if (ch === '\n') typed.current = '';
    else typed.current = (typed.current + ch).slice(-TYPED_MAX);
    if (typedRef.current) typedRef.current.textContent = typed.current;
  }, []);

  return (
    <HeroRoot aria-label="소개">
      <KeyboardStage active={active} mobile={isMobile} onType={onType} />

      <Copy>
        <Eyebrow>
          <span className="dot" aria-hidden />
          {profile.role}
        </Eyebrow>
        <Headline data-testid="hero-typing" aria-label={HERO_LINES.join(' ')}>
          <span className="l1" aria-hidden>
            {line1}
          </span>
          <span className="l2" aria-hidden>
            {renderLine2(line2, HERO_LINES[1] ?? '')}
          </span>
        </Headline>
        <Cta>
          <button type="button" className="primary" onClick={onExplore}>
            프로젝트 보기
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />
            </svg>
          </button>
          <button type="button" className="ghost" onClick={onOpenPalette}>
            <span className="keys" aria-hidden>
              <kbd>{MOD_KEY}</kbd>
              <kbd>K</kbd>
            </span>
            <svg
              className="touch-ico"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13 13 4 4" />
            </svg>
            프로젝트 찾기
          </button>
        </Cta>
      </Copy>

      <Foot>
        <Ticker aria-hidden>
          <span className="hint">
            {isMobile
              ? '키캡을 눌러 보세요. 3D 키보드가 같이 눌려요'
              : '키보드를 눌러 보세요. 3D 키캡이 같이 눌려요'}
            {!isMobile && (
              <>
                <kbd>A</kbd>
                <kbd>␣</kbd>
              </>
            )}
          </span>
          <span className="line">
            <span className="pr">›</span>
            <span ref={typedRef}>surf</span>
            <span className="caret" />
          </span>
        </Ticker>
      </Foot>
    </HeroRoot>
  );
}
