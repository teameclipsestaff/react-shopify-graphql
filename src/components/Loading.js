import React from "react";
import styled from "styled-components";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <Container>
      <HashLoader color="#FF8D8D" />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
