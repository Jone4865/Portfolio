import { useEffect, useMemo, useRef } from 'react';
import { animate, svg, stagger } from 'animejs';

import { buildRadarPath, polarToCartesian, skillRadar, skillStats } from 'data/skillRadar';
import type { SkillInsightProps } from 'types/components/skillInsight';

import {
  ChartCard,
  ChartTitle,
  Desc,
  Eyebrow,
  Header,
  Panel,
  RadarWrap,
  StatCard,
  StatLabel,
  StatValue,
  StatsRow,
  Title,
} from './SkillInsight.styles';

export default function SkillInsight({ active, isDesktop, isTablet }: SkillInsightProps) {
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
            <span data-count={skillStats.months}>0</span>+
          </StatValue>
          <StatLabel>개월 경력</StatLabel>
        </StatCard>
        <StatCard data-insight-card>
          <StatValue>
            <span data-count={skillStats.projects}>0</span>
          </StatValue>
          <StatLabel>주요 프로젝트</StatLabel>
        </StatCard>
        <StatCard data-insight-card>
          <StatValue>
            <span data-count={skillStats.coreFrameworks}>0</span>
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
