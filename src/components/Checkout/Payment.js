import React, { useContext, useState } from "react";
import { ShopContext } from "../../store/context";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm, FormContext } from "react-hook-form";
import FormInput from "../Form/FormInput";

const Payment = () => {
  const methods = useForm();

  const {
    checkout: { email, shippingAddress, shippingLine },
  } = useContext(ShopContext);

  const addressString =
    shippingAddress &&
    `${shippingAddress.address1}${shippingAddress.address2}, ${shippingAddress.city} ${shippingAddress.province} ${shippingAddress.zip}, ${shippingAddress.country}`;

  const submitPayment = () => {};
  return (
    <div>
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
        <Row>
          <RowHeader>Method</RowHeader>
          <RowTitle>
            {shippingLine
              ? `${shippingLine.title} - ${shippingLine.priceV2.amount}`
              : "Please select a shipping method"}
          </RowTitle>
          <Link to="/checkout/shipping">Change</Link>
        </Row>
      </RowWrapper>
      <PaymentSection>
        <FormContext {...methods}>
          <form onSubmit={methods.handleSubmit(submitPayment)}>
            <FormInput
              name="cardNumber"
              title="Card number"
              // width="100%"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="lastName"
              title="Last Name"
              width="50%"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="address1"
              title="Address"
              registration={{
                required: true,
              }}
            />
            <FormInput name="address2" title="Apt, suite, etc. (optional)" />
            <FormInput
              name="city"
              title="City"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="country"
              title="Country/Region"
              width="33%"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="province"
              title="State"
              width="33%"
              registration={{
                required: true,
              }}
            />
            <FormInput
              name="zip"
              title="Zip Code"
              width="33%"
              registration={{
                required: true,
              }}
            />
            <button type="submit" value="">
              Continue to Shipping
            </button>
          </form>
        </FormContext>
      </PaymentSection>
    </div>
  );
};

export default Payment;

const PaymentSection = styled.div``;

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
