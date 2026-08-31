import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SIDER_RAIL } from 'constants/layout';

export const Page = styled.main<{ $isDesktop: boolean; $isTablet: boolean }>`
  position: relative;
  min-height: 100vh;
  margin-left: ${({ $isDesktop, $isTablet }) =>
    $isDesktop || $isTablet ? `${SIDER_RAIL}px` : '0'};
  padding: ${({ $isDesktop, $isTablet }) =>
    $isDesktop ? '44px 48px 96px' : $isTablet ? '36px 28px 72px' : '28px 20px 64px'};
  max-width: ${({ $isDesktop, $isTablet }) =>
    $isDesktop || $isTablet ? `min(1040px, calc(100vw - ${SIDER_RAIL}px - 56px))` : '100%'};
  background: ${({ theme }) => theme.canvasGradient};
  overflow-x: hidden;
`;

export const BackdropGrid = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  left: ${SIDER_RAIL}px;
  z-index: 0;
  opacity: 0.4;
  background-image:
    linear-gradient(${({ theme }) => theme.siderBorder} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.siderBorder} 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 75% 65% at 50% 0%, black 20%, transparent 72%);

  @media (max-width: 919px) {
    left: 0;
    mask-image: radial-gradient(ellipse 85% 55% at 50% 0%, black 15%, transparent 70%);
  }
`;

export const PageHeader = styled.header`
  position: relative;
  z-index: 1;
  margin-bottom: 40px;
  padding-bottom: 36px;

  h1 {
    margin: 8px 0 14px;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    color: ${({ theme }) => theme.text};
  }
`;

export const HeaderTop = styled.div`
  margin-bottom: 20px;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: ${({ theme }) => theme.textMuted};
  border: 1px solid ${({ theme }) => theme.siderBorder};
  background: ${({ theme }) => theme.cardColor};
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => theme.shadowCard};
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  .ico {
    font-size: 9px;
    opacity: 0.65;
  }

  .cur {
    color: ${({ theme }) => theme.text};
  }

  &:hover {
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.accentMuted};
    box-shadow: ${({ theme }) => theme.shadowElevated};
    transform: translateY(-1px);
  }
`;

export const HeaderAccent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: min(200px, 42%);
  height: 3px;
  border-radius: 999px;
  background: ${({ theme }) => theme.progressGradient};
  box-shadow: 0 0 20px ${({ theme }) => theme.accentMuted};
`;

export const Eyebrow = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`;

export const Lead = styled.p`
  margin: 0;
  max-width: 48ch;
  font-size: 15px;
  line-height: 1.65;
  color: ${({ theme }) => theme.textMuted};
`;

export const Surface = styled.section<{ $tall?: boolean }>`
  position: relative;
  margin-bottom: ${({ $tall }) => ($tall ? 28 : 22)}px;
  padding: ${({ $tall }) => ($tall ? '26px 26px 28px' : '22px 24px 24px')};
  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardText};
  backdrop-filter: blur(18px);
  box-shadow: ${({ theme }) => theme.shadowCard};
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 22px;
    right: 22px;
    height: 2px;
    border-radius: 0 0 4px 4px;
    background: ${({ theme }) => theme.progressGradient};
    opacity: 0.45;
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.chipBorder};
    box-shadow: ${({ theme }) => theme.shadowElevated};
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.cardTextMuted};
`;

export const DemoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`;

export const DemoStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 420px;
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const CardInset = styled.div`
  margin-top: 4px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.siderBorder};
  background: ${({ theme }) => theme.siderArrowColor};
`;

export const GalleryInset = styled.div`
  margin-top: 4px;
  min-height: 400px;
  padding: 22px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.siderBorder};
  background: ${({ theme }) => theme.siderArrowColor};
`;
