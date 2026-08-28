import { useMemo } from 'react';
import Typical from 'react-typical';

import backgroundImage from '../assets/image/background.jpg';
import { SECTION_BASE } from '../constants/layout';
import { projects } from '../data/projects';
import useResponsive from '../hooks/useResponsive';
import { useSectionNavigation } from '../hooks/useSectionNavigation';
import { useSidebarHeight } from '../hooks/useSidebarHeight';
import SkillInsight from '../component/charts/SkillInsight';
import HomeHeroCard from './homeHero/HomeHeroCard';
import GlobalScrollHint from './navigation/GlobalScrollHint';
import PageIndicator from './navigation/PageIndicator';
import IntroSection from './sections/IntroSection';
import ProjectCard from './sections/ProjectCard';
import {
  Container,
  PrograssStyle,
  SectionContainer,
  TypingWrapper,
  Wrap,
} from './styles/pageLayout.styles';
import { useScroll } from 'framer-motion';

function PageIndex() {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const { scrollYProgress } = useScroll();
  const sidebarHeight = useSidebarHeight(isMobile);
  const { activeSection, goToSection } = useSectionNavigation({
    isMobile,
    projectCount: projects.length,
    sidebarHeight,
  });

  const typicalComponent = useMemo(
    () => (
      <Typical
        steps={[
          '안녕하세요. 키보드 위를 서핑하는,',
          1000,
          'Developer 채종원의 포트폴리오입니다.',
          1000,
        ]}
        loop={3}
      />
    ),
    [],
  );

  return (
    <Container isDesktop={isDesktop} isTablet={isTablet}>
      <Wrap
        totalSections={SECTION_BASE + projects.length}
        style={
          isMobile
            ? {
                height: `calc(${SECTION_BASE + projects.length} * 100vh + ${sidebarHeight + 100}px)`,
              }
            : undefined
        }
      >
        <PrograssStyle isDesktop={isDesktop} style={{ scaleX: scrollYProgress }} />

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
          isActive={activeSection === 0}
          isDesktop={isDesktop}
          isTablet={isTablet}
        >
          <TypingWrapper isDesktop={isDesktop} isTablet={isTablet}>
            <HomeHeroCard
              typicalContent={typicalComponent}
              backgroundSrc={String(backgroundImage)}
            />
          </TypingWrapper>
        </SectionContainer>

        <IntroSection
          isActive={activeSection === 1}
          isDesktop={isDesktop}
          isTablet={isTablet}
        />

        <SectionContainer
          isActive={activeSection === 2}
          isDesktop={isDesktop}
          isTablet={isTablet}
        >
          <SkillInsight
            active={activeSection === 2}
            isDesktop={isDesktop}
            isTablet={isTablet}
          />
        </SectionContainer>

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
      </Wrap>

      {activeSection >= 0 && activeSection < 2 + projects.length && (
        <GlobalScrollHint
          isMobile={isMobile}
          onNext={() => goToSection(activeSection + 1)}
        />
      )}
    </Container>
  );
}

export default PageIndex;
