// src/layouts/Sidebar.tsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';
import { FaHome, FaUser, FaCog, FaChartPie, FaTable } from 'react-icons/fa';

const SidebarContainer = styled.div`
  height: 100vh;
  width: 250px;
  background-color: #343a40;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: fixed;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.2rem;
`;

const Sidebar: React.FC = () => {
    return (
        <SidebarContainer>
            <SidebarHeader>
                <img src="/path-to-your-logo.png" alt="Logo" style={{ width: '30px', height: 'auto', marginRight: '10px' }} />
                AdminKit
            </SidebarHeader>
            <Nav className="flex-column">
                <LinkContainer to="/dashboard">
                    <Nav.Link>
                        <FaHome /> Dashboard
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/pages">
                    <Nav.Link>
                        <FaTable /> Pages
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/settings">
                    <Nav.Link>
                        <FaCog /> Settings
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/projects">
                    <Nav.Link>
                        <FaChartPie /> Projects
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </SidebarContainer>
    );
};

export default Sidebar;
