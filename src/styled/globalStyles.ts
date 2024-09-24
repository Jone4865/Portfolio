import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.25s linear;
    margin: -0;
  }
  * {
     ::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; 
      scrollbar-width: none;
  }
`;
