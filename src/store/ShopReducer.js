export default (state, action) => {
  switch (action.type) {
    case "CHECKOUT_CREATED":
      return {
        ...state,
        checkout: action.payload,
      };
    case "CHECKOUT_FETCHED":
      return {
        ...state,
        checkout: action.payload,
      };
    case "CHECKOUT_ERROR":
      return {
        ...state,
        checkoutError: "Error loading Checkout",
      };
    case "UPDATE_CART":
      return {
        ...state,
        checkout: action.payload,
      };
    case "UPDATE_SHIPPING_ADDRESS":
      return {
        ...state,
        checkout: action.payload,
      };
    case "SHIPPING_ADDRESS_ERROR":
      return {
        ...state,
        shippingError: action.payload,
      };
    case "UPDATE_SHIPPING_LINES":
      return {
        ...state,
        checkout: action.payload,
      };
    case "SHIPPING_LINES_ERROR":
      return {
        ...state,
        shippingLinesError: action.payload,
      };
    case "OPEN_CART":
      return {
        ...state,
        isCartOpen: true,
      };
    case "CLOSE_CART":
      return {
        ...state,
        isCartOpen: false,
      };
    default:
      return state;
  }
};
