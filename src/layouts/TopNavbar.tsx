// src/layouts/TopNavbar.tsx
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { FaBars, FaBell, FaCommentDots, FaSearch } from 'react-icons/fa';
import { useLogout } from '../hooks/useAuth';

const SearchForm = styled(Form)`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f1f3f5;
  border-radius: 5px;
  padding: 0 10px;
`;

const SearchInput = styled(FormControl)`
  background: transparent;
  border: none;
  box-shadow: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

const TopNavbar: React.FC = () => {
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <Navbar bg="white" expand="lg" className="mb-4 shadow-sm" fixed="top">
            <Button variant="link" className="d-lg-none">
                <FaBars />
            </Button>
            <SearchForm className="mx-3">
                <FaSearch />
                <SearchInput type="search" placeholder="Search..." aria-label="Search" />
            </SearchForm>
            <Nav className="ms-auto d-flex align-items-center">
                <NavDropdown title="Mega Menu" id="mega-menu-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Resources" id="resources-dropdown">
                    <NavDropdown.Item href="#action/4.1">Resource 1</NavDropdown.Item>
                    <NavDropdown.Item href="#action/4.2">Resource 2</NavDropdown.Item>
                    <NavDropdown.Item href="#action/4.3">Resource 3</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#">
                    <FaBell className="position-relative" />
                    <span className="badge bg-danger position-absolute" style={{ top: '-10px', right: '-10px' }}>4</span>
                </Nav.Link>
                <Nav.Link href="#">
                    <FaCommentDots />
                </Nav.Link>
                <NavDropdown
                    title={<UserImage src="/path-to-user-image.jpg" alt="User" />}
                    id="user-dropdown"
                    align="end"
                >
                    <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
    );
};

export default TopNavbar;
