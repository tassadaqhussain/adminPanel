// src/components/Dashboard.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../layouts/Sidebar';
import TopNavbar from '../layouts/TopNavbar';

const MainContent = styled.div`
  margin-left: 250px; /* Adjust according to Sidebar width */
  margin-top: 56px; /* Adjust according to Navbar height */
  height: calc(100vh - 56px);
  overflow-y: auto;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Dashboard: React.FC = () => {
    return (
        <>
            <Sidebar/>
            <div style={{display: 'flex', height: '100vh', overflow: 'hidden'}}>

                <div className="flex-grow-1">
                    <TopNavbar/>
                    <MainContent>
                        <Container fluid>
                            <Outlet/>
                        </Container>
                    </MainContent>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
