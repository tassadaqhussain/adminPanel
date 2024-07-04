// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Footer from "../../components/footer/FooterAdmin"; // Ensure the path is correct
import Navbar from "../../components/navbar/NavbarAdmin"; // Ensure the path is correct
import Sidebar from "../../components/sidebar/Sidebar"; // Ensure the path is correct
import { SidebarContext } from "../../contexts/SidebarContext"; // Ensure the path is correct
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { Icon } from "@chakra-ui/react";

import MainDashboard from "../../views/admin/default";

// Custom views for routes
const DashboardView = () => <div>Dashboard</div>;
const ProfileView = () => <div>Profile</div>;
const SettingsView = () => <div>Settings</div>;

export default function Dashboard(props) {
  const { ...rest } = props;
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();

  // Static routes for the dashboard
  const staticRoutes = [

    {name: "Dashboard",  layout: "/admin", path: "/dashboard", component: MainDashboard ,icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />},
    { path: "/admin/profile", component: ProfileView },
  ];

  return (
      <Box>
        <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
          <Sidebar routes={staticRoutes} display="block" {...rest} />
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
                    brandText={"Dashboard"} // Simplified static text
                    secondary={false} // Simplified static value
                    message={false} // Simplified static value
                    fixed={false} // Simplified static value
                    {...rest}
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
              <Routes>
                {staticRoutes.map((route, key) => (
                    <Route path={route.path} element={<route.component />} key={key} />
                ))}
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
            </Box>
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
  );
};
