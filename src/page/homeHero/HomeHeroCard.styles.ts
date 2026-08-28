import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

function heroTypicalContrast(highContrastShadow: boolean) {
  return css`
    .hero-typical-root,
    .hero-typical-root * {
      color: #f7f4f0 !important;
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.55;
      font-size: clamp(1rem, 2.2vw, 1.45rem);
    }

    ${highContrastShadow &&
    css`
      .hero-typical-root,
      .hero-typical-root * {
        text-shadow:
          0 0 1px rgba(0, 0, 0, 1),
          0 0 18px rgba(0, 0, 0, 0.85),
          0 2px 6px rgba(0, 0, 0, 0.9),
          0 6px 20px rgba(0, 0, 0, 0.55);
      }
    `}
  `;
}

export const HeroVisualFrame = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 24px;
  overflow: hidden;
  isolation: isolate;
  background: #0e1218;
  box-shadow: ${({ theme }) => theme.shadowElevated};
  border: 1px solid ${({ theme }) => theme.heroGlassBorder};
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accentMuted};
    box-shadow:
      ${({ theme }) => theme.shadowElevated},
      0 0 0 1px ${({ theme }) => theme.accentMuted},
      0 28px 56px rgba(0, 0, 0, 0.35);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      border-color: ${({ theme }) => theme.heroGlassBorder};
      box-shadow: ${({ theme }) => theme.shadowElevated};
    }
  }
`;

export const HeroImageShell = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
`;

export const HeroImageKen = styled(motion.div)`
  width: 100%;
  height: 100%;
  will-change: transform;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.06) contrast(1.03);
  }
`;

export const EditorialScrim = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(2, 4, 8, 0.9) 0%,
    rgba(2, 4, 8, 0.42) 34%,
    rgba(2, 4, 8, 0.12) 58%,
    rgba(2, 4, 8, 0.04) 100%
  );
`;

export const EditorialTyping = styled.div<{ $high: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;
  padding: clamp(22px, 4vw, 40px) clamp(22px, 4vw, 44px) clamp(26px, 5vw, 48px);
  max-width: 100%;
  pointer-events: none;

  .hero-typical-root {
    pointer-events: auto;
    max-width: min(36ch, 92%);
  }

  ${({ $high }) => heroTypicalContrast($high)}
`;

export const TypingMotion = styled(motion.div)`
  width: 100%;
  max-width: min(36ch, 92%);
`;

export const AccentMotion = styled(motion.div)`
  width: min(120px, 40%);
  height: 3px;
  border-radius: 999px;
  margin-top: 14px;
  background: ${({ theme }) => theme.progressGradient};
  box-shadow: 0 0 16px ${({ theme }) => theme.accentMuted};
`;
