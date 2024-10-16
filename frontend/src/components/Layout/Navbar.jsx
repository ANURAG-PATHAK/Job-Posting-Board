import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';

const CustomNavbar = () => {
    const { user, logout } = useAuth();

    return (
        <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <Image src="logo.png" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/post-job">Post Job</Nav.Link>
                        <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
                        {user ? (
                            <>
                                <div className="d-flex align-items-center">
                                    <Nav.Link >Welcome, {user}</Nav.Link>
                                </div>
                                <Button
                                    variant="outline-danger"
                                    onClick={logout}
                                    className="ms-2"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
