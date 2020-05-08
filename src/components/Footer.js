import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Row>
          <h1>ReactShop.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            provident nostrum suscipit unde iste repellendus quia id. Sint
          </p>
        </Row>
        <Row>
          <h1>Contact Us</h1>
          <a href="">(123) 456-7890</a>
          <a href="">reactshop@gmail.com</a>
          <a href="">123 React ln, New York, NY</a>
        </Row>
        <Row>
          <h1>Links</h1>
          <a href="">About Us</a>
          <a href="">FAQ</a>
          <a href="">Return Policy</a>
          <a href="">Support</a>
          <a href="">Privacy Policy</a>
        </Row>
      </Wrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  background: ${({ theme }) => theme.primary};
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Row = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 4rem 3rem;

  h1 {
    padding: 1rem 0;
  }

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease-in;

    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }
`;
