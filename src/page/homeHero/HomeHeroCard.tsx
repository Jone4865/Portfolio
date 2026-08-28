import type { ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import { useReducedMotion } from 'framer-motion';

import { useResponsive } from 'hooks';

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

type Props = {
  typicalContent: ReactNode;
  backgroundSrc: string;
};

const springSoft = { type: 'spring' as const, stiffness: 280, damping: 30 };

/** 홈 히어로 — 사진 + 우측 회색 wireframe */
export default function HomeHeroCard({ typicalContent, backgroundSrc }: Props) {
  const reduceMotion = useReducedMotion();
  const { isMobile } = useResponsive();
  const enableWire = !reduceMotion && !isMobile;

  return (
    <HeroVisualFrame
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={springSoft}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              scale: 1.008,
              transition: { type: 'spring', stiffness: 420, damping: 28 },
            }
      }
    >
      <HeroImageShell>
        <HeroImageKen
          animate={reduceMotion ? undefined : { scale: [1, 1.055, 1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img alt="" src={backgroundSrc} loading="eager" decoding="async" />
        </HeroImageKen>
      </HeroImageShell>
      {enableWire && (
        <Suspense fallback={null}>
          <HeroWireframe enabled />
        </Suspense>
      )}
      <EditorialScrim
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.65, ease: 'easeOut' }}
        aria-hidden
      />
      <EditorialTyping $high>
        <TypingMotion
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.32,
            duration: 0.68,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="hero-typical-root">{typicalContent}</div>
        </TypingMotion>
        <AccentMotion
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            delay: 0.72,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: 'left center' }}
          aria-hidden
        />
      </EditorialTyping>
    </HeroVisualFrame>
  );
}
