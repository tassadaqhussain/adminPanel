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
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAddProjectMutation } from "../../../features/project";
import { useDropzone } from 'react-dropzone';

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, onSuccess }) => {
    const [addProject, { error: addError }] = useAddProjectMutation();

    const [formData, setFormData] = useState({
        investment_percentage: '',
        investment_period: '',
        min_investment_amount: '',
        is_active: false,
        name: '',
        location: '',
        size: '',
        funding: '',
        annual_return: '',
        gross_yield: '',
        net_yield: '',
        amount: '',
        image: null as File | null,
    });

    const onDrop = (acceptedFiles: File[]) => {
        setFormData({
            ...formData,
            image: acceptedFiles[0],
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        multiple: false
    });

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
        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                formDataToSubmit.append(key, value as string | Blob);
            }
        });

        try {
            await addProject(formDataToSubmit).unwrap();
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
                <ModalHeader>Add Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <FormControl mt={4}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Location</FormLabel>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Size</FormLabel>
                        <Input
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Funding</FormLabel>
                        <Input
                            name="funding"
                            value={formData.funding}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Annual Return</FormLabel>
                        <Input
                            name="annual_return"
                            value={formData.annual_return}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Gross Yield</FormLabel>
                        <Input
                            name="gross_yield"
                            value={formData.gross_yield}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Net Yield</FormLabel>
                        <Input
                            name="net_yield"
                            value={formData.net_yield}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Amount</FormLabel>
                        <Input
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Image</FormLabel>
                        <div
                            {...getRootProps()}
                            style={{
                                border: '2px dashed #cccccc',
                                borderRadius: '4px',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                            }
                        </div>
                        {formData.image && <p>{formData.image.name}</p>}
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
