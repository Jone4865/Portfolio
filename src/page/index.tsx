import { useMemo } from 'react';
import Typical from 'react-typical';
import { useScroll } from 'framer-motion';

import backgroundImage from 'assets/image/background.jpg';
import { getTotalSections, MAIN_CONTENT_ID, SECTION_BASE } from 'constants/layout';
import { projects } from 'data/projects';
import { heroTypingLoop, heroTypingSteps } from 'data/heroTyping';
import { useResponsive, useSectionNavigation, useSidebarHeight } from 'hooks';

import HomeHeroCard from './homeHero/HomeHeroCard';
import GlobalScrollHint from './navigation/GlobalScrollHint';
import PageIndicator from './navigation/PageIndicator';
import AiWorkflowSection from './sections/AiWorkflowSection';
import EarlierWorkSection from './sections/EarlierWorkSection';
import IntroSection from './sections/IntroSection';
import ProjectCard from './sections/ProjectCard';
import {
  Container,
  PrograssStyle,
  SectionContainer,
  TypingWrapper,
  Wrap,
} from './styles/pageLayout.styles';

function PageIndex() {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const { scrollYProgress } = useScroll();
  const sidebarHeight = useSidebarHeight(isMobile);
  const totalSections = getTotalSections(projects.length);
  const earlierSection = SECTION_BASE + projects.length;
  const aiSection = earlierSection + 1;
  const { activeSection, goToSection, maxSection } = useSectionNavigation({
    isMobile,
    projectCount: projects.length,
    sidebarHeight,
  });

  const typicalComponent = useMemo(
    () => <Typical steps={[...heroTypingSteps]} loop={heroTypingLoop} />,
    [],
  );

  return (
    <Container id={MAIN_CONTENT_ID} $isDesktop={isDesktop} $isTablet={isTablet}>
      <Wrap
        $totalSections={totalSections}
        style={
          isMobile
            ? {
                height: `calc(${totalSections} * 100vh + ${sidebarHeight + 100}px)`,
              }
            : undefined
        }
      >
        <PrograssStyle $isDesktop={isDesktop} style={{ scaleX: scrollYProgress }} />

        {isDesktop && (
          <PageIndicator
            isDesktop={isDesktop}
            isTablet={isTablet}
            activeSection={activeSection}
            projectCount={projects.length}
            onGoToSection={goToSection}
          />
        )}

        <SectionContainer
          $isActive={activeSection === 0}
          $isDesktop={isDesktop}
          $isTablet={isTablet}
        >
          <TypingWrapper $isDesktop={isDesktop} $isTablet={isTablet}>
            <HomeHeroCard
              wireActive={activeSection === 0}
              typicalContent={typicalComponent}
              backgroundSrc={String(backgroundImage)}
            />
          </TypingWrapper>
        </SectionContainer>

        <IntroSection isActive={activeSection === 1} isDesktop={isDesktop} isTablet={isTablet} />

        {projects.map((project, idx) => (
          <ProjectCard
            key={`${project.title}-${project.date}`}
            project={project}
            isActive={activeSection === idx + SECTION_BASE}
            isDesktop={isDesktop}
            isTablet={isTablet}
            isMobile={isMobile}
          />
        ))}

        <EarlierWorkSection
          isActive={activeSection === earlierSection}
          isDesktop={isDesktop}
          isTablet={isTablet}
          isMobile={isMobile}
        />

        <AiWorkflowSection
          isActive={activeSection === aiSection}
          isDesktop={isDesktop}
          isTablet={isTablet}
          isMobile={isMobile}
        />
      </Wrap>

      {activeSection >= 0 && activeSection < maxSection && (
        <GlobalScrollHint isMobile={isMobile} onNext={() => goToSection(activeSection + 1)} />
      )}
    </Container>
  );
}

export default PageIndex;
