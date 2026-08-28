import styled from 'styled-components';

export const Panel = styled.div<{ $desktop: boolean; $tablet: boolean }>`
  width: min(720px, 94%);
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  margin: 0 auto;
  padding: clamp(20px, 3vw, 28px);
  border-radius: 22px;
  background: ${({ theme }) => theme.cardColor};
  color: ${({ theme }) => theme.cardText};
  border: 1px solid ${({ theme }) => theme.cardBorder};
  box-shadow: ${({ theme }) => theme.shadowCard};
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Header = styled.header`
  display: grid;
  gap: 6px;
`;

export const Eyebrow = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.2rem, 2.2vw, 1.55rem);
  letter-spacing: -0.03em;
`;

export const Desc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.cardTextMuted};
  font-size: 14px;
  line-height: 1.55;
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  opacity: 0;
  padding: 14px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.chipBg};
  border: 1px solid ${({ theme }) => theme.chipBorder};
`;

export const StatValue = styled.div`
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.accent};
`;

export const StatLabel = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.cardTextMuted};
`;

export const ChartCard = styled.div`
  opacity: 0;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.siderArrowColor};
  color: ${({ theme }) => theme.accent};
`;

export const ChartTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.cardText};
`;

export const RadarWrap = styled.div`
  height: min(280px, 48vh);
  max-width: 360px;
  margin: 0 auto;
`;
