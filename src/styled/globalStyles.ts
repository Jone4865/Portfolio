import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    color-scheme: ${(p) => p.theme.colorScheme};
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    margin: 0;
    min-height: 100vh;
    background-color: ${(p) => p.theme.background};
    color: ${(p) => p.theme.text};
    font-family: ${(p) => p.theme.fontSans};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    transition:
      background-color 0.35s ease,
      color 0.25s ease;
  }

  #root {
    min-height: 100vh;
  }

  ::selection {
    background: ${(p) => p.theme.accentMuted};
    color: ${(p) => p.theme.text};
  }

  :focus-visible {
    outline: 2px solid ${(p) => p.theme.accent};
    outline-offset: 2px;
  }

  * {
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${(p) => p.theme.siderBorder};
      border-radius: 999px;
    }
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${(p) => `${p.theme.siderBorder} transparent`};
  }
`;
