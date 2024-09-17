// src/components/Configurations.tsx
import { Box, Button, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import ProjectList from "./ProjectList";
import { useLazyGetProjectsPaginationQuery } from "../../../features/project";

const Configurations: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [trigger, result] = useLazyGetProjectsPaginationQuery(); // Extracting the trigger function and the query result

    const onClose = () => setIsOpen(false);

    const handleNameClick = () => {
        setIsOpen(true);
    };

    const handleSuccess = () => {
        // Handle success logic here
    };

    useEffect(() => {
        if (!isOpen) {
            trigger({ page: 1, pageSize: 10 }); // Fetching data with parameters
        }
    }, [isOpen, trigger]);

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Stack spacing={4} direction='row' align='center'>
                <Button colorScheme='teal' size='lg' onClick={handleNameClick}>
                    Add Project
                </Button>
            </Stack>
            {isOpen && (
                <ModalComponent isOpen={isOpen} onClose={onClose} onSuccess={handleSuccess} />
            )}
            <ProjectList />
        </Box>
    );
};

export default Configurations;
