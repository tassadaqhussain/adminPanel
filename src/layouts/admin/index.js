import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "../../components/footer/FooterAdmin";
import Navbar from "../../components/navbar/NavbarAdmin";
import Sidebar from "../../components/sidebar/Sidebar";
import { SidebarContext } from "../../contexts/SidebarContext";
import React, { useState, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { Icon } from "@chakra-ui/react";
import { useSelector } from 'react-redux';

// Lazy load components
const MainDashboard = React.lazy(() => import("../../views/admin/default"));
const Settings = React.lazy(() => import("../../views/admin/configurations"));
const Project = React.lazy(() => import('../../views/admin/project'));

export default function Dashboard() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();
  const location = useLocation();

  // Get user info from Redux store using useSelector
  const { user } = useSelector((state) => state.auth);

  // Static routes with role-based restrictions
  const staticRoutes = [
    {
      name: "Dashboard",
      layout: "/admin",
      path: "/dashboard",
      component: MainDashboard,
      icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      allowedRoles: ["admin", "user"],
    },
    {
      name: "Project Configuration",
      layout: "/admin",
      path: "/settings",
      component: Settings,
      icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      allowedRoles: ["admin"],
    },
    {
      name: "Project",
      layout: "/admin",
      path: "/list-project",
      component: Project,
      icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      allowedRoles: ["admin", "project-manager"],
    },
    {
      name: "Projects",
      icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
      subRoutes: [
        { name: "Create Project", layout: "/admin", path: "/createProject", component: Project },
        { name: "Manage Projects", layout: "/admin", path: "/manageProject", component: Project },
      ],
      allowedRoles: ["admin", "project-manager"],
    },
  ];

  // Helper function to check if a user role is allowed for a route
  const isRouteAllowed = (route) => {
    // Check if the route has allowedRoles
    if (route.allowedRoles) {
      return route.allowedRoles.some((role) =>
          user?.roles.some((userRole) => userRole.name === role)
      );
    }

    // If the route has subRoutes, recursively check each subRoute
    if (route.subRoutes) {
      return route.subRoutes.some((subRoute) => isRouteAllowed(subRoute));
    }

    // If no allowedRoles or subRoutes, deny access by default
    return false;
  };


  const getLastPathSegment = (pathname) => {
    const segments = pathname.split("/");
    return segments.pop() || segments.pop();
  };

  const getDynamicBrandName = () => {
    const currentPath = location.pathname;
    const currentLastSegment = getLastPathSegment(currentPath);

    const currentRoute = staticRoutes.find((route) => {
      if (route.subRoutes) {
        return route.subRoutes.some((subRoute) =>
            currentPath.includes(subRoute.path)
        );
      }
      const routePath = route.layout + route.path;
      const routeLastSegment = getLastPathSegment(routePath);
      return routeLastSegment === currentLastSegment;
    });

    return currentRoute ? currentRoute.name : "Default Brand Name";
  };

  return (
      <Box>
        <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
          <Sidebar
              routes={staticRoutes.filter(isRouteAllowed)}
              display="block"
          />
          <Box
              float="right"
              minHeight="100vh"
              height="100%"
              overflow="auto"
              position="relative"
              maxHeight="100%"
              w={{ base: "100%", xl: "calc(100% - 290px)" }}
              maxWidth={{ base: "100%", xl: "calc(100% - 290px)" }}
              transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
              transitionDuration=".2s, .2s, .35s"
              transitionProperty="top, bottom, width"
              transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <Navbar
                    onOpen={onOpen}
                    logoText={"Horizon UI Dashboard PRO"}
                    brandText={getDynamicBrandName()}
                    secondary={false}
                    message={false}
                    fixed={false}
                />
              </Box>
            </Portal>
            <Box
                mx="auto"
                p={{ base: "20px", md: "30px" }}
                pe="20px"
                minH="100vh"
                pt="50px"
            >
              {/* Suspense for lazy loading */}
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {staticRoutes
                      .filter(isRouteAllowed)
                      .map((route, key) => {
                        if (route.subRoutes) {
                          // If the route has sub-routes, render them as separate routes
                          return route.subRoutes.map((subRoute, subKey) => (
                              <Route
                                  path={subRoute.path}
                                  element={<subRoute.component />}
                                  key={`${key}-${subKey}`}
                              />
                          ));
                        } else {
                          // Render top-level routes
                          return (
                              <Route
                                  path={route.path}
                                  element={<route.component />}
                                  key={key}
                              />
                          );
                        }
                      })}
                  <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                </Routes>
              </Suspense>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
  );
}
