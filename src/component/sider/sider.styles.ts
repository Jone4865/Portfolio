import styled, { css } from 'styled-components';
import { SIDER_RAIL } from 'constants/layout';

export const Container = styled.div<{ $isBig: boolean }>`
  transition: background 0.25s ease;
  width: ${({ $isBig }) => ($isBig ? `${SIDER_RAIL}px` : 'auto')};
  background: ${({ theme }) => theme.siderGradient};
  border-right: ${({ $isBig, theme }) => ($isBig ? `1px solid ${theme.siderBorder}` : 'none')};
  backdrop-filter: blur(16px);
  padding: 16px 12px 24px;
  z-index: 12;

  ${({ $isBig }) =>
    $isBig
      ? css`
          position: fixed;
          top: 0;
          left: 0;
          /* 뷰포트 높이에 맞춰 고정 → 넘치는 콘텐츠는 이 영역 안에서 스크롤 */
          height: 100vh;
          max-height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        `
      : css`
          position: relative;
          min-height: auto;
          overflow-x: hidden;
        `}
`;

export const ThemeToggle = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.siderBorder};
  background: ${({ theme }) => theme.siderArrowColor};
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
  padding: 0;
  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.accentMuted};
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
`;

export const PictureWrapper = styled.div`
  padding: 4px;
  border-radius: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.accent},
    ${({ theme }) => theme.accentMuted}
  );
  box-shadow: 0 8px 28px ${({ theme }) => theme.accentMuted};

  img {
    display: block;
    border-radius: 100%;
    width: 156px;
    height: 156px;
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.siderBackGround};
  }
`;

export const NameWrapper = styled.div`
  text-align: center;

  .name {
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: ${({ theme }) => theme.text};
  }

  .role {
    margin-top: 4px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.textMuted};
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`;

export const InfoWrapper = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .row {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.45;
    color: ${({ theme }) => theme.text};

    &.static {
      cursor: default;
      color: ${({ theme }) => theme.textMuted};
    }

    svg {
      flex-shrink: 0;
      margin-top: 2px;
      opacity: 0.85;
      color: ${({ theme }) => theme.accent};
    }
  }
`;

export const HoverInfo = styled.button`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
  margin: 0;
  padding: 8px 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  text-align: left;
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  line-height: 1.45;
  cursor: pointer;
  transition: background 0.15s ease;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ theme }) => theme.accent};
  }

  &:hover {
    background: ${({ theme }) => theme.siderArrowColor};
  }
`;

export const Line = styled.div`
  width: 100%;
  margin: 16px 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${({ theme }) => theme.siderBorder}, transparent);
`;

export const Chevron = styled.span<{ $visible?: boolean }>`
  margin-left: auto;
  font-size: 18px;
  font-weight: 300;
  line-height: 1;
  transform: rotate(${({ $visible }) => ($visible ? '90deg' : '0deg')});
  transition: transform 0.2s ease;
  color: ${({ theme }) => theme.textMuted};
`;

export const TitleStyle = styled.button<{ $unActiveHover?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 10px 12px;
  border: none;
  border-radius: 12px;
  background: transparent;
  font: inherit;
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  text-align: left;
  cursor: ${({ $unActiveHover }) => ($unActiveHover ? 'default' : 'pointer')};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme, $unActiveHover }) =>
      $unActiveHover ? 'transparent' : theme.siderArrowColor};
  }

  svg {
    color: ${({ theme }) => theme.accent};
    flex-shrink: 0;
  }
`;

export const TechWrapper = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: ${({ $visible }) => ($visible ? '2400px' : '0')};
  padding: ${({ $visible }) => ($visible ? '8px 4px 12px 8px' : '0')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  overflow: hidden;
  transition:
    max-height 0.32s ease,
    opacity 0.22s ease,
    padding 0.22s ease;
`;

export const TechGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TechGroupLabel = styled.div`
  padding: 4px 10px 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textMuted};
`;

export const TechStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  transition: background 0.15s ease;

  .ico {
    display: flex;
    font-size: 17px;
    opacity: 0.92;
    color: ${({ theme }) => theme.accent};
  }

  .lbl {
    letter-spacing: -0.02em;
  }

  &:hover {
    background: ${({ theme }) => theme.siderArrowColor};
  }
`;

export const EducationWrapper = styled.div`
  padding: 8px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.siderBorder};

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    :first-child {
      font-weight: 600;
      font-size: 14px;
      color: ${({ theme }) => theme.text};
    }

    :nth-child(2) {
      font-size: 12px;
      color: ${({ theme }) => theme.textMuted};
    }
  }
`;

export const MeritIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 4px 8px 8px;
  text-align: center;
  gap: 8px;

  > div {
    flex: 1;
    min-width: 0;
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.textMuted};
    line-height: 1.3;
  }
`;

export const MeritIconItem = styled.div`
  border: 1px solid ${({ theme }) => theme.siderBorder};
  border-radius: 100%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin: 0 auto 6px;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.siderArrowColor};
  transition:
    transform 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.accentMuted};
  }
`;
