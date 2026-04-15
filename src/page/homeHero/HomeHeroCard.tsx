import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styled, { css } from 'styled-components';

type Props = {
  typicalContent: ReactNode;
  backgroundSrc: string;
};

const springSoft = { type: 'spring' as const, stiffness: 280, damping: 30 };

/** 홈 히어로 — 에디토리얼(D): 하단 그라데이션 + 좌하단 타이포 */
export default function HomeHeroCard({ typicalContent, backgroundSrc }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <HeroVisualFrame
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={springSoft}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              scale: 1.008,
              transition: { type: 'spring', stiffness: 420, damping: 28 },
            }
      }
    >
      <HeroImageShell>
        <HeroImageKen
          animate={{ scale: [1, 1.055, 1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img alt="" src={backgroundSrc} loading="eager" decoding="async" />
        </HeroImageKen>
      </HeroImageShell>
      <EditorialScrim
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.65, ease: 'easeOut' }}
        aria-hidden
      />
      <EditorialTyping $high>
        <TypingMotion
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.32,
            duration: 0.68,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="hero-typical-root">{typicalContent}</div>
        </TypingMotion>
        <AccentMotion
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            delay: 0.72,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: 'left center' }}
          aria-hidden
        />
      </EditorialTyping>
    </HeroVisualFrame>
  );
}

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

const HeroVisualFrame = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 24px;
  overflow: hidden;
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

const HeroImageShell = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
`;

const HeroImageKen = styled(motion.div)`
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

const EditorialScrim = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(2, 4, 8, 0.92) 0%,
    rgba(2, 4, 8, 0.55) 38%,
    rgba(2, 4, 8, 0.15) 62%,
    transparent 100%
  );
`;

const EditorialTyping = styled.div<{ $high: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: left;
  padding: clamp(22px, 4vw, 40px) clamp(22px, 4vw, 44px)
    clamp(26px, 5vw, 48px);
  max-width: 100%;
  pointer-events: none;

  .hero-typical-root {
    pointer-events: auto;
    max-width: min(36ch, 92%);
  }

  ${({ $high }) => heroTypicalContrast($high)}
`;

const TypingMotion = styled(motion.div)`
  width: 100%;
  max-width: min(36ch, 92%);
`;

const AccentMotion = styled(motion.div)`
  width: min(120px, 40%);
  height: 3px;
  border-radius: 999px;
  margin-top: 14px;
  background: ${({ theme }) => theme.progressGradient};
  box-shadow: 0 0 16px ${({ theme }) => theme.accentMuted};
`;
