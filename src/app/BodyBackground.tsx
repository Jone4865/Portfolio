import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from 'styled-components';

import { useResponsive } from 'hooks';

const BodyScene = lazy(() => import('component/background/BodyScene'));

export default function BodyBackground() {
  const reduceMotion = useReducedMotion();
  const theme = useTheme();
  const { isMobile } = useResponsive();
  const location = useLocation();
  const is404Page = location.pathname !== '/' && location.pathname !== '/test';

  if (is404Page || reduceMotion || isMobile) return null;

  return (
    <Suspense fallback={null}>
      <BodyScene enabled accent={theme.accent} />
    </Suspense>
  );
}
