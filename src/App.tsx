import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import PageIndex from './page';
import PageCommonComponent from './page/pageCommonComponent';
import NotFoundPage from './page/404';
import Sider from './component/sider/sider';

import { CustomThemeProvider } from './contexts/ThemeContext';
import { GlobalStyle } from './styled/globalStyles';

function AppContent() {
  const location = useLocation();
  const is404Page = location.pathname !== '/' && location.pathname !== '/test';

  return (
    <div className="App">
      <CustomThemeProvider>
        <GlobalStyle />
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
