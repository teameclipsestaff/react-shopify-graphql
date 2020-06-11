import React, { createContext, useEffect, useReducer } from "react";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  CREATE_CHECKOUT,
  FETCH_CHECKOUT,
  UPDATE_CHECKOUT,
  UPDATE_SHIPPING_ADDRESS,
  UPDATE_SHIPPING_LINE,
} from "../store/query";
import ShopReducer from "./ShopReducer";

const initialState = {
  checkout: {},
  isCartOpen: false,
};
const ShopContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShopReducer, initialState);

  const [createCheckout] = useMutation(CREATE_CHECKOUT, {
    onCompleted: ({ checkoutCreate }) => {
      localStorage.setItem("storeCheckout", checkoutCreate.checkout.id);
      dispatch({
        type: "CHECKOUT_CREATED",
        payload: checkoutCreate.checkout,
      });
    },
    onError: ({ checkoutCreate }) => {
      dispatch({
        type: "CHECKOUT_ERROR",
        payload: checkoutCreate.checkoutUserErrors,
      });
    },
  });

  const [fetchCheckout] = useLazyQuery(FETCH_CHECKOUT, {
    variables: {
      id: localStorage.storeCheckout,
    },
    onCompleted: (data) => {
      dispatch({
        type: "CHECKOUT_FETCHED",
        payload: data.node,
      });
    },
    onError: (data) => {
      console.log("fetch checkout error", data);

      dispatch({
        type: "CHECKOUT_ERROR",
        payload: data,
      });
    },
  });

  const [updateCart] = useMutation(UPDATE_CHECKOUT, {
    onCompleted: ({ checkoutLineItemsReplace }) => {
      dispatch({
        type: "UPDATE_CART",
        payload: checkoutLineItemsReplace.checkout,
      });
      openCart();
    },
  });

  const [updateShipping] = useMutation(UPDATE_SHIPPING_ADDRESS, {
    onCompleted: ({ checkoutShippingAddressUpdateV2 }) => {
      console.log(checkoutShippingAddressUpdateV2);

      dispatch({
        type: "UPDATE_SHIPPING_ADDRESS",
        payload: checkoutShippingAddressUpdateV2.checkout,
      });
    },
    onError: (data) => {
      console.log("update shipping error", data);

      dispatch({
        type: "SHIPPING_ADDRESS_ERROR",
        payload: data,
      });
    },
  });

  const [updateShippingLines] = useMutation(UPDATE_SHIPPING_LINE, {
    onCompleted: ({ checkoutShippingLineUpdate }) => {
      console.log(checkoutShippingLineUpdate);

      dispatch({
        type: "UPDATE_SHIPPING_LINES",
        payload: checkoutShippingLineUpdate.checkout,
      });
    },
    onError: (data) => {
      console.log("update shipping line error", data);

      dispatch({
        type: "SHIPPING_LINES_ERROR",
        payload: data,
      });
    },
  });

  useEffect(() => {
    //IF the checkoutId is saved to local storage then fetch it
    //ELSE create a new checkout

    localStorage.storeCheckout
      ? fetchCheckout(localStorage.storeCheckout)
      : createCheckout();
    return () => {};
  }, [createCheckout, fetchCheckout]);

  const addVariantToCart = async (variantId, quantity) => {
    const newLineItem = { variantId, quantity };
    const checkoutId = state.checkout.id;
    const lineItems = convertLineItemsArray(state.checkout.lineItems.edges);
    const index = lineItems.findIndex((item) => item.variantId === variantId);

    if (index === -1) {
      lineItems.push(newLineItem);
    } else {
      let newQuantity = lineItems[index].quantity + quantity;
      newLineItem.quantity = newQuantity;
      lineItems[index] = newLineItem;
    }

    updateCart({ variables: { checkoutId: checkoutId, lineItems: lineItems } });
  };

  const removeVariantFromCart = (variantId) => {
    const checkoutId = state.checkout.id;

    //Convert checkout to {variantId, quanitity} object
    const items = convertLineItemsArray(state.checkout.lineItems.edges);

    //Find the variant that we need to remove from the checkout
    const lineItems = items.filter((item) => item.variantId !== variantId);

    updateCart({ variables: { checkoutId: checkoutId, lineItems: lineItems } });
  };

  const updateVariantInCart = (variantId, quantity) => {
    const newLineItem = { variantId, quantity };
    const checkoutId = state.checkout.id;
    const lineItems = convertLineItemsArray(state.checkout.lineItems.edges);
    const index = lineItems.findIndex((item) => item.variantId === variantId);
    lineItems[index] = newLineItem;

    updateCart({ variables: { checkoutId: checkoutId, lineItems: lineItems } });
  };

  const updateShippingAddress = (shippingAddress) => {
    const checkoutId = state.checkout.id;
    return updateShipping({
      variables: { checkoutId: checkoutId, shippingAddress: shippingAddress },
    });
  };

  const updateCartShippingLine = (shippingRateHandle) => {
    const checkoutId = state.checkout.id;
    return updateShippingLines({
      variables: {
        checkoutId: checkoutId,
        shippingRateHandle: shippingRateHandle,
      },
    });
  };

  const convertLineItemsArray = (oldArray) => {
    const lineItems = [];
    oldArray.forEach((lineItem) => {
      let item = {
        variantId: lineItem.node.variant.id,
        quantity: lineItem.node.quantity,
      };
      lineItems.push(item);
    });
    return lineItems;
  };

  const openCart = () => {
    dispatch({ type: "OPEN_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  return (
    <ShopContext.Provider
      value={{
        ...state,
        closeCart,
        openCart,
        addVariantToCart,
        removeVariantFromCart,
        updateVariantInCart,
        updateShippingAddress,
        updateCartShippingLine,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export { ShopContext };
export default ShopProvider;
