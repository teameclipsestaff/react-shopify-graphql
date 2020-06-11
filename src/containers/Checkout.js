import React, { useContext } from "react";
import styled from "styled-components";
import { ShopContext } from "../store/context";
import CartLineItem from "../components/CartLineItem";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Switch, Route } from "react-router-dom";

import Info from "../components/Checkout/Info";
import Payment from "../components/Checkout/Payment";
import Shipping from "../components/Checkout/Shipping";

const Checkout = () => {
  const { checkout } = useContext(ShopContext);
  const {
    lineItems,
    subtotalPriceV2,
    totalTaxV2,
    totalPriceV2,
    shippingLine,
  } = checkout;

  return (
    <Container>
      <Wrapper>
        <Main>
          <BackBtn to="/shop">
            <FiArrowLeft /> Back To Cart
          </BackBtn>
          <Switch>
            <Route path="/checkout/info" exact>
              <Info />
            </Route>
            <Route path="/checkout/Shipping" exact>
              <Shipping />
            </Route>
            <Route path="/checkout/Payment" exact>
              <Payment />
            </Route>
          </Switch>
        </Main>
        <Summary>
          <h1 className="title">Order Summary</h1>
          <ProductListSection>
            {lineItems ? (
              lineItems.edges.map((lineItem) => (
                <CartLineItem
                  key={`cart-${lineItem.node.variant.id}`}
                  item={lineItem.node}
                />
              ))
            ) : (
              <h1>Cart Empty</h1>
            )}
          </ProductListSection>
          <DiscountSection>
            <input type="text" placeholder="Gift Card or Discount Code" />
            <button>Apply</button>
          </DiscountSection>
          <TotalSection>
            {lineItems && (
              <>
                <TotalRow>
                  <h3>Subtotal</h3>
                  <h3>${subtotalPriceV2.amount}</h3>
                </TotalRow>
                {shippingLine && (
                  <TotalRow>
                    <h3>Shipping</h3>
                    <h3>${shippingLine.priceV2.amount}</h3>
                  </TotalRow>
                )}
                <TotalRow>
                  <h3>Tax</h3>
                  <h3>${totalTaxV2.amount}</h3>
                </TotalRow>
                <TotalRow>
                  <h3>Total</h3>
                  <h3>${totalPriceV2.amount}</h3>
                </TotalRow>
              </>
            )}
          </TotalSection>
        </Summary>
      </Wrapper>
    </Container>
  );
};

export default Checkout;

const ProductListSection = styled.div``;

const DiscountSection = styled.div``;

const TotalSection = styled.div``;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  h3 {
    font-weight: 300;
    font-size: 0.9rem;
  }
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;
const BackBtn = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary};
  svg {
    margin-right: 1rem;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  padding: 1rem;
  .title {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.blue};
    margin: 1rem 0;
  }
`;

const Main = styled.div`
  width: 60%;
  padding: 0.8rem 1rem;
`;
const Summary = styled.div`
  width: 40%;
  padding: 2rem;
`;
