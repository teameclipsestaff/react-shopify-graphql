import React from "react";
import { useQuery } from "@apollo/react-hooks";
import ProductCard from "../components/ProductCard";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SortingBar from "../components/SortingBar";
import { FETCH_PRODUCTS } from "../store/query";
import { useLocation } from "react-router-dom";

//custom hook
const useParams = () => {
  return new URLSearchParams(useLocation().search);
};

const sortParam = (param) => {
  switch (param) {
    case "best_selling":
      return { sortKey: "BEST_SELLING" };
    case "price_ascending":
      return { sortKey: "PRICE", reverse: false };
    case "price_descending":
      return { sortKey: "PRICE", reverse: true };
    case "title_ascending":
      return { sortKey: "TITLE", reverse: false };
    case "title_descending":
      return { sortKey: "TITLE", reverse: true };
    case "date_ascending":
      return { sortKey: "UPDATED_AT", reverse: false };
    case "date_descending":
      return { sortKey: "UPDATED_AT", reverse: true };
    default:
      return { reverse: false };
  }
};

const Shop = () => {
  let params = useParams();
  let sortByParams = sortParam(params.get("sort_by"));
  let browseByParams = params.get("browse_by");
  let browseQuery =
    browseByParams == null || browseByParams === "All"
      ? ""
      : `product_type:'${browseByParams}'`;

  const { loading, error, data, fetchMore } = useQuery(FETCH_PRODUCTS, {
    variables: {
      ...sortByParams,
      type: browseQuery,
      first: 12,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data.products.edges[0]) return <p>Error :(</p>;

  let firstCursor = data.products.edges[0].cursor;
  let lastCursor = data.products.edges[data.products.edges.length - 1].cursor;

  return (
    <Container>
      <SortingBar productTypes={data.productTypes.edges} />
      <ProductContainer>
        {data.products.edges.map((product) => (
          <ProductCard product={product} key={product.node.handle} />
        ))}
      </ProductContainer>
      <PaginationContainer>
        <Pagination
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            fetchMore({
              variables: {
                first: null,
                last: 12,
                firstCursor,
              },
              updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult;
              },
            });
          }}
          disabled={data.products.pageInfo.hasPreviousPage ? false : true}
        >
          <IoIosArrowBack />
        </Pagination>
        <Pagination
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            fetchMore({
              variables: {
                first: 12,
                lastCursor,
              },
              updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult;
              },
            });
          }}
          disabled={data.products.pageInfo.hasNextPage ? false : true}
        >
          <IoIosArrowForward />
        </Pagination>
      </PaginationContainer>
    </Container>
  );
};

export default Shop;

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
`;

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const PaginationContainer = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Pagination = styled.button`
  width: 4rem;
  height: 2rem;
  background: ${({ theme, disabled }) =>
    disabled ? theme.gray : theme.secondary};
  border: none;
  border-radius: 5px;
  margin: 1rem;
  cursor: pointer;
  color: white;
  box-shadow: rgba(8, 11, 14, 0.06) 0px 0px 1px 0px,
    rgba(8, 11, 14, 0.1) 0px 6px 6px -1px;
  transition: box-shadow 0.3s ease-in;
  &:hover {
    box-shadow: ${({ theme, disabled }) =>
      disabled
        ? "rgba(8, 11, 14, 0.06) 0px 0px 1px 0px, rgba(8, 11, 14, 0.1) 0px 6px 6px -1px"
        : "rgba(8, 11, 14, 0.06) 0px 0px 1px 0px, rgba(8, 11, 14, 0.1) 0px 16px 16px -1px"};
  }
`;
