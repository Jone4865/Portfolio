import { SECTION_BASE } from '../../constants/layout';
import {
  DotGroup,
  DotLabel,
  PageDot,
  PageIndicator as PageIndicatorRail,
} from '../styles/pageLayout.styles';

type Props = {
  isDesktop: boolean;
  isTablet: boolean;
  activeSection: number;
  projectCount: number;
  onGoToSection: (section: number) => void;
};

export default function PageIndicator({
  isDesktop,
  isTablet,
  activeSection,
  projectCount,
  onGoToSection,
}: Props) {
  return (
    <PageIndicatorRail isDesktop={isDesktop} isTablet={isTablet}>
      <DotGroup>
        <DotLabel>Home</DotLabel>
        <PageDot isActive={activeSection === 0} onClick={() => onGoToSection(0)} />
      </DotGroup>

      <DotGroup>
        <DotLabel>Intro</DotLabel>
        <PageDot isActive={activeSection === 1} onClick={() => onGoToSection(1)} />
      </DotGroup>

      <DotGroup>
        <DotLabel>Skills</DotLabel>
        <PageDot isActive={activeSection === 2} onClick={() => onGoToSection(2)} />
      </DotGroup>

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
