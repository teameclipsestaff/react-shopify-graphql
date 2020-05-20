import React, { useContext } from "react";
import styled from "styled-components";
import { ShopContext } from "../store/context";
import CartLineItem from "./CartLineItem";
import { IoIosClose } from "react-icons/io";

const Cart = () => {
  const { isCartOpen, closeCart, checkout } = useContext(ShopContext);
  const { lineItems, subtotalPriceV2, totalTaxV2, totalPriceV2 } = checkout;

  return (
    <>
      <Overlay isCartOpen={isCartOpen} onClick={() => closeCart()} />
      <Container isCartOpen={isCartOpen}>
        {checkout.id && (
          <>
            <Header>
              <h1>Bag</h1>
              <button onClick={() => closeCart()}>
                <IoIosClose />
              </button>
            </Header>
            <LineItems>
              {lineItems.edges[0] ? (
                lineItems.edges.map((lineItem) => (
                  <CartLineItem
                    key={`cart-${lineItem.node.variant.id}`}
                    item={lineItem.node}
                  />
                ))
              ) : (
                <h1>Cart Empty</h1>
              )}
            </LineItems>
            <TotalSection>
              <TotalRow>
                <h3>Subtotal</h3>
                <h3>${subtotalPriceV2.amount}</h3>
              </TotalRow>
              <TotalRow>
                <h3>Tax</h3>
                <h3>${totalTaxV2.amount}</h3>
              </TotalRow>
              <TotalRow>
                <h3>Total</h3>
                <h3>${totalPriceV2.amount}</h3>
              </TotalRow>
              <CheckoutButon>Checkout</CheckoutButon>
            </TotalSection>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;

const LineItems = styled.div`
  flex: 2 1 0%;
  overflow: auto;
  &:-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(241, 242, 244);
  padding: 0.7rem;
  h1 {
    font-size: 1rem;
  }
  button {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease-in;
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }
`;

const CheckoutButon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  cursor: pointer;
  background: ${({ theme }) => theme.primary};
  margin-top: 1rem;
  color: #fff;
  box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
    rgba(8, 11, 14, 0.1) 0px 6px 6px -1px;
  transition: box-shadow 0.2s ease-in;
  &:hover {
    box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
      rgba(8, 11, 14, 0.1) 0px 16px 16px -1px;
  }
`;

const TotalSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  h3 {
    font-weight: 300;
    font-size: 0.9rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: ${({ isCartOpen }) => (isCartOpen ? "block" : "none")};
`;

const Container = styled.div`
  /* background: ${({ theme }) => theme.lightGray}; */
  background: #FFF;
  padding: 2rem 2rem;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ isCartOpen }) => (isCartOpen ? "0" : "400px")});
  box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
    rgba(8, 11, 14, 0.1) 0px 6px 6px -1px;
  transition: all 0.2s ease-in;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
