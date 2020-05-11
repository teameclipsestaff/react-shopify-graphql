import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductCard = ({
  product: {
    node: { handle, title, variants, priceRange },
  },
}) => {
  return (
    <Container>
      <Link to={`/product/${handle}`}>
        <Image src={variants.edges[0].node.image.originalSrc} alt={title} />
        <Title>{title}</Title>
        <Price>${priceRange.minVariantPrice.amount}</Price>
      </Link>
    </Container>
  );
};

export default ProductCard;

const Container = styled.div`
  margin: 4rem 1rem;
  a {
    text-decoration: none;
  }
`;

const Image = styled.img`
  margin-bottom: 1rem;
  height: 300px;
  box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
    rgba(8, 11, 14, 0.1) 0px 6px 6px -1px;
  transition: box-shadow 0.3s ease-in;
  &:hover {
    box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
      rgba(8, 11, 14, 0.1) 0px 16px 16px -1px;
  }
`;

const Title = styled.h1`
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
`;
const Price = styled.h2`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray};
  font-weight: 300;
`;
