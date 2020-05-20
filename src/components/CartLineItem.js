import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ShopContext } from "../store/context";

const CartLineItem = ({ item }) => {
  const { title, quantity, variant } = item;
  const { removeVariantFromCart, updateVariantInCart } = useContext(
    ShopContext
  );
  const [itemQuantity, setItemQuantity] = useState(quantity);
  // console.log(item);
  return (
    <Container>
      <Image src={variant.image.originalSrc} />
      <div>
        <Title>{title}</Title>
        <Row>
          <Input
            type="text"
            onChange={(e) => {
              setItemQuantity(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" &&
                !isNaN(e.target.value) &&
                updateVariantInCart(variant.id, parseInt(e.target.value));
            }}
            value={itemQuantity}
          />
          <Options>
            {variant.selectedOptions &&
              variant.selectedOptions.map((option) => (
                <p key={`${variant.id}-${option.value}`}>
                  {option.name}: {option.value}
                </p>
              ))}
          </Options>
        </Row>
        <Row>
          <p>${variant.priceV2.amount}</p>
          <RemoveBtn onClick={() => removeVariantFromCart(variant.id)}>
            Remove
          </RemoveBtn>
        </Row>
      </div>
    </Container>
  );
};

export default CartLineItem;

const RemoveBtn = styled.button`
  border: none;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
`;

const Options = styled.div`
  display: flex;

  p {
    margin: 0 0.5rem;
    font-size: 0.8rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;
const Title = styled.h1`
  font-size: 0.6rem;
`;

const Input = styled.input`
  width: 2rem;
`;

const Container = styled.div`
  display: flex;
  margin: 2rem 0;
`;

const Image = styled.div`
  background: url(${({ src }) => src});
  background-position: center center;
  background-size: cover;
  width: 7rem;
  height: 4rem;
  margin-right: 1rem;
`;
