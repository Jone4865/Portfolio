import styled, { css, keyframes } from 'styled-components';

const MOBILE = '@media (max-width: 919px)';
const EASE = 'cubic-bezier(0.2, 0.7, 0.1, 1)';

const pulse = keyframes`
  50% { box-shadow: 0 0 0 6px rgba(61, 220, 132, 0); }
`;

const blink = keyframes`
  50% { opacity: 0; }
`;

export const HeroRoot = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  isolation: isolate;

  /* 스튜디오 조명 + 은은한 그리드 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -2;
    background:
      radial-gradient(
        60% 55% at 70% 55%,
        rgba(255, 110, 60, ${({ theme }) => (theme.colorScheme === 'dark' ? 0.13 : 0.1)}),
        transparent 70%
      ),
      radial-gradient(40% 40% at 20% 10%, rgba(120, 130, 170, 0.08), transparent 70%);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image:
      linear-gradient(${({ theme }) => theme.cardBorder} 1px, transparent 1px),
      linear-gradient(90deg, ${({ theme }) => theme.cardBorder} 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(70% 60% at 62% 55%, #000 10%, transparent 75%);
    -webkit-mask-image: radial-gradient(70% 60% at 62% 55%, #000 10%, transparent 75%);
    opacity: 0.55;
  }

  ${MOBILE} {
    display: flex;
    flex-direction: column;

    [data-keyboard-stage],
    [data-fallback] {
      order: 2;
      position: relative;
      inset: auto;
      flex: none;
      height: min(88vw, 360px, 44vh);
      margin-top: 4px;
    }
  }
`;

export const Copy = styled.div`
  position: absolute;
  z-index: 2;
  left: clamp(28px, 5.2vw, 80px);
  top: 46%;
  transform: translateY(-50%);
  width: min(620px, 64%);
  pointer-events: none;

  /* 사이드바가 있는 좁은 데스크톱(태블릿): 카피는 위, 키보드는 아래 */
  @media (min-width: 920px) and (max-width: 1223px) {
    top: max(76px, 9vh);
    transform: none;
    width: auto;
    right: clamp(28px, 5.2vw, 80px);
  }

  button,
  a {
    pointer-events: auto;
  }

  ${MOBILE} {
    order: 1;
    position: relative;
    left: auto;
    top: auto;
    transform: none;
    width: auto;
    padding: 28px 20px 0;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSoft};
  padding: 6px 12px 6px 10px;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  border-radius: 999px;
  background: ${({ theme }) => theme.heroGlassBg};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3ddc84;
    box-shadow: 0 0 0 3px rgba(61, 220, 132, 0.18);
    animation: ${pulse} 2.4s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .dot {
      animation: none;
    }
  }
`;

export const Headline = styled.h1`
  margin: 24px 0 0;
  font-weight: 600;
  color: ${({ theme }) => theme.text};

  .l1 {
    display: block;
    font-size: clamp(17px, 1.65vw, 24px);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.4;
    color: ${({ theme }) => theme.textSoft};
  }

  .l2 {
    display: block;
    margin-top: 10px;
    font-size: clamp(32px, 4.3vw, 62px);
    line-height: 1.12;
    letter-spacing: -0.04em;
  }

  .name {
    color: ${({ theme }) => theme.accent};
  }

  ${MOBILE} {
    margin-top: 18px;

    .l2 {
      margin-top: 8px;
      font-size: clamp(28px, 8.4vw, 40px);
    }
  }
`;

const btn = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 20px;
  border-radius: 12px;
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform 0.25s ${EASE},
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.25s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

export const Cta = styled.div`
  margin-top: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .primary {
    ${btn};
    border: 0;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.4) inset,
      0 10px 30px -10px
        ${({ theme }) =>
          theme.colorScheme === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(20,20,22,.4)'};
  }

  .ghost {
    ${btn};
    border: 1px solid ${({ theme }) => theme.lineStrong};
    background: ${({ theme }) => theme.heroGlassBg};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: ${({ theme }) => theme.text};

    .keys {
      display: inline-flex;
      gap: 3px;
    }

    .touch-ico {
      display: none;
    }

    &:hover {
      border-color: ${({ theme }) => theme.textFaint};
    }
  }

  /* 터치 기기에는 키보드 단축키 대신 돋보기 아이콘 */
  @media (hover: none), (pointer: coarse) {
    .ghost .keys {
      display: none;
    }

    .ghost .touch-ico {
      display: block;
    }
  }

  ${MOBILE} {
    margin-top: 22px;

    .primary,
    .ghost {
      height: 44px;
      padding: 0 16px;
      font-size: 14px;
    }
  }
`;

export const Foot = styled.div`
  /* 모션 감소 모드에서는 정적 키보드라 "눌러 보세요" 안내가 맞지 않아 숨깁니다. */
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }

  position: absolute;
  z-index: 2;
  left: clamp(28px, 5.2vw, 80px);
  bottom: 32px;
  pointer-events: none;

  ${MOBILE} {
    order: 3;
    position: relative;
    left: auto;
    bottom: auto;
    padding: 6px 20px 0;
  }
`;

export const Ticker = styled.div`
  font-family: ${({ theme }) => theme.fontMono};
  display: flex;
  flex-direction: column;
  gap: 8px;

  .hint {
    color: ${({ theme }) => theme.textMuted};
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: ${({ theme }) => theme.fontSans};
  }

  .hint kbd {
    font-size: 10px;
  }

  .line {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 22px;
    font-size: 15px;
    color: ${({ theme }) => theme.text};
    white-space: pre;
  }

  .pr {
    color: ${({ theme }) => theme.accent};
  }

  .caret {
    display: inline-block;
    width: 8px;
    height: 17px;
    background: ${({ theme }) => theme.accent};
    animation: ${blink} 1.05s steps(1) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .caret {
      animation: none;
    }
  }
`;
