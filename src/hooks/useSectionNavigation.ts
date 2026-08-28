import { useCallback, useEffect, useRef, useState } from 'react';

import type { SectionNavigationOptions } from 'types/sectionNavigation';

export function useSectionNavigation({
  isMobile,
  projectCount,
  sidebarHeight,
}: SectionNavigationOptions) {
  const [activeSection, setActiveSection] = useState(0);
  const pendingScrollTopRef = useRef<number | null>(null);
  const pendingSectionRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollNavCleanupRef = useRef<(() => void) | null>(null);

  const maxSection = 2 + projectCount;

  const handleScroll = useCallback(() => {
    if (
      isProgrammaticScrollRef.current ||
      pendingScrollTopRef.current !== null ||
      pendingSectionRef.current !== null
    ) {
      return;
    }

    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    let newActiveSection = 0;

    if (isMobile) {
      const introThreshold = sidebarHeight + 100;
      if (scrollY < introThreshold) {
        newActiveSection = -1;
      } else {
        const adjustedScrollY = scrollY - introThreshold;
        const currentSection = Math.floor(adjustedScrollY / sectionHeight);
        newActiveSection = Math.min(Math.max(currentSection, 0), 2 + projectCount);
      }
    } else {
      const currentSection = Math.floor(scrollY / sectionHeight);
      newActiveSection = Math.min(currentSection, 2 + projectCount);
    }

    setActiveSection((prev) => (newActiveSection !== prev ? newActiveSection : prev));
  }, [isMobile, sidebarHeight, projectCount]);

  const sectionScrollTop = useCallback(
    (section: number) => {
      const vh = window.innerHeight;
      if (isMobile) {
        if (section < 0) return 0;
        return sidebarHeight + 100 + section * vh;
      }
      return section * vh;
    },
    [isMobile, sidebarHeight],
  );

  const goToSection = useCallback(
    (targetSection: number) => {
      const next = Math.min(Math.max(targetSection, isMobile ? -1 : 0), maxSection);
      if (next === activeSection && pendingSectionRef.current === null) return;

      const top = sectionScrollTop(next);
      scrollNavCleanupRef.current?.();

      isProgrammaticScrollRef.current = true;
      pendingScrollTopRef.current = top;
      pendingSectionRef.current = next;
      setActiveSection(next);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const startY = window.scrollY;
      const delta = top - startY;

      const release = () => {
        if (pendingSectionRef.current !== next) return;
        pendingScrollTopRef.current = null;
        pendingSectionRef.current = null;
        isProgrammaticScrollRef.current = false;
      };

      if (reduceMotion || Math.abs(delta) < 1) {
        window.scrollTo(0, top);
        release();
        return;
      }

      const duration = Math.min(720, Math.max(420, Math.abs(delta) * 0.55));
      const t0 = performance.now();
      let rafId = 0;
      let done = false;

      const cleanup = () => {
        cancelAnimationFrame(rafId);
        if (scrollNavCleanupRef.current === cleanup) {
          scrollNavCleanupRef.current = null;
        }
      };

      const finish = () => {
        if (done) return;
        done = true;
        window.scrollTo(0, top);
        release();
        cleanup();
      };

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        if (pendingSectionRef.current !== next) {
          cleanup();
          return;
        }
        const t = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, startY + delta * easeInOutCubic(t));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          finish();
        }
      };

      scrollNavCleanupRef.current = cleanup;
      rafId = requestAnimationFrame(step);
    },
    [activeSection, isMobile, maxSection, sectionScrollTop],
  );

  useEffect(
    () => () => {
      scrollNavCleanupRef.current?.();
    },
    [],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (
        key !== 'ArrowDown' &&
        key !== 'ArrowUp' &&
        key !== 'ArrowRight' &&
        key !== 'ArrowLeft'
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target?.isContentEditable
      ) {
        return;
      }

      e.preventDefault();
      if (key === 'ArrowDown' || key === 'ArrowRight') {
        goToSection(activeSection + 1);
      } else {
        goToSection(activeSection - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSection, goToSection]);

  useEffect(() => {
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

  return { activeSection, goToSection, maxSection };
}
