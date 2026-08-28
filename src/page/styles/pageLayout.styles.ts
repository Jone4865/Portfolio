import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { SIDER_RAIL } from 'constants/layout';

export const Wrap = styled.div<{ totalSections: number }>`
  position: relative;
  z-index: 2;
  height: ${({ totalSections }) => totalSections * 100}vh;
  background: ${({ theme }) => theme.canvasGradient};
`;

export const Container = styled.div<{ isDesktop: boolean; isTablet: boolean }>`
  position: relative;
  z-index: 2;
  margin-left: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? `${SIDER_RAIL}px` : '0')};
`;

export const SectionContainer = styled.div<{
  isActive: boolean;
  isDesktop?: boolean;
  isTablet?: boolean;
}>`
  position: fixed;
  top: 0;
  left: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? `${SIDER_RAIL}px` : '0')};
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 32px);
  box-sizing: border-box;
  z-index: ${({ isActive }) => (isActive ? 10 : 1)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  transition:
    opacity 0.32s ease,
    visibility 0s linear ${({ isActive }) => (isActive ? '0s' : '0.32s')};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 0.28s ease;
    background: radial-gradient(
      ellipse 85% 65% at 50% 38%,
      ${({ theme }) => theme.accentMuted},
      transparent 68%
    );
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const TypingWrapper = styled.div<{
  isDesktop: boolean;
  isTablet: boolean;
}>`
  position: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? 'relative' : 'absolute')};
  top: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? '0' : '50%')};
  transform: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? 'none' : 'translateY(-50%)')};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: min(920px, 94vw);
  margin: 0 auto;
  height: ${({ isDesktop, isTablet }) =>
    isDesktop ? 'min(52vh, 520px)' : isTablet ? '420px' : '280px'};
  padding: ${({ isDesktop, isTablet }) => (isDesktop || isTablet ? '0' : '0 20px')};
`;

export const Invitation = styled.div<{ isDesktop: boolean; isTablet: boolean }>`
  width: min(640px, 92%);
  margin: 0 auto;
  padding: clamp(24px, 4vw, 40px);
  border-radius: 20px;
  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardText};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};
  backdrop-filter: blur(12px);
  font-weight: 500;
  font-size: ${({ isDesktop, isTablet }) => (isDesktop ? '15px' : isTablet ? '14px' : '13px')};
  line-height: 1.75;
  letter-spacing: -0.01em;

  span {
    color: ${({ theme }) => theme.accent};
    font-weight: 700;
  }
`;

export const PrograssStyle = styled(motion.div)<{ isDesktop: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${({ theme }) => theme.progressGradient};
  transform-origin: 0%;
  z-index: 3;
  margin-left: ${({ isDesktop }) => (isDesktop ? `${SIDER_RAIL}px` : '0')};
  box-shadow: 0 -4px 20px ${({ theme }) => theme.accentMuted};
`;

export const CardWrapper = styled(motion.div)<{
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}>`
  width: min(720px, 94%);
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  margin: 0 auto;
  padding: clamp(22px, 3vw, 32px);
  border-radius: 22px;
  font-size: 14px;
  line-height: 1.55;
  letter-spacing: -0.01em;

  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardText};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};
  backdrop-filter: blur(14px);

  display: flex;
  flex-direction: column;
  gap: 18px;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowElevated};
  }

  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 13px;
      padding: 18px;
    `}
`;

export const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
`;

export const OrgPill = styled.span`
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.chipBg};
  border: 1px solid ${({ theme }) => theme.chipBorder};
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.cardText};
  line-height: 1.25;
`;

export const CardMeta = styled.time`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.cardTextMuted};
  white-space: nowrap;
`;

export const LineOne = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  align-items: ${({ isDesktop }) => (isDesktop ? 'flex-end' : 'flex-start')};
  justify-content: space-between;
  gap: ${({ isDesktop }) => (isDesktop ? '16px' : '8px')};
`;

export const MetaBlock = styled.div`
  display: grid;
  gap: 6px;
`;

export const MetaLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`;

export const MetaValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.cardTextMuted};
  font-size: 14px;
  word-break: keep-all;
`;

export const ExperienceList = styled.ul`
  margin: 0;
  padding-left: 1.15rem;
  color: ${({ theme }) => theme.cardTextMuted};
  font-size: 14px;

  li {
    margin-bottom: 8px;
    padding-left: 4px;
    word-break: keep-all;
  }

  li:last-child {
    margin-bottom: 0;
  }
`;

export const StackRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const StackChip = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.cardText};
  background: ${({ theme }) => theme.chipBg};
  border: 1px solid ${({ theme }) => theme.chipBorder};
  cursor: default;
  white-space: nowrap;

  .ico {
    display: flex;
    font-size: 16px;
    opacity: 0.95;
  }

  .lbl {
    letter-spacing: -0.01em;
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
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.accentContrast};
  background: ${({ theme }) => theme.accent};
  border: 1px solid transparent;
  box-shadow: 0 4px 16px ${({ theme }) => theme.accentMuted};

  .arrow {
    font-size: 14px;
    opacity: 0.9;
  }

  &:hover {
    filter: brightness(1.05);
  }
`;

export const PageIndicator = styled.div<{ isDesktop?: boolean; isTablet?: boolean }>`
  position: fixed;
  right: 12px;
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
`;

export const DotGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const DotLabel = styled.div`
  color: ${({ theme }) => theme.textMuted};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

export const PageDot = styled.div<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive, theme }) => (isActive ? theme.accent : theme.indicatorDot)};
  box-shadow: ${({ isActive, theme }) => (isActive ? `0 0 0 3px ${theme.accentMuted}` : 'none')};
  cursor: pointer;
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
  transform: scale(${({ isActive }) => (isActive ? 1.15 : 1)});

  &:hover {
    background-color: ${({ theme }) => theme.accent};
    transform: scale(1.25);
  }
`;

export const GlobalScrollHint = styled(motion.div)<{ isMobile: boolean }>`
  position: fixed;
  left: ${({ isMobile }) => (isMobile ? '50%' : `calc(50% + ${SIDER_RAIL / 2}px)`)};
  translate: -50% 0;
  bottom: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.accent};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};
  cursor: pointer;
  z-index: 1001;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowElevated};
  }
`;

