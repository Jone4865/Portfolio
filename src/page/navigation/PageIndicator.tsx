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
    <PageIndicatorRail isDesktop={isDesktop} isTablet={isTablet}>
      {pageIndicatorSections.map((section) => (
        <DotGroup key={section.id}>
          <DotLabel>{section.label}</DotLabel>
          <PageDot
            isActive={activeSection === section.index}
            onClick={() => onGoToSection(section.index)}
          />
        </DotGroup>
      ))}

      <DotGroup>
        <DotLabel>Projects</DotLabel>
        {Array.from({ length: projectCount }, (_, idx) => (
          <PageDot
            key={idx}
            isActive={activeSection === idx + SECTION_BASE}
            onClick={() => onGoToSection(idx + SECTION_BASE)}
          />
        ))}
      </DotGroup>
    </PageIndicatorRail>
  );
}
