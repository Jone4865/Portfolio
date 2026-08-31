import { SECTION_BASE } from 'constants/layout';
import { pageIndicatorSections } from 'data/pageIndicator';
import type { PageIndicatorProps } from 'types/components/pageIndicator';

import {
  DotGroup,
  DotLabel,
  PageDot,
  PageIndicator as PageIndicatorRail,
} from '../styles/pageLayout.styles';

export default function PageIndicator({
  isDesktop,
  isTablet,
  activeSection,
  projectCount,
  onGoToSection,
}: PageIndicatorProps) {
  return (
    <PageIndicatorRail $isDesktop={isDesktop} $isTablet={isTablet} aria-label="페이지 섹션 탐색">
      {pageIndicatorSections.map((section) => (
        <DotGroup key={section.id}>
          <DotLabel>{section.label}</DotLabel>
          <PageDot
            type="button"
            aria-label={`${section.label} 섹션으로 이동`}
            aria-current={activeSection === section.index ? 'true' : undefined}
            $isActive={activeSection === section.index}
            onClick={() => onGoToSection(section.index)}
          />
        </DotGroup>
      ))}

      <DotGroup>
        <DotLabel>Projects</DotLabel>
        {Array.from({ length: projectCount }, (_, idx) => {
          const sectionIndex = idx + SECTION_BASE;
          return (
            <PageDot
              key={idx}
              type="button"
              aria-label={`프로젝트 ${idx + 1} 섹션으로 이동`}
              aria-current={activeSection === sectionIndex ? 'true' : undefined}
              $isActive={activeSection === sectionIndex}
              onClick={() => onGoToSection(sectionIndex)}
            />
          );
        })}
      </DotGroup>
    </PageIndicatorRail>
  );
}
