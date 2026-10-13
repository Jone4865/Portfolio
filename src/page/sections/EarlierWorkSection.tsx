import { useState } from 'react';

import { earlierProjects } from 'data/projects';
import type { ResponsiveFlags, SectionLayoutProps } from 'types/section';

import { cardRevealVariants } from '../animations/projectCardVariants';
import { MoreButton, Timeline } from '../styles/extraSections.styles';
import {
  CardHeader,
  CardTitle,
  CardWrapper,
  OrgPill,
  SectionContainer,
} from '../styles/pageLayout.styles';

/** 접기 전 기본으로 보여줄 항목 수 */
export const EARLIER_VISIBLE_COUNT = 4;
const MAIN_STACK_COUNT = 3;

type EarlierWorkSectionProps = SectionLayoutProps & Pick<ResponsiveFlags, 'isMobile'>;

export default function EarlierWorkSection({
  isActive,
  isDesktop,
  isTablet,
  isMobile,
}: EarlierWorkSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? earlierProjects : earlierProjects.slice(0, EARLIER_VISIBLE_COUNT);
  const hiddenCount = earlierProjects.length - EARLIER_VISIBLE_COUNT;

  return (
    <SectionContainer $isActive={isActive} $isDesktop={isDesktop} $isTablet={isTablet}>
      <CardWrapper
        role="region"
        aria-labelledby="earlier-work-title"
        $isDesktop={isDesktop}
        $isTablet={isTablet}
        $isMobile={isMobile}
        initial={false}
        variants={cardRevealVariants}
        animate={isActive ? 'on' : 'off'}
      >
        <CardHeader>
          <OrgPill>Earlier Work</OrgPill>
          <CardTitle id="earlier-work-title">이전 프로젝트</CardTitle>
        </CardHeader>

        <Timeline id="earlier-work-list">
          {items.map((project) => (
            <li key={`${project.title}-${project.date}`}>
              <span className="tl-title">{project.title}</span>
              <span className="tl-date">{project.date}</span>
              <span className="tl-stack">
                {project.stack
                  .slice(0, MAIN_STACK_COUNT)
                  .map((s) => s.name)
                  .join(' · ')}
              </span>
              {project.link && project.link.length > 0 && (
                <span className="tl-links">
                  {project.link.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} ${link.name} (새 탭)`}
                    >
                      {link.name.replace(' 링크', '')} ↗
                    </a>
                  ))}
                </span>
              )}
            </li>
          ))}
        </Timeline>

        {hiddenCount > 0 && (
          <MoreButton
            type="button"
            aria-expanded={expanded}
            aria-controls="earlier-work-list"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? '접기' : `더 보기 (+${hiddenCount})`}
          </MoreButton>
        )}
      </CardWrapper>
    </SectionContainer>
  );
}
