import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *:focus {outline:0;}
  body {
    background: #fff;
    overflow: ${({ isCartOpen }) => (isCartOpen ? "hidden" : "auto")};
    color: ${({ theme }) => theme.black};
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Jost', sans-serif;
    transition: all 0.25s linear;
  }
`;
