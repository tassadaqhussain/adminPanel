// import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    ScrollRestoration,
} from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './components/menu/Menu';
import Error from './pages/Error';
import Profile from './pages/Profile';

import ToasterProvider from './components/ToasterProvider';
import EditProfile from './pages/EditProfile';
import User from './pages/User';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Roles from "./pages/Roles.tsx";
function App() {
    const Layout = () => {
        return (
            <ProtectedRoute>
                <div
                    id="rootContainer"
                    className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
                >
                    <ToasterProvider/>
                    <ScrollRestoration/>
                    <div>
                        <Navbar/>
                        <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
                            <div
                                className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
                                <Menu/>
                            </div>
                            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </ProtectedRoute>
        );
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>,
                },
                // Protected Routes
                {
                    path: '/profile',
                    element: (

                        <Profile/>

                    ),
                },
                {
                    path: '/profile/edit',
                    element: (

                        <EditProfile/>

                    ),
                },
                {
                    path: '/users',
                    element: (

                        <Users/>

                    ),
                },
                {
                    path: '/users/:id',
                    element: (

                        <User/>

                    ),
                },

                {
                    path: '/roles',
                    element: <Roles/>,
                },

            ],
            errorElement: <Error/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
    ]);


    return <RouterProvider router={router}/>;
}

export default App;
