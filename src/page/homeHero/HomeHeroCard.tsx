import { lazy, Suspense } from 'react';
import { useReducedMotion } from 'framer-motion';

import {
  heroAccentTransition,
  heroHoverSpring,
  heroKenBurnsTransition,
  heroScrimTransition,
  heroSpringSoft,
  heroTypingTransition,
} from 'constants/animations';
import { useResponsive } from 'hooks';
import type { HomeHeroCardProps } from 'types/components/homeHero';

import {
  AccentMotion,
  EditorialScrim,
  EditorialTyping,
  HeroImageKen,
  HeroImageShell,
  HeroVisualFrame,
  TypingMotion,
} from './HomeHeroCard.styles';

const HeroWireframe = lazy(() => import('component/hero/HeroWireframe'));

/** 홈 히어로 — 사진 + 우측 회색 wireframe */
export default function HomeHeroCard({
  typicalContent,
  backgroundSrc,
  wireActive = true,
}: HomeHeroCardProps) {
  const reduceMotion = useReducedMotion();
  const { isMobile } = useResponsive();
  const enableWire = !reduceMotion && !isMobile;

  return (
    <HeroVisualFrame
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={heroSpringSoft}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              scale: 1.008,
              transition: heroHoverSpring,
            }
      }
    >
      <HeroImageShell>
        <HeroImageKen
          animate={reduceMotion ? undefined : { scale: [1, 1.055, 1] }}
          transition={heroKenBurnsTransition}
        >
          <img alt="" src={backgroundSrc} loading="eager" decoding="async" />
        </HeroImageKen>
      </HeroImageShell>
      {enableWire && (
        <Suspense fallback={null}>
          <HeroWireframe enabled active={wireActive} />
        </Suspense>
      )}
      <EditorialScrim
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={heroScrimTransition}
        aria-hidden
      />
      <EditorialTyping $high>
        <TypingMotion
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={heroTypingTransition}
        >
          <div className="hero-typical-root">{typicalContent}</div>
        </TypingMotion>
        <AccentMotion
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={heroAccentTransition}
          style={{ transformOrigin: 'left center' }}
          aria-hidden
        />
      </EditorialTyping>
    </HeroVisualFrame>
  );
}
