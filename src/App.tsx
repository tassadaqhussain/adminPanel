import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./app/store";
import ProtectedRoute from "./components/ProtectedRoute";
import { login } from "./features/auth/authSlice";
import { loadAuthState } from "./utils/auth";

const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Home = React.lazy(() => import("./components/Home"));
const Profile = React.lazy(() => import("./components/Profile"));
const Settings = React.lazy(() => import("./components/Settings"));
const Reports = React.lazy(() => import("./components/Reports"));
const Tables = React.lazy(() => import("./components/Tables"));
const Login = React.lazy(() => import("./components/Login"));
const AdminLayout = React.lazy(() => import("./layouts/admin"));

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
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/admin/*"
                            element={
                                <ProtectedRoute>
                                    <AdminLayout />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Suspense>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
