import { gql } from "apollo-boost";

export const FETCH_PRODUCTS = gql`
  query(
    $first: Int
    $last: Int
    $lastCursor: String
    $firstCursor: String
    $reverse: Boolean
    $sortKey: ProductSortKeys
    $type: String
  ) {
    products(
      first: $first
      last: $last
      after: $lastCursor
      before: $firstCursor
      reverse: $reverse
      sortKey: $sortKey
      query: $type
    ) {
      edges {
        node {
          id
          handle
          title
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 1) {
            edges {
              node {
                image {
                  originalSrc
                }
                id
                availableForSale
                priceV2 {
                  amount
                }
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
    productTypes(first: 20) {
      edges {
        node
      }
    }
  }
`;
