import { motion } from 'framer-motion';
import styled, { css, keyframes } from 'styled-components';
import { SIDER_RAIL } from 'constants/layout';

const EASE = 'cubic-bezier(0.2, 0.7, 0.1, 1)';

export const Wrap = styled.div<{ $totalSections: number }>`
  position: relative;
  z-index: 2;
  height: ${({ $totalSections }) => $totalSections * 100}vh;
  background: ${({ theme }) => theme.canvasGradient};
`;

export const Container = styled.main<{ $isDesktop: boolean; $isTablet: boolean }>`
  position: relative;
  z-index: 2;
  margin-left: ${({ $isDesktop, $isTablet }) =>
    $isDesktop || $isTablet ? `${SIDER_RAIL}px` : '0'};
`;

export const SectionContainer = styled.div<{
  $isActive: boolean;
  $isDesktop?: boolean;
  $isTablet?: boolean;
  /** 히어로처럼 가장자리까지 꽉 채우는 섹션 */
  $bleed?: boolean;
}>`
  position: fixed;
  top: 0;
  left: ${({ $isDesktop, $isTablet }) => ($isDesktop || $isTablet ? `${SIDER_RAIL}px` : '0')};
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $bleed }) => ($bleed ? '0' : 'clamp(16px, 4vw, 32px)')};
  box-sizing: border-box;
  z-index: ${({ $isActive }) => ($isActive ? 10 : 1)};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  visibility: ${({ $isActive }) => ($isActive ? 'visible' : 'hidden')};
  transition:
    opacity 0.32s ease,
    visibility 0s linear ${({ $isActive }) => ($isActive ? '0s' : '0.32s')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: ${({ $isActive, $bleed }) => ($isActive && !$bleed ? 1 : 0)};
    transition: opacity 0.28s ease;
    background: radial-gradient(
      ellipse 70% 55% at 50% 40%,
      ${({ theme }) =>
        theme.colorScheme === 'dark' ? 'rgba(255, 90, 44, 0.07)' : 'rgba(226, 67, 26, 0.06)'},
      transparent 70%
    );
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

/** 섹션 머리의 모노 인덱스 — 예: 03 / 10 · PROJECT */
export const SecIdx = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 12px;
  color: ${({ theme }) => theme.textMuted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Invitation = styled.div<{ $isDesktop: boolean; $isTablet: boolean }>`
  width: min(680px, 94%);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 44px);
  border-radius: 24px;
  background:
    radial-gradient(80% 120% at 100% 0%, ${({ theme }) => theme.accentMuted}, transparent 60%),
    ${({ theme }) => theme.panel};
  color: ${({ theme }) => theme.cardTextMuted};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};
  font-weight: 400;
  font-size: ${({ $isDesktop, $isTablet }) => ($isDesktop ? '16px' : $isTablet ? '15px' : '14px')};
  line-height: 1.85;
  letter-spacing: -0.01em;

  ${SecIdx} {
    margin-bottom: 18px;
  }

  > div span {
    color: ${({ theme }) => theme.accent};
    font-weight: 600;
  }
`;

export const PrograssStyle = styled(motion.div)<{ $isDesktop: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.progressGradient};
  transform-origin: 0%;
  z-index: 3;
  margin-left: ${({ $isDesktop }) => ($isDesktop ? `${SIDER_RAIL}px` : '0')};
  box-shadow: 0 -4px 20px ${({ theme }) => theme.accentMuted};
`;

const flash = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 90, 44, 0); }
  15% { box-shadow: 0 0 0 4px rgba(255, 90, 44, 0.5); }
  100% { box-shadow: 0 0 0 14px rgba(255, 90, 44, 0); }
`;

/**
 * 카드 기울기 + 스포트라이트 셸 — 마우스(정밀 포인터) 환경에서만 반응합니다.
 * transform은 framer-motion이 관리하는 카드 대신 이 셸에 걸어 충돌을 피합니다.
 */
export const TiltShell = styled.div`
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 0%;
  --spot: 0;
  width: min(720px, 94%);
  margin: 0 auto;
  border-radius: 20px;
  transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.5s ${EASE};
  will-change: transform;

  &[data-tilting='true'] {
    transition: transform 0.12s linear;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: var(--spot);
    transition: opacity 0.3s ease;
    background: radial-gradient(
      420px circle at var(--mx) var(--my),
      ${({ theme }) =>
        theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.5)'},
      transparent 60%
    );
    box-shadow: inset 0 0 0 1px
      ${({ theme }) =>
        theme.colorScheme === 'dark' ? 'rgba(255, 140, 100, 0.18)' : 'rgba(201, 58, 18, 0.18)'};
  }

  &.flash > * {
    animation: ${flash} 1.6s ${EASE};
  }

  > * {
    width: 100% !important;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    &::after {
      display: none;
    }
  }
