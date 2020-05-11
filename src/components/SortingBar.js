import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const options = [
  { url: "featured", label: "Featured" },
  {
    url: "best_selling",
    label: "Best Selling",
  },
  {
    url: "title_ascending",
    label: "Alphabetically, A-Z",
  },
  {
    url: "title_descending",
    label: "Alphabetically, Z-A",
  },
  {
    url: "price_ascending",
    label: "Price, low to high",
  },
  {
    url: "price_descending",
    label: "Price, high to low",
  },
  {
    url: "date_ascending",
    label: "Date, old to new",
  },
  {
    url: "date_descending",
    label: "Date, new to old",
  },
];

const useParams = () => {
  return new URLSearchParams(useLocation().search);
};

const SortingBar = ({ productTypes }) => {
  let history = useHistory();
  let params = useParams();
  let sortBy = params.get("sort_by");
  let browseBy = params.get("browse_by");

  return (
    <Container>
      <h5>Browse By</h5>
      <Select
        name=""
        id="sort-by"
        onChange={(event) =>
          history.push(
            `/shop?sort_by=${sortBy}&browse_by=${event.target.value}`
          )
        }
        defaultValue={browseBy === null ? "All" : browseBy}
      >
        <option value={null}>All</option>
        {productTypes.map((type) => (
          <option key={type.node} value={type.node}>
            {type.node}
          </option>
        ))}
      </Select>

      <h5>Sort By</h5>
      <Select
        name=""
        id="sort-by"
        onChange={(event) =>
          history.push(
            `/shop?sort_by=${event.target.value}&browse_by=${browseBy}`
          )
        }
        value={sortBy === null ? "Featured" : sortBy}
      >
        {options.map((op) => (
          <option key={op.label} value={op.url}>
            {op.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default SortingBar;

const Container = styled.div`
  background: ${({ theme }) => theme.lightGray};
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  h5 {
    color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  background: transparent;
  border: none;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.black};
  margin-right: 1rem;
`;
