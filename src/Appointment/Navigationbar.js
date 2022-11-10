import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigationbar() {
  let user = JSON.parse(sessionStorage.getItem('customer'));
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/Home">{user.name}</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/History">Order History</Nav.Link>
            <Nav.Link href="/Logout">SignOut</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
     
    </>
  )
}
