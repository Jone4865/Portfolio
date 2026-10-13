import styled from 'styled-components';

/** AI·이전 프로젝트 섹션 — 기존 카드(CardWrapper) 안에서 쓰는 보조 요소 */

export const Lead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.cardText};
  font-size: 15px;
  font-weight: 600;
  line-height: 1.65;
  word-break: keep-all;
`;

export const UsageList = styled.dl`
  margin: 0;
  display: grid;
  gap: 10px;

  > div {
    display: grid;
    gap: 2px;
  }

  dt {
    font-weight: 700;
    color: ${({ theme }) => theme.cardText};
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.cardTextMuted};
    word-break: keep-all;
  }
`;

export const PrincipleList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  counter-reset: principle;

  li {
    counter-increment: principle;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.cardText};
    background: ${({ theme }) => theme.chipBg};
    border: 1px solid ${({ theme }) => theme.chipBorder};
    word-break: keep-all;
  }

  li::before {
    content: counter(principle);
    color: ${({ theme }) => theme.accent};
    font-weight: 800;
  }
`;

export const Closing = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.cardText};
  font-weight: 600;
  word-break: keep-all;
`;

export const Timeline = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 12px;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  }

  li:last-child {
    border-bottom: none;
  }

  .tl-title {
    font-weight: 700;
    color: ${({ theme }) => theme.cardText};
  }

  .tl-date {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.cardTextMuted};
    font-variant-numeric: tabular-nums;
  }

  .tl-stack {
    flex: 1 1 200px;
    color: ${({ theme }) => theme.cardTextMuted};
  }

  .tl-links {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tl-links a {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
    white-space: nowrap;
  }

  .tl-links a:hover,
  .tl-links a:focus-visible {
    text-decoration: underline;
  }
`;

export const MoreButton = styled.button`
  appearance: none;
  align-self: flex-start;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  color: ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.chipBg};
  border: 1px solid ${({ theme }) => theme.chipBorder};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.accent};
    outline-offset: 2px;
  }
`;