`;

export const CardWrapper = styled(motion.div)<{
  $isDesktop: boolean;
  $isTablet: boolean;
  $isMobile: boolean;
}>`
  position: relative;
  width: min(720px, 94%);
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  margin: 0 auto;
  padding: clamp(22px, 3vw, 34px);
  border-radius: 20px;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: -0.01em;

  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0) 40%),
    ${({ theme }) => theme.panel};
  color: ${({ theme }) => theme.cardText};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};

  display: flex;
  flex-direction: column;
  gap: 18px;

  transition:
    box-shadow 0.5s ${EASE},
    border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.lineStrong};
    box-shadow: ${({ theme }) => theme.shadowElevated};
  }

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      font-size: 13px;
      padding: 18px 16px;
      max-height: calc(100vh - 110px);
    `}
`;

export const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px dashed ${({ theme }) => theme.lineStrong};
`;

export const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const OrgPill = styled.span`
  align-self: flex-start;
  padding: 4px 9px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.accentMuted};
  border: 1px solid transparent;
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.3rem, 2.4vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.cardText};
  line-height: 1.2;
`;

export const CardMeta = styled.time`
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 13px;
  color: ${({ theme }) => theme.textMuted};
  white-space: nowrap;
`;

export const LineOne = styled.div<{ $isDesktop: boolean }>`
  display: flex;
  flex-direction: ${({ $isDesktop }) => ($isDesktop ? 'row' : 'column')};
  align-items: ${({ $isDesktop }) => ($isDesktop ? 'baseline' : 'flex-start')};
  justify-content: space-between;
  gap: ${({ $isDesktop }) => ($isDesktop ? '16px' : '6px')};
`;

export const MetaBlock = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 4px 12px;
  align-items: baseline;

  @media (max-width: 559px) {
    grid-template-columns: 1fr;
  }
`;

export const MetaLabel = styled.span`
  margin: 0;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textMuted};
  padding-top: 2px;
`;

export const MetaValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.cardTextMuted};
  font-size: 14px;
  word-break: keep-all;
`;

export const ExperienceList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  color: ${({ theme }) => theme.cardTextMuted};
  font-size: 14px;

  li {
    position: relative;
    margin-bottom: 8px;
    padding-left: 16px;
    word-break: keep-all;
  }

  li::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 0.68em;
    width: 7px;
    height: 2px;
    border-radius: 1px;
    background: ${({ theme }) => theme.accent};
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

export const StackRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const StackChip = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 10px;
  border-radius: 7px;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 11.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.cardTextMuted};
  background: ${({ theme }) => theme.chipBg};
  border: 1px solid ${({ theme }) => theme.chipBorder};
  cursor: default;
  white-space: nowrap;

  .ico {
    display: flex;
    font-size: 13px;
    color: ${({ theme }) => theme.accent};
  }

  .lbl {
    letter-spacing: 0;
  }
`;

export const LinkBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
`;

export const ExternalLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 42px;
  padding: 0 16px;
  border-radius: 11px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.background};
  background: ${({ theme }) => theme.text};
  border: 1px solid transparent;

  .arrow {
    font-family: ${({ theme }) => theme.fontMono};
    font-size: 13px;
    color: ${({ theme }) => theme.accent};
  }

  &:hover {
    filter: brightness(1.06);
  }
`;

export const PageIndicator = styled.nav<{ $isDesktop?: boolean; $isTablet?: boolean }>`
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  z-index: 1000;
  padding: 14px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.indicatorRail};
  border: 1px solid ${({ theme }) => theme.siderBorder};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`;

export const DotGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const DotLabel = styled.div`
  color: ${({ theme }) => theme.textMuted};
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 9.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const PageDot = styled.button<{ $isActive: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  font: inherit;
  color: inherit;
  margin: 0;
  width: 8px;
  height: ${({ $isActive }) => ($isActive ? '18px' : '8px')};
  border: none;
  padding: 0;
  border-radius: 999px;
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.accent : theme.indicatorDot)};
  box-shadow: ${({ $isActive, theme }) => ($isActive ? `0 0 0 3px ${theme.accentMuted}` : 'none')};
  cursor: pointer;
  transition:
    height 0.3s ${EASE},
    background 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
`;

export const GlobalScrollHint = styled(motion.button)<{ $isMobile: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  font: inherit;
  color: inherit;
  margin: 0;
  position: fixed;
  left: ${({ $isMobile }) => ($isMobile ? '50%' : `calc(50% + ${SIDER_RAIL / 2}px)`)};
  translate: -50% 0;
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 9999px;
  background: ${({ theme }) => theme.heroGlassBg};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.lineStrong};
  cursor: pointer;
  z-index: 1001;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;
