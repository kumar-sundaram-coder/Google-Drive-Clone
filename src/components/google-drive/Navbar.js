import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar bg="light" expand="sm" style={{ marginBottom: 20 }}>
      <Container style={{ paddingLeft: 0, paddingRight: 0, marginTop: 10 }}>
        <Navbar.Brand as={Link} to="/">
          &nbsp; G-Drive
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/user">
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
