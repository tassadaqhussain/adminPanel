import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Home: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('admin/dashboard');
        } else {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return <div>Loading...</div>;
};

export default Home;
