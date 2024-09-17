import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Switch,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetProjectsQuery } from '../../../features/project';
import { useAddConfiguredProjectMutation } from '../../../features/configurations';

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onSuccess }) => {
    const { data: projects = [], error, isLoading, refetch } = useGetProjectsQuery();
    const [addConfiguredProject, { error: addError }] = useAddConfiguredProjectMutation();

    const [formData, setFormData] = useState({
        id: undefined,
        investment_percentage: '',
        investment_period: '',
        min_investment_amount: '',
        is_active: false
    });

    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen, refetch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async () => {
        try {
            await addConfiguredProject(formData).unwrap();
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to save the configuration: ", err);
        }
    };

    const renderError = (error: any) => {
        if (error?.data) {
            return <>{error.data.message || 'Error loading projects'}</>;
        }
        if (error?.error) {
            return <>{error.error}</>;
        }
        return <>Error loading projects</>;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Configuration</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mt={4}>
                        <FormLabel>Project</FormLabel>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <Alert status="error">
                                <AlertIcon />
                                {renderError(error)}
                            </Alert>
                        ) : (
                            <Select name="id" placeholder="Select Project" onChange={handleChange}>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </Select>
                        )}
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Investment Percentage</FormLabel>
                        <Input
                            name="investment_percentage"
                            type="number"
                            value={formData.investment_percentage}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Investment Period</FormLabel>
                        <Input
                            name="investment_period"
                            type="number"
                            value={formData.investment_period}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Minimum Investment Amount</FormLabel>
                        <Input
                            name="min_investment_amount"
                            type="number"
                            value={formData.min_investment_amount}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Is Active</FormLabel>
                        <Switch
                            name="is_active"
                            isChecked={formData.is_active}
                            onChange={handleChange}
                        />
                    </FormControl>
                    {addError && (
                        <Alert status="error" mt={4}>
                            <AlertIcon />
                            {renderError(addError)}
                        </Alert>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost" onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalComponent;
