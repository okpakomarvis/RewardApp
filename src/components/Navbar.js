// Navbar.js
import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { logout } from '../redux/actions/userActions';

const NavBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login")
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Reward App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {userInfo ? (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
