import styled from 'styled-components';

export const Stage = styled.div<{ $shown: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 0;
  touch-action: pan-y;
  opacity: ${({ $shown }) => ($shown ? 1 : 0)};
  transform: translateY(${({ $shown }) => ($shown ? '0' : '14px')});
  transition:
    opacity 0.9s cubic-bezier(0.2, 0.7, 0.1, 1),
    transform 1.1s cubic-bezier(0.2, 0.7, 0.1, 1);

  &[data-fallback='true'] {
    display: grid;
    place-items: end end;
    padding: 0 14% 17% 0;
    pointer-events: none;
  }

  @media (max-width: 919px) {
    &[data-fallback='true'] {
      place-items: center;
      padding: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`;

/** 모션 감소·WebGL 미지원용 정적 CSS 키보드 */
export const FallbackBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 46px);
  gap: 8px;
  padding: 22px;
  border-radius: 22px;
  background: linear-gradient(#2a2b30, #18191c);
  box-shadow:
    0 40px 80px -30px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transform: perspective(900px) rotateX(38deg) rotateZ(-8deg);

  i {
    height: 46px;
    border-radius: 9px;
    background: linear-gradient(#f1eee7, #d9d5cc);
    box-shadow: inset 0 -5px 0 rgba(0, 0, 0, 0.14);
  }

  i.a {
    background: linear-gradient(#ff7a50, #e2431a);
  }

  @media (max-width: 919px) {
    grid-template-columns: repeat(6, 34px);

    i {
      height: 34px;
    }
  }
`;
