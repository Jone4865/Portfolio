import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from 'styled-components';

import { useIdleReady, useResponsive } from 'hooks';

const BodyScene = lazy(() => import('component/background/BodyScene'));

export default function BodyBackground() {
  const reduceMotion = useReducedMotion();
  const theme = useTheme();
  const { isMobile } = useResponsive();
  const location = useLocation();
  const is404Page = location.pathname !== '/' && location.pathname !== '/test';
  const shouldRender = !is404Page && !reduceMotion && !isMobile;
  // 배경 MacBook(GLB·HDR 포함)은 히어로 wireframe보다 조금 더 늦게 시작해 첫 화면과 경쟁하지 않게 합니다.
  const ready = useIdleReady(shouldRender, { delay: 1600 });

  if (!shouldRender || !ready) return null;

  return (
    <Suspense fallback={null}>
      <BodyScene enabled accent={theme.accent} />
    </Suspense>
  );
}
