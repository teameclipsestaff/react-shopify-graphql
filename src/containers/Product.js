import React from "react";
import { useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

export const GET_PRODUCT_QUERY = gql`
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      description
      title
      productType
      variants(first: 10) {
        edges {
          node {
            priceV2 {
              amount
              currencyCode
            }
            image {
              originalSrc
            }
          }
        }
      }
    }
  }
`;

const Product = () => {
  const { handle } = useParams();
  console.log(handle);

  const { loading, error, data } = useQuery(GET_PRODUCT_QUERY, {
    variables: { handle },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {console.log(error)}</p>;
  console.log(error);

  const { title, description, productType, variants } = data.productByHandle;
  console.log(variants);

  return (
    <div>
      <h2>{title}</h2>
      <h3>{productType}</h3>
      <p>{description}</p>
      <h4>${variants.edges[0].node.priceV2.amount}</h4>
      <img src={variants.edges[0].node.image.originalSrc} alt={title} />
    </div>
  );
};

export default Product;
