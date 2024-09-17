import React from "react";

// Chakra imports
import {Flex, useColorModeValue} from "@chakra-ui/react";
import Logo from "../../../assets/img/avatars/logo.svg";

// Custom components
import {HorizonLogo} from "../../../components/icons/Icons";
import {HSeparator} from "../../../components/separator/Separator";

export function SidebarBrand() {
    //   Chakra color mode
    let logoColor = useColorModeValue("navy.700", "white");

    return (
        <Flex align='center' direction='column'>

            <img src={Logo} style={{width:'150px',height:'150px'}}/>
            <HSeparator mb='20px'/>
        </Flex>
    );
}

export default SidebarBrand;
