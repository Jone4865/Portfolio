import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from 'styled-components';

import PageIndex from './page';
import PageCommonComponent from './page/pageCommonComponent';
import NotFoundPage from './page/404';
import Sider from './component/sider/sider';

import { CustomThemeProvider } from './contexts/ThemeContext';
import { GlobalStyle } from './styled/globalStyles';
import useResponsive from './hooks/useResponsive';

const BodyScene = lazy(() => import('./component/background/BodyScene'));

function BodyBackground() {
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

function AppContent() {
  const location = useLocation();
  const is404Page = location.pathname !== '/' && location.pathname !== '/test';

  return (
    <div className="App">
      <CustomThemeProvider>
        <GlobalStyle />
        <BodyBackground />
        {!is404Page && <Sider />}
        <Routes>
          <Route path="/" element={<PageIndex />} />
          <Route path="/test" element={<PageCommonComponent />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Analytics />
      </CustomThemeProvider>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
