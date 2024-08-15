import React, { useEffect, useState } from "react";
import { Outlet,useNavigate,useLocation, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavDropdown } from "react-bootstrap";
import Login from "./route/login";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styled from 'styled-components';

const StyledSearchIcon = styled(FaSearch)`
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledProfileIcon = styled(CgProfile)`
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;


function DefaultLayout({isLogin, setIsLogin, handleCategory}) { // props로 전달 받는다.
  
  let navigate = useNavigate();
  let location = useLocation();
  
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setIsLogin(false);
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("user_info");
    navigate("/", {state : {justLoggedOut : true}});
  };

  return (
    <div className="App">
      <div className="nibblee-home">
        <header className="nibblee-header">
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand as ={Link} to="/" className="me-4">
                <img
                  src="/img/1 PNG.png"
                  height="30"
                  className="d-inline-block align-top"
                  alt="Nibble Logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto align-items-center nav-items-container">
                  {isLogin ? (  // 로그인 했을때 
                    <>
                    <div className ="icon-container">
                      <StyledSearchIcon 
                        className="me-4" 
                        size={24} 
                        onClick={() => { navigate('/search') }}
                        style={{ cursor: 'pointer' }}
                      />

                      <StyledProfileIcon 
                        className="me-4" 
                        size={30} 
                        onClick={() => { navigate('/account/user1') }}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                      <NavDropdown
                        title="Category"
                        id="navbarCategory"
                        className="my-2 my-lg-0"
                      >
                        <NavDropdown.Item href = "#Shoes" onClick = {()=>handleCategory("Shoes")}>
                          Shoes
                        </NavDropdown.Item>
                        <NavDropdown.Item href = "#Movie" onClick = {()=>handleCategory("Movie")}>
                          Movie
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#Animation" onClick = {()=>handleCategory("Animation")}>
                          Animation
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#Web Novel" onClick = {()=>handleCategory("Web Novel")}>
                          Web Novel
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick = {()=> handleCategory("All")}>
                          All Items 
                        </NavDropdown.Item>
                      </NavDropdown>
                        {/* 아직 user 정보 연동이 안되므로 user1로 넘어가게 */}
                      <Button
                        onClick={handleLogoutClick}
                        variant="dark"
                        className="rounded-pill logout-button"
                      >
                        LogOut
                      </Button>
                    </>
                  ) : (
                    <>
                    <div className = "icon-container">
                      <StyledSearchIcon 
                        className="me-4" 
                        size={24} 
                        onClick={() => { navigate('/search') }}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                     
                      <NavDropdown
                        title="Category"
                        id="navbarCategory"
                        className="my-2 my-lg-0"
                      >
                        <NavDropdown.Item href = "#Shoes" onClick = {()=>handleCategory("Shoes")}>
                          Shoes
                        </NavDropdown.Item>
                        <NavDropdown.Item href = "#Movie" onClick = {()=>handleCategory("Movie")}>
                          Movie
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#Animation" onClick = {()=>handleCategory("Animation")}>
                          Animation
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#Web Novel" onClick = {()=>handleCategory("Web Novel")}>
                          Web Novel
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/" onClick = {()=> handleCategory("All")}>
                          All Items 
                        </NavDropdown.Item>
                      </NavDropdown>

                      <Button
                        onClick={handleLoginClick}
                        variant="dark"
                        className="rounded-pill login-button"
                      >
                        Login
                      </Button>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main className="nibblee-main">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
