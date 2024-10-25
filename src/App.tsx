import { BrowserRouter, Route, Routes } from "react-router-dom";

import PageIndex from "./page";
import PageCommonComponent from "./page/pageCommonComponent";
import Sider from "./component/sider/sider";

import { CustomThemeProvider } from "./contexts/ThemeContext";
import { GlobalStyle } from "./styled/globalStyles";

function App() {
  return (
    <div className="App">
      <CustomThemeProvider>
        <GlobalStyle />
        <Sider />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageIndex />} />
            <Route path="/common" element={<PageCommonComponent />} />
          </Routes>
        </BrowserRouter>
      </CustomThemeProvider>
    </div>
  );
}

export default App;
