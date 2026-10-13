import { createGlobalStyle } from 'styled-components';

/** 필름 그레인 — 캔버스 대신 SVG 노이즈 한 장(타일)으로 그려 비용이 거의 없습니다. */
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    color-scheme: ${(p) => p.theme.colorScheme};
    /* smooth는 휠 스크롤만 — 프로그래매틱 이동은 JS에서 instant 처리 */
    scroll-behavior: auto;
    -webkit-text-size-adjust: 100%;
    background-color: ${(p) => p.theme.background};
  }

  body {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: ${(p) => p.theme.background};
    color: ${(p) => p.theme.text};
    font-family: ${(p) => p.theme.fontSans};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    word-break: keep-all;
    overflow-wrap: anywhere;
    transition:
      background-color 0.35s ease,
      color 0.25s ease;
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9000;
    pointer-events: none;
    background-image: ${GRAIN};
    opacity: ${(p) => (p.theme.colorScheme === 'dark' ? 0.06 : 0.045)};
    mix-blend-mode: overlay;
  }

  #root {
    min-height: 100vh;
  }

  ::selection {
    background: ${(p) => p.theme.accent};
    color: #fff;
  }

  :focus-visible {
    outline: 2px solid ${(p) => p.theme.accent};
    outline-offset: 3px;
  }

  kbd {
    display: inline-block;
    font-family: ${(p) => p.theme.fontMono};
    font-size: 11px;
    line-height: 1;
    padding: 4px 6px 3px;
    border-radius: 5px;
    border: 1px solid ${(p) => p.theme.lineStrong};
    border-bottom-width: 2px;
    background: ${(p) => p.theme.chipBg};
    color: ${(p) => p.theme.textSoft};
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
