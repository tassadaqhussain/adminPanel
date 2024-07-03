import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './app/store';
import Login from './components/Login';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { login } from './features/auth/authSlice';
import { loadAuthState } from './utils/auth';

const queryClient = new QueryClient();

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const authState = loadAuthState();
        if (authState.isAuthenticated && authState.user) {
            dispatch(login(authState.user));
        }
    }, [dispatch]);

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
