import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const dropIn = keyframes`
  from { opacity: 0; transform: translateY(-8px) scale(0.985); }
  to { opacity: 1; transform: none; }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9500;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 14vh 16px 16px;
  background: ${({ theme }) =>
    theme.colorScheme === 'dark' ? 'rgba(5, 5, 6, 0.55)' : 'rgba(30, 28, 24, 0.28)'};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: ${fadeIn} 0.18s ease both;

  @media (max-width: 759px) {
    padding-top: 64px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Dialog = styled.div`
  width: 100%;
  max-width: 620px;
  border-radius: 16px;
  background: ${({ theme }) =>
    theme.colorScheme === 'dark' ? 'rgba(24, 24, 27, 0.94)' : 'rgba(255, 255, 255, 0.96)'};
  border: 1px solid ${({ theme }) => theme.lineStrong};
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, ${({ theme }) => (theme.colorScheme === 'dark' ? 0.6 : 0.04)}),
    0 40px 100px -20px rgba(0, 0, 0, ${({ theme }) => (theme.colorScheme === 'dark' ? 0.9 : 0.35)}),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
  animation: ${dropIn} 0.25s cubic-bezier(0.2, 0.7, 0.1, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px 0 18px;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};

  > svg {
    width: 18px;
    height: 18px;
    color: ${({ theme }) => theme.textMuted};
    flex: none;
  }

  input {
    flex: 1;
    min-width: 0;
    height: 100%;
    background: none;
    border: 0;
    outline: none;
    color: ${({ theme }) => theme.text};
    font: inherit;
    font-size: 17px;
  }

  input::placeholder {
    color: ${({ theme }) => theme.textFaint};
  }

  .esc {
    flex: none;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
  }

  @media (max-width: 759px) {
    input {
      font-size: 16px;
    }
  }
`;

export const List = styled.div`
  max-height: min(52vh, 440px);
  overflow: auto;
  padding: 8px;
  overscroll-behavior: contain;
`;

export const GroupLabel = styled.div`
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 11px;
  color: ${({ theme }) => theme.textFaint};
  letter-spacing: 0.08em;
  padding: 10px 12px 6px;
  text-transform: uppercase;
`;

export const Item = styled.div<{ $on: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
  background: ${({ $on, theme }) =>
    $on
      ? theme.colorScheme === 'dark'
        ? 'rgba(255,255,255,.07)'
        : 'rgba(20,20,22,.05)'
      : 'transparent'};

  .pi {
    width: 30px;
    height: 30px;
    flex: none;
    border-radius: 8px;
    display: grid;
    place-items: center;
    font-family: ${({ theme }) => theme.fontMono};
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    background: ${({ $on, theme }) => ($on ? theme.accent : '#3a3b40')};
    transition: background 0.15s ease;
  }

  .pt {
    flex: 1;
    min-width: 0;
  }

  .pt b {
    display: block;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    font-size: 15px;
  }

  .pt b mark {
    background: none;
    color: ${({ theme }) => theme.accent};
  }

  .pt small {
    display: block;
    color: ${({ theme }) => theme.textMuted};
    font-size: 12.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pk {
    flex: none;
    font-family: ${({ theme }) => theme.fontMono};
    font-size: 11px;
    color: ${({ $on, theme }) => ($on ? theme.textSoft : theme.textFaint)};
  }
`;

export const Empty = styled.div`
  padding: 28px 12px;
  text-align: center;
  color: ${({ theme }) => theme.textMuted};
  font-size: 14px;
`;

export const Foot = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 10px 16px;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  font-size: 12px;
  color: ${({ theme }) => theme.textMuted};
  flex-wrap: wrap;

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .push {
    margin-left: auto;
  }

  @media (max-width: 759px) {
    display: none;
  }
`;

export const Toast = styled.div<{ $show: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 84px;
  z-index: 9600;
  transform: translate(-50%, ${({ $show }) => ($show ? '0' : '20px')});
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.2, 0.7, 0.1, 1);
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.background};
  font-size: 14px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: 10px;
  pointer-events: none;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);

  &:empty {
    display: none;
  }
`;

/** 팔레트 여는 버튼 — 데스크톱은 우상단, 휴대폰은 우하단 플로팅 */
export const PaletteTrigger = styled.button`
  position: fixed;
  z-index: 1002;
  top: 20px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  padding: 0 8px 0 14px;
  border-radius: 11px;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  background: ${({ theme }) => theme.heroGlassBg};
  backdrop-filter: blur(12px) saturate(1.3);
  -webkit-backdrop-filter: blur(12px) saturate(1.3);
  font: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  svg {
    width: 15px;
    height: 15px;
  }

  .keys {
    display: inline-flex;
    gap: 3px;
  }

  &:hover {
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.textFaint};
  }

  @media (max-width: 919px) {
    top: auto;
    bottom: 22px;
    right: 16px;
    height: 46px;
    padding: 0 16px;
    border-radius: 999px;
    box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.6);

    .keys {
      display: none;
    }
  }
`;
