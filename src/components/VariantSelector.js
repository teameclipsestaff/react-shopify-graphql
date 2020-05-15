import React from "react";
import styled from "styled-components";

const VariantSelector = ({ options, handleOptionChange }) => {
  return (
    <>
      <Select name={options.name} id="" onChange={handleOptionChange}>
        {options.values.map((value) => (
          <option key={`${options.name}-${value}`} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </>
  );
};

export default VariantSelector;

const Select = styled.select`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.gray};
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  margin-right: 1rem;
  width: 8rem;
  height: 2rem;
  margin-bottom: 2rem;
`;
