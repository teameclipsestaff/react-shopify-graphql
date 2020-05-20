import { gql } from "apollo-boost";

export const UPDATE_CHECKOUT = gql`
  mutation MyMutation(
    $checkoutId: ID = "Z2lkOi8vc2hvcGlmeS9DaGVja291dC8zZWNkMDE3MGJkNjIwYzNiMjVkZDg5NGFhYTNhM2RhMT9rZXk9MTc0MzJlYmM4YjBmNDc1NTQxY2E4ZjQwZTFlNjNiMmE="
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        email
        lineItems(first: 50) {
          edges {
            node {
              quantity
              title
              id
              variant {
                id
                image {
                  originalSrc
                }
                priceV2 {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
        lineItemsSubtotalPrice {
          amount
        }
        totalPriceV2 {
          amount
        }
        totalTaxV2 {
          amount
        }
        subtotalPriceV2 {
          amount
        }
        order {
          orderNumber
        }
      }
    }
  }
`;

export const FETCH_CHECKOUT = gql`
  query($id: ID!) {
    node(id: $id) {
      ... on Checkout {
        id
        email
        lineItems(first: 50) {
          edges {
            node {
              quantity
              title
              id
              unitPrice {
                amount
              }
              variant {
                id
                image {
                  originalSrc
                }
                priceV2 {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
        lineItemsSubtotalPrice {
          amount
        }
        totalPriceV2 {
          amount
        }
        totalTaxV2 {
          amount
        }
        subtotalPriceV2 {
          amount
        }
        order {
          orderNumber
        }
      }
    }
  }
`;
export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout {
    checkoutCreate(input: {}) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        id
        lineItems(first: 50) {
          edges {
            node {
              id
              quantity
              title
              unitPrice {
                amount
              }
              variant {
                id
                image {
                  originalSrc
                }
                priceV2 {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      description
      title
      productType
      options {
        id
        name
        values
      }
      images(first: 20) {
        edges {
          node {
            originalSrc
          }
        }
      }
      variants(first: 200) {
        edges {
          node {
            title
            id
            priceV2 {
              amount
              currencyCode
            }
            image {
              originalSrc
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

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
