import { useLocation, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import BodyBackground from 'app/BodyBackground';
import SkipLink from 'component/ui/skipLink';
import Sider from 'component/sider/sider';
import { CustomThemeProvider } from 'contexts';
import NotFoundPage from 'page/404';
import PageIndex from 'page';
import PageCommonComponent from 'page/pageCommonComponent';
import { GlobalStyle } from 'styled/globalStyles';

export default function AppShell() {
  const location = useLocation();
  const is404Page = location.pathname !== '/' && location.pathname !== '/test';

  return (
    <CustomThemeProvider>
      <GlobalStyle />
      <SkipLink />
      <BodyBackground />
      {!is404Page && <Sider />}
      <Routes>
        <Route path="/" element={<PageIndex />} />
        <Route path="/test" element={<PageCommonComponent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Analytics />
    </CustomThemeProvider>
  );
}
