import React, { useContext, useState } from "react";
import { ShopContext } from "../../store/context";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Shipping = () => {
  const [shippingHandle, setShippingHandle] = useState(null);
  const history = useHistory();
  const {
    checkout: { email, availableShippingRates, shippingAddress },
    updateCartShippingLine,
  } = useContext(ShopContext);
  const addressString =
    shippingAddress &&
    `${shippingAddress.address1}${shippingAddress.address2}, ${shippingAddress.city} ${shippingAddress.province} ${shippingAddress.zip}, ${shippingAddress.country}`;

  const onSubmit = async () => {
    if (shippingHandle) {
      await updateCartShippingLine(shippingHandle);
      await history.push("/checkout/payment");
    }
  };

  return (
    <Container>
      <RowWrapper>
        <Row>
          <RowHeader>Contact</RowHeader>
          <RowTitle>{email ? email : "Please enter an email"}</RowTitle>
          <Link to="/checkout/info">Change</Link>
        </Row>
        <Row>
          <RowHeader>Ship to</RowHeader>
          <RowTitle>
            {shippingAddress
              ? addressString
              : "Please enter a shipping address"}
          </RowTitle>
          <Link to="/checkout/info">Change</Link>
        </Row>
      </RowWrapper>
      <div>
        <h1>Shipping method</h1>
        <RowWrapper>
          {availableShippingRates &&
            availableShippingRates.shippingRates.map((rate, index) => (
              <Row key={rate.handle}>
                <input
                  type="radio"
                  name="shipping"
                  id={rate.handle}
                  // defaultChecked={index === 0 ? true : false}
                  onChange={() => setShippingHandle(rate.handle)}
                />
                <RowTitle>{rate.title} Shipping</RowTitle>
                <label htmlFor={rate.handle}>${rate.priceV2.amount}</label>
              </Row>
            ))}
        </RowWrapper>
      </div>
      <Footer>
        <BackBtn to="/checkout/info">Return to information</BackBtn>
        <NextBtn shippingHandle={shippingHandle} onClick={() => onSubmit()}>
          Continue to payment
        </NextBtn>
      </Footer>
    </Container>
  );
};

export default Shipping;

const BackBtn = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
`;

const NextBtn = styled.button`
  border: none;
  text-decoration: none;
  color: white;
  background: ${({ theme, shippingHandle }) =>
    shippingHandle ? theme.secondary : theme.gray};
  cursor: ${({ shippingHandle }) =>
    shippingHandle ? "pointer" : "not-allowed"};
  padding: 0.8rem 1rem;
  border-radius: 0.4rem;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 1rem;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.blue};
  }
`;
const RowWrapper = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  padding: 0 1rem;
  margin: 2rem 0;
  hr {
    height: 1px;
    background: #d9d9d9;
    border: none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #d9d9d9;
  &:nth-last-child(1) {
    border: none;
  }
  a,
  label {
    font-size: 0.8rem;
    text-decoration: none;
    color: ${({ theme }) => theme.blue};
  }

  input {
    margin-right: 1rem;
  }
`;

const RowHeader = styled.p`
  font-size: 0.8rem;
  margin-right: 1rem;
  color: ${({ theme }) => theme.gray};
`;
const RowTitle = styled.p`
  flex: 2;
  font-size: 0.8rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
