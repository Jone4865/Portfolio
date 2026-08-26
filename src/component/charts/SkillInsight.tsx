import { useEffect, useMemo, useRef } from 'react';
import { animate, svg, stagger } from 'animejs';
import styled from 'styled-components';

type Props = {
  active: boolean;
  isDesktop: boolean;
  isTablet: boolean;
};

const skillRadar = [
  { label: 'React', value: 92 },
  { label: 'Next.js', value: 88 },
  { label: 'Vue 3', value: 82 },
  { label: 'TypeScript', value: 90 },
  { label: 'UI/UX', value: 84 },
  { label: 'Architecture', value: 80 },
];

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function buildRadarPath(values: number[], size: number) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.34;
  const step = 360 / values.length;

  return values
    .map((value, index) => {
      const point = polarToCartesian(cx, cy, (value / 100) * maxR, index * step);
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    })
    .join(' ')
    .concat(' Z');
}

export default function SkillInsight({ active, isDesktop, isTablet }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const radarPathRef = useRef<SVGPathElement>(null);

  const radarOutline = useMemo(
    () =>
      buildRadarPath(
        skillRadar.map((s) => s.value),
        280,
      ),
    [],
  );
  const radarGuides = useMemo(
    () =>
      [0.35, 0.6, 0.85].map((scale) =>
        buildRadarPath(
          skillRadar.map(() => 100 * scale),
          280,
        ),
      ),
    [],
  );

  useEffect(() => {
    if (!active || !rootRef.current) return;

    const cards = rootRef.current.querySelectorAll('[data-insight-card]');
    const labels = rootRef.current.querySelectorAll('[data-radar-label]');

    animate(cards, {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(90),
      duration: 700,
      ease: 'outExpo',
    });

    animate(labels, {
      opacity: [0, 1],
      delay: stagger(60, { start: 220 }),
      duration: 500,
      ease: 'outQuad',
    });

    if (radarPathRef.current) {
      const drawable = svg.createDrawable(radarPathRef.current);
      animate(drawable, {
        draw: ['0 0', '0 1'],
        duration: 1200,
        ease: 'inOutCubic',
      });
      animate(radarPathRef.current, {
        opacity: [0, 1],
        duration: 400,
      });
    }

    const counters = rootRef.current.querySelectorAll<HTMLElement>('[data-count]');
    counters.forEach((el) => {
      const target = Number(el.dataset.count || 0);
      const state = { value: 0 };
      animate(state, {
        value: target,
        duration: 1100,
        delay: 240,
        ease: 'outExpo',
        onUpdate: () => {
          el.textContent = String(Math.round(state.value));
        },
      });
    });
  }, [active]);

  return (
    <Panel ref={rootRef} $desktop={isDesktop} $tablet={isTablet}>
      <Header>
        <Eyebrow>Insight</Eyebrow>
        <Title>스킬·커리어 한눈에</Title>
        <Desc>핵심 스킬 레이더와 경력 지표로 강점을 정리했습니다.</Desc>
      </Header>

      <StatsRow>
        <StatCard data-insight-card>
          <StatValue>
            <span data-count="44">0</span>+
          </StatValue>
          <StatLabel>개월 경력</StatLabel>
        </StatCard>
        <StatCard data-insight-card>
          <StatValue>
            <span data-count="14">0</span>
          </StatValue>
          <StatLabel>주요 프로젝트</StatLabel>
        </StatCard>
        <StatCard data-insight-card>
          <StatValue>
            <span data-count="3">0</span>
          </StatValue>
          <StatLabel>코어 프레임워크</StatLabel>
        </StatCard>
      </StatsRow>

      <ChartCard data-insight-card>
        <ChartTitle>Core Skill Radar</ChartTitle>
        <RadarWrap>
          <svg viewBox="0 0 280 280" width="100%" height="100%" role="img" aria-label="스킬 레이더">
            {radarGuides.map((d) => (
              <path key={d} d={d} fill="none" stroke="currentColor" strokeOpacity="0.18" />
            ))}
            {skillRadar.map((skill, index) => {
              const angle = (360 / skillRadar.length) * index;
              const tip = polarToCartesian(140, 140, 108, angle);
              const label = polarToCartesian(140, 140, 124, angle);
              return (
                <g key={skill.label}>
                  <line
                    x1="140"
                    y1="140"
                    x2={tip.x}
                    y2={tip.y}
                    stroke="currentColor"
                    strokeOpacity="0.2"
                  />
                  <text
                    data-radar-label
                    x={label.x}
                    y={label.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fill="currentColor"
                    opacity="0"
                  >
                    {skill.label}
                  </text>
                </g>
              );
            })}
            <path
              ref={radarPathRef}
              d={radarOutline}
              fill="currentColor"
              fillOpacity="0.16"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0"
            />
          </svg>
        </RadarWrap>
      </ChartCard>
    </Panel>
  );
}

const Panel = styled.div<{ $desktop: boolean; $tablet: boolean }>`
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

const Header = styled.header`
  display: grid;
  gap: 6px;
`;

const Eyebrow = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.accent};
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.2rem, 2.2vw, 1.55rem);
  letter-spacing: -0.03em;
`;

const Desc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.cardTextMuted};
  font-size: 14px;
  line-height: 1.55;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  opacity: 0;
  padding: 14px 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.chipBg};
  border: 1px solid ${({ theme }) => theme.chipBorder};
`;

const StatValue = styled.div`
  font-size: 1.55rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.accent};
`;

const StatLabel = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.cardTextMuted};
`;

const ChartCard = styled.div`
  opacity: 0;
  padding: 14px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.siderArrowColor};
  color: ${({ theme }) => theme.accent};
`;

const ChartTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.cardText};
`;

const RadarWrap = styled.div`
  height: min(280px, 48vh);
  max-width: 360px;
  margin: 0 auto;
`;
