import React from "react";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global";
import { ThemeProvider } from "styled-components";

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
