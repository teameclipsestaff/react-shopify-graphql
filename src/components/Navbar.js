import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../assets/Logo.png";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <Logo to="/">
        <img src={LogoImg} alt="logo" />
      </Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink to="/shop">Shop</MenuLink>
        <MenuLink to="/login">Login</MenuLink>
        <MenuLink to="/signup">Sign Up</MenuLink>
        {/* <MenuLink href="">Account</MenuLink> */}
        <IconLink href="">
          <FiSearch />
        </IconLink>
        <IconLink href="">
          <FiShoppingBag />
        </IconLink>
      </Menu>
    </Nav>
  );
};

export default Navbar;
const MenuLink = styled(Link)`
  padding: 1rem 1.3rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.gray};
  transition: all 0.3s ease-in;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const IconLink = styled(MenuLink)`
  font-size: 1rem;
`;

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  max-width: 1000px;
  margin: auto;
`;

const Logo = styled(Link)`
  padding: 1rem 0;
  img {
    height: 4rem;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;

  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: ${({ theme }) => theme.secondary};
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
