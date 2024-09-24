import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageCommonComponent from "./page/pageCommonComponent";
import PageIndex from "./page";
import { GlobalStyle } from "./styled/globalStyles";
import Sider from "./component/sider/sider";
import { CustomThemeProvider } from "./contexts/ThemeContext";

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
