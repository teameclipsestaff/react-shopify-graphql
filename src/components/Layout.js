import React, { useContext } from "react";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global";
import { ThemeProvider } from "styled-components";
import { ShopContext } from "../store/context";

const Layout = ({ children }) => {
  const { isCartOpen } = useContext(ShopContext);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles isCartOpen={isCartOpen} />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
