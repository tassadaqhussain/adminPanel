// src/components/Configurations.tsx
import { Box, Button, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import ConfiguredProjectsTable from "./ConfiguredProjectsTable";
import { useGetConfiguredProjectsQuery } from '../../../features/configurations/index';

const Configurations: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { refetch } = useGetConfiguredProjectsQuery({ page: 1, pageSize: 10 }); // Initial refetch parameters

    const onClose = () => setIsOpen(false);

    const handleNameClick = () => {
        setIsOpen(true);
    };

    const handleSuccess = () => {
        refetch();
    };

    useEffect(() => {
        if (!isOpen) {
            refetch();
        }
    }, [isOpen, refetch]);

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Stack spacing={4} direction='row' align='center'>
                <Button colorScheme='teal' size='lg' onClick={handleNameClick}>
                    Add Configurations
                </Button>
            </Stack>
            {isOpen && (
                <ModalComponent isOpen={isOpen} onClose={onClose} onSuccess={handleSuccess} />
            )}
            <ConfiguredProjectsTable />
        </Box>
    );
};

export default Configurations;
