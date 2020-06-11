import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const FormInput = ({ name, title, width, registration }) => {
  const { register, triggerValidation, errors } = useFormContext();

  return (
    <InputGroup width={width ? width : "100%"}>
      <label htmlFor="">
        {title}{" "}
        <span>{errors[name] && <span>This field is required</span>}</span>
      </label>
      <input
        type="text"
        name={name}
        onChange={() => triggerValidation(name)}
        ref={register({ ...registration })}
      />
    </InputGroup>
  );
};

export default FormInput;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  padding: 0.5rem 1rem;

  input {
    padding: 0.5rem;
    border-radius: 10px;
    border: solid 1px rgb(240, 240, 240);
  }
  label {
    margin-bottom: 6px;
    span {
      color: red;
    }
  }
`;
