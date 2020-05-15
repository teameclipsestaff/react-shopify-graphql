import React, { Component, createContext } from "react";

const ShopContext = createContext();

class ShopProvider extends Component {
  state = {
    checkout: {},
    isCartOpen: false,
  };
  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export { ShopContext };
export default ShopProvider;
