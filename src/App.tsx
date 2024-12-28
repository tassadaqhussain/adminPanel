import  { Suspense,lazy } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    ScrollRestoration,
} from 'react-router-dom';

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
// Other components
import ToasterProvider from './components/ToasterProvider';
import ProtectedRoute from './ProtectedRoute';

function App() {
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
                        <Suspense fallback={<div>Loading...</div>}>
                            <Navbar />
                        </Suspense>
                        <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
                            <div
                                className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1"
                            >
                                <Suspense fallback={<div>Loading menu...</div>}>
                                    <Menu />
                                </Suspense>
                            </div>
                            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                    <Suspense fallback={<div>Loading footer...</div>}>
                        <Footer />
                    </Suspense>
                </div>
            </ProtectedRoute>
        );
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Layout />
                </Suspense>
            ),
            children: [
                {
                    path: '/',
                    element: (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: '/profile',
                    element: (
                        <Suspense fallback={<div>Loading profile...</div>}>
                            <Profile />
                        </Suspense>
                    ),
                },
                {
                    path: '/profile/edit',
                    element: (
                        <Suspense fallback={<div>Loading edit profile...</div>}>
                            <EditProfile />
                        </Suspense>
                    ),
                },
                {
                    path: '/users',
                    element: (
                        <Suspense fallback={<div>Loading users...</div>}>
                            <Users />
                        </Suspense>
                    ),
                },
                {
                    path: '/users/:id',
                    element: (
                        <Suspense fallback={<div>Loading user...</div>}>
                            <User />
                        </Suspense>
                    ),
                },
                {
                    path: '/roles',
                    element: (
                        <Suspense fallback={<div>Loading roles...</div>}>
                            <Roles />
                        </Suspense>
                    ),
                },
                {
                    path:'/project-configurations',
                    element: (
                        <Suspense fallback={<div>Loading project configurations...</div>}>
                            <ProjectConfiguration />
                        </Suspense>
                    ),
                },
                {
                    path:'/manage-farms',
                    element: (
                        <Suspense fallback={<div>Loading project configurations...</div>}>
                            <FarmListing />
                        </Suspense>
                    ),
                },
                {
                    path:'/investment-projects',
                    element: (
                        <Suspense fallback={<div>Loading project configurations...</div>}>
                            <InvestmentProjects />
                        </Suspense>
                    ),
                },

                {
                    path:'/investor-accounts',
                    element: (
                        <Suspense fallback={<div>Loading project configurations...</div>}>
                            <InvestorAccounts />
                        </Suspense>
                    ),
                },

                {
                    path:'/transactions',
                    element: (
                        <Suspense fallback={<div>Loading project configurations...</div>}>
                            <Transaction/>
                        </Suspense>
                    ),
                },

                {
                    path:'/compliance-check',
                    element: (
                        <Suspense fallback={<div>Loading project configurations...</div>}>
                            <Compliance/>
                        </Suspense>
                    ),
                },
                {
                    path:'/notifications-alerts',
                    element: (
                        <Suspense fallback={<div>Loading project configurations...</div>}>
                            <Notifications/>
                        </Suspense>
                    ),
                },

                {
                    path:'/helpdesk-support',
                    element: (
                        <Suspense fallback={<div>Loading project configurations...</div>}>
                            <Helpdesk/>
                        </Suspense>
                    ),
                },

            ],
            errorElement: (
                <Suspense fallback={<div>Loading error page...</div>}>
                    <Error />
                </Suspense>
            ),
        },
        {
            path: '/login',
            element: (
                <Suspense fallback={<div>Loading login...</div>}>
                    <Login />
                </Suspense>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
