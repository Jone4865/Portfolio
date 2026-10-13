import { useCallback, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScroll } from 'framer-motion';

import CommandPalette, { MOD_KEY } from 'component/palette/CommandPalette';
import type { PaletteItem } from 'component/palette/CommandPalette';
import { PaletteTrigger } from 'component/palette/commandPalette.styles';
import { AI_SECTION, getTotalSections, MAIN_CONTENT_ID, SECTION_BASE } from 'constants/layout';
import { ThemeContext } from 'contexts';
import { aiWorkflow } from 'data/aiWorkflow';
import { profile } from 'data/profile';
import { earlierProjects, projects } from 'data/projects';
import { useResponsive, useSectionNavigation, useSidebarHeight } from 'hooks';

import HomeHero from './hero/HomeHero';
import GlobalScrollHint from './navigation/GlobalScrollHint';
import PageIndicator from './navigation/PageIndicator';
import AiWorkflowSection from './sections/AiWorkflowSection';
import EarlierWorkSection from './sections/EarlierWorkSection';
import IntroSection from './sections/IntroSection';
import ProjectCard from './sections/ProjectCard';
import { Container, PrograssStyle, SectionContainer, Wrap } from './styles/pageLayout.styles';

const initials = (title: string) => {
  const words = title.split(/[\s\-–·]+/).filter(Boolean);
  if (/^[A-Za-z]/.test(words[0] ?? '')) {
    return words
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }
  return (words[0] ?? '').slice(0, 1);
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return `복사했어요 · ${text}`;
  } catch {
    return text;
  }
}

function PageIndex() {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { scrollYProgress } = useScroll();
  const sidebarHeight = useSidebarHeight(isMobile);
  const totalSections = getTotalSections(projects.length);
  const earlierSection = SECTION_BASE + projects.length;
  const aiSection = AI_SECTION;
  const { activeSection, goToSection, maxSection } = useSectionNavigation({
    isMobile,
    projectCount: projects.length,
    sidebarHeight,
  });
  const [paletteOpen, setPaletteOpen] = useState(false);

  const goToProject = useCallback(
    (idx: number) => {
      goToSection(idx + SECTION_BASE);
      const el = document.getElementById(`project-card-${idx}`);
      if (!el) return;
      el.classList.remove('flash');
      void el.offsetWidth; // 애니메이션 재시작
      el.classList.add('flash');
    },
    [goToSection],
  );

  const paletteItems = useMemo<PaletteItem[]>(
    () => [
      ...projects.map((p, idx) => ({
        id: `project-${idx}`,
        group: '프로젝트',
        title: p.title,
        sub: `${p.key} · ${p.date} · ${p.subTitle}`,
        icon: initials(p.title),
        hint: String(idx + 1).padStart(2, '0'),
        kw: [p.key, p.subTitle, ...p.stack.map((s) => s.name)].join(' '),
        run: () => goToProject(idx),
      })),
      {
        id: 'earlier',
        group: '섹션',
        title: '이전 프로젝트',
        sub: earlierProjects.map((p) => p.title).join(' · '),
        icon: '↺',
        hint: '↵',
        kw: ['earlier', ...earlierProjects.map((p) => p.title)].join(' '),
        run: () => goToSection(earlierSection),
      },
      {
        id: 'ai',
        group: '섹션',
        title: aiWorkflow.title,
        sub: aiWorkflow.usage.map((u) => u.label).join(' · '),
        icon: 'AI',
        hint: '↵',
        kw: 'ai workflow cursor claude codex',
        run: () => goToSection(aiSection),
      },
      {
        id: 'intro',
        group: '섹션',
        title: '소개',
        sub: '개발자가 된 이야기',
        icon: '¶',
        hint: '↵',
        kw: 'intro about 소개',
        run: () => goToSection(1),
      },
      {
        id: 'home',
        group: '섹션',
        title: '맨 위로',
        sub: '3D 키보드가 있는 첫 화면',
        icon: '↑',
        hint: '↵',
        kw: 'home top 처음 키보드',
        run: () => goToSection(0),
      },
      {
        id: 'email',
        group: '바로가기',
        title: '이메일 주소 복사',
        sub: profile.email,
        icon: '@',
        hint: '복사',
        kw: 'email mail 메일 연락 contact',
        run: () => copyText(profile.email),
      },
      {
        id: 'theme',
        group: '바로가기',
        title: isDarkMode ? '라이트 모드로 보기' : '다크 모드로 보기',
        sub: '화면 테마를 바꿔요',
        icon: '◐',
        hint: '↵',
        kw: 'theme dark light 테마 다크 라이트',
        run: () => toggleTheme(),
      },
    ],
    [aiSection, earlierSection, goToProject, goToSection, isDarkMode, toggleTheme],
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
          $bleed
        >
          <HomeHero
            active={activeSection === 0 && !paletteOpen}
            isMobile={isMobile}
            onExplore={() => goToSection(SECTION_BASE)}
            onOpenPalette={() => setPaletteOpen(true)}
          />
        </SectionContainer>

        <IntroSection isActive={activeSection === 1} isDesktop={isDesktop} isTablet={isTablet} />

        <AiWorkflowSection
          isActive={activeSection === aiSection}
          isDesktop={isDesktop}
          isTablet={isTablet}
          isMobile={isMobile}
        />

        {projects.map((project, idx) => (
          <ProjectCard
            key={`${project.title}-${project.date}`}
            project={project}
            index={idx}
            total={projects.length}
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
      </Wrap>

      {activeSection >= 0 && activeSection < maxSection && (
        <GlobalScrollHint isMobile={isMobile} onNext={() => goToSection(activeSection + 1)} />
      )}

      {/* 모바일에서 사이드바(문서 흐름 안)가 main 위에 쌓이므로 body로 포털해 항상 보이게 합니다. */}
      {createPortal(
        <>
          <PaletteTrigger
            type="button"
            aria-label="명령 팔레트 열기 — 프로젝트로 바로 이동"
            aria-haspopup="dialog"
            onClick={() => setPaletteOpen(true)}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13 13 4 4" />
            </svg>
            <span>{isMobile ? '프로젝트 찾기' : '검색'}</span>
            <span className="keys" aria-hidden>
              <kbd>{MOD_KEY}</kbd>
              <kbd>K</kbd>
            </span>
          </PaletteTrigger>

          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} items={paletteItems} />
        </>,
        document.body,
      )}
    </Container>
  );
}

export default PageIndex;
