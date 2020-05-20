import React from "react";
import VariantSelector from "./VariantSelector";
import styled from "styled-components";

const ProductWrapper = ({
  product,
  price,
  selectedImage,
  handleOptionChange,
  setSelectedImage,
  itemQuantity,
  setItemQuantity,
  addToCart,
}) => {
  const { title, options, description, productType, images } = product;
  return (
    <Container>
      <ImageContainer>
        <MainImage src={selectedImage} alt="" />
        <ImageThumbnails>
          {images.edges.map((image) => (
            <img
              key={image.node.originalSrc}
              src={image.node.originalSrc}
              alt={title}
              onClick={() => setSelectedImage(image.node.originalSrc)}
            />
          ))}
        </ImageThumbnails>
      </ImageContainer>
      <InfoContainer>
        <h1>{title}</h1>
        <h3>${price}</h3>
        <h4>Type: {productType}</h4>
        <OptionsContainer>
          {options &&
            options.map((option) => (
              <VariantSelector
                handleOptionChange={handleOptionChange}
                key={option.id.toString()}
                options={option}
              />
            ))}
          <input
            type="text"
            value={itemQuantity}
            onChange={(event) => setItemQuantity(parseInt(event.target.value))}
          />
        </OptionsContainer>
        <p>{description}</p>
        <AddToCartBtn onClick={() => addToCart()}>Add To Cart</AddToCartBtn>
      </InfoContainer>
    </Container>
  );
};

export default ProductWrapper;

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
  flex-wrap: wrap;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const AddToCartBtn = styled.button`
  background: ${({ theme }) => theme.secondary};
  color: white;
  border: none;
  padding: 0.8rem 1rem;
  margin-top: 2rem;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
    rgba(8, 11, 14, 0.1) 0px 6px 6px -1px;
  transition: box-shadow 0.3s ease-in;
  &:hover {
    box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
      rgba(8, 11, 14, 0.1) 0px 16px 16px -1px;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  input {
    width: 8rem;
    height: 2rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.gray};
    color: ${({ theme }) => theme.primary};

    padding: 0 1rem;
  }
`;

const InfoContainer = styled.div`
  width: 50%;
  padding: 1rem 2rem;
  min-width: 300px;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
  h1 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  h3 {
    color: ${({ theme }) => theme.secondary};
    margin-bottom: 20px;
  }

  h4 {
    margin-bottom: 2rem;
  }
`;

const ImageContainer = styled.div`
  padding: 1rem 0;
  width: 50%;
  min-width: 300px;
`;

const ImageThumbnails = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  img {
    width: 100%;
    cursor: pointer;
    box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
      rgba(8, 11, 14, 0.1) 0px 6px 6px -1px;
    transition: box-shadow 0.3s ease-in;
    &:hover {
      box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
        rgba(8, 11, 14, 0.1) 0px 16px 16px -1px;
    }
  }
`;

const MainImage = styled.img`
  width: 100%;
  box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
    rgba(8, 11, 14, 0.1) 0px 6px 6px -1px;
  transition: box-shadow 0.3s ease-in;
  &:hover {
    box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
      rgba(8, 11, 14, 0.1) 0px 16px 16px -1px;
  }
`;
