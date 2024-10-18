import React, { Suspense } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    ScrollRestoration,
} from 'react-router-dom';

// Dynamic imports for lazy loading components
const Home = React.lazy(() => import('./pages/Home'));
const Users = React.lazy(() => import('./pages/Users'));
const Navbar = React.lazy(() => import('./components/Navbar'));
const Footer = React.lazy(() => import('./components/Footer'));
const Menu = React.lazy(() => import('./components/menu/Menu'));
const Error = React.lazy(() => import('./pages/Error'));
const Profile = React.lazy(() => import('./pages/Profile'));
const EditProfile = React.lazy(() => import('./pages/EditProfile'));
const User = React.lazy(() => import('./pages/User'));
const Login = React.lazy(() => import('./pages/Login'));
const Roles = React.lazy(() => import('./pages/Roles.tsx'));

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
