import  { Suspense, lazy } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    ScrollRestoration,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Dynamic imports for lazy loading components
const Home = lazy(() => import('./pages/Home'));
const Users = lazy(() => import('./pages/Users'));
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Menu = lazy(() => import('./components/menu/Menu'));
const Error = lazy(() => import('./pages/Error'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const User = lazy(() => import('./pages/User'));
const Login = lazy(() => import('./pages/Login'));
const Roles = lazy(() => import('./pages/Roles.tsx'));
const ProjectConfiguration = lazy(() => import('./pages/ProjectConfigurations/ProjectConfigurations.tsx'));
const FarmListing = lazy(() => import('./pages/FarmManagement/FarmListing.tsx'));
const InvestmentProjects = lazy(() => import('./pages/InvestmentProjects/index.tsx'));
const InvestorAccounts = lazy(() => import('./pages/InvestorAccounts/index.tsx'));
const Transaction = lazy(() => import('./pages/Transactions/index.tsx'));
const Compliance = lazy(() => import('./pages/ComplianceCheck/index.tsx'));
const Notifications = lazy(() => import('./pages/Notifications/index.tsx'));
const Helpdesk = lazy(() => import('./pages/HelpdeskSupport/index.tsx'));
const WalletManagement = lazy(() => import('./pages/WalletManagement/index.tsx'));

// Other components
import ToasterProvider from './components/ToasterProvider';
import ProtectedRoute from './ProtectedRoute';

// Create a theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue
        },
        secondary: {
            main: '#9c27b0', // Purple
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none', // Disable uppercase for buttons
        },
    },
});

// Layout component for Navbar, Footer, Menu, and Outlet
const Layout = () => {
    return (
        <ProtectedRoute>
            <div
                id="rootContainer"
                className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
            >
                <ToasterProvider />
                <ScrollRestoration />
                <div>
                    <Suspense fallback={<div>Loading Navbar...</div>}>
                        <Navbar />
                    </Suspense>
                    <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
                        <div
                            className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1"
                        >
                            <Suspense fallback={<div>Loading Menu...</div>}>
                                <Menu />
                            </Suspense>
                        </div>
                        <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <Suspense fallback={<div>Loading Footer...</div>}>
                    <Footer />
                </Suspense>
            </div>
        </ProtectedRoute>
    );
};

// Centralized route definitions
const routes = [
    { path: '/', element: <Home /> },
    { path: '/profile', element: <Profile /> },
    { path: '/profile/edit', element: <EditProfile /> },
    { path: '/wallet-management', element: <WalletManagement /> },
    { path: '/users', element: <Users /> },
    { path: '/users/:id', element: <User /> },
    { path: '/roles', element: <Roles /> },
    { path: '/project-configurations', element: <ProjectConfiguration /> },
    { path: '/manage-farms', element: <FarmListing /> },
    { path: '/investment-projects', element: <InvestmentProjects /> },
    { path: '/investor-accounts', element: <InvestorAccounts /> },
    { path: '/transactions', element: <Transaction /> },
    { path: '/compliance-check', element: <Compliance /> },
    { path: '/notifications-alerts', element: <Notifications /> },
    { path: '/helpdesk-support', element: <Helpdesk /> },
];

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Suspense fallback={<div>Loading Layout...</div>}>
                    <Layout />
                </Suspense>
            ),
            children: routes.map((route) => ({
                path: route.path,
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        {route.element}
                    </Suspense>
                ),
            })),
            errorElement: (
                <Suspense fallback={<div>Loading Error Page...</div>}>
                    <Error />
                </Suspense>
            ),
        },
        {
            path: '/login',
            element: (
                <Suspense fallback={<div>Loading Login...</div>}>
                    <Login />
                </Suspense>
            ),
        },
    ]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
