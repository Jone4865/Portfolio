import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  typicalContent: ReactNode;
  backgroundSrc: string;
};

/** 홈 히어로 — 에디토리얼(D): 하단 그라데이션 + 좌하단 타이포 */
export default function HomeHeroCard({ typicalContent, backgroundSrc }: Props) {
  return (
    <HeroVisualFrame>
      <HeroImage alt="" src={backgroundSrc} loading="eager" decoding="async" />
      <EditorialScrim aria-hidden />
      <EditorialTyping $high>
        <div className="hero-typical-root">{typicalContent}</div>
        <HeroAccentLine aria-hidden />
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

const HeroVisualFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadowElevated};
  border: 1px solid ${({ theme }) => theme.heroGlassBorder};
`;

const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.05) contrast(1.02);
`;

const EditorialScrim = styled.div`
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

const HeroAccentLine = styled.div`
  width: min(120px, 40%);
  height: 3px;
  border-radius: 999px;
  margin-top: 14px;
  background: ${({ theme }) => theme.progressGradient};
  box-shadow: 0 0 16px ${({ theme }) => theme.accentMuted};
`;
