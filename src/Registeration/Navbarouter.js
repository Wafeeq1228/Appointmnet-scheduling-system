import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigationbar() {
  
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#">APPOINTMENT SCHEDULING SYSTEM</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/Customer/Login">SignUp</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </>
  )
}
