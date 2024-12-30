import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Button,
} from '@mui/material';
import CustomDialog from './CustomDialog';
import {
    useGetConfiguredProjectsQuery,
    useAddConfiguredProjectMutation,
    useUpdateConfiguredProjectMutation,
    useDeleteConfiguredProjectMutation,
} from '../../features/configurations';
import { toast } from 'react-hot-toast';

interface ConfiguredProject {
    id: number;
    name: string;
    investment_percentage: number;
    investment_period: string;
    min_investment_amount: number;
}

const ProjectConfigurations: React.FC = () => {
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
    const [selectedProject, setSelectedProject] = useState<ConfiguredProject | null>(null); // Selected project
    const [isOpen, setIsOpen] = useState(false); // Dialog state
    const [formData, setFormData] = useState<{
        name: string;
        investment_percentage: string;
        investment_period: string;
        min_investment_amount: string;
    }>({
        name: '',
        investment_percentage: '',
        investment_period: '',
        min_investment_amount: '',
    });

    // Fetch configured projects
    const { data, isLoading, isError } = useGetConfiguredProjectsQuery({
        page: page + 1,
        pageSize: rowsPerPage,
    });

    const [addConfiguredProject] = useAddConfiguredProjectMutation();
    const [updateConfiguredProject] = useUpdateConfiguredProjectMutation();
    const [deleteConfiguredProject] = useDeleteConfiguredProjectMutation();

    // Handle page change
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Open dialog
    const handleOpenDialog = (project: ConfiguredProject | null = null) => {
        setSelectedProject(project);
        setFormData({
            name: project?.name || '',
            investment_percentage: project?.investment_percentage.toString() || '',
            investment_period: project?.investment_period || '',
            min_investment_amount: project?.min_investment_amount.toString() || '',
        });
        setIsOpen(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setIsOpen(false);
    };

    // Save project (add or edit)
    const handleSaveProject = async () => {
        if (
            !formData.name ||
            !formData.investment_percentage ||
            !formData.investment_period ||
            !formData.min_investment_amount
        ) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            if (selectedProject) {
                // Update existing project
                await updateConfiguredProject({
                    id: selectedProject.id,
                    updates: {
                        name: formData.name,
                        investment_percentage: parseFloat(formData.investment_percentage),
                        investment_period: formData.investment_period,
                        min_investment_amount: parseFloat(formData.min_investment_amount),
                    },
                }).unwrap();
                toast.success('Project updated successfully.');
            } else {
                // Add new project
                await addConfiguredProject({
                    name: formData.name,
                    investment_percentage: parseFloat(formData.investment_percentage),
                    investment_period: formData.investment_period,
                    min_investment_amount: parseFloat(formData.min_investment_amount),
                }).unwrap();
                toast.success('Project added successfully.');
            }
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving project:', error);
            toast.error('Failed to save project.');
        }
    };

    // Delete project
    const handleDeleteProject = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            await deleteConfiguredProject({ id }).unwrap();
            toast.success('Project deleted successfully.');
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete project.');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching project configurations</div>;

    return (
        <div style={{ margin: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Project Configurations</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog()}
                style={{ marginBottom: '20px' }}
            >
                Add New Project
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Investment Percentage</strong></TableCell>
                            <TableCell><strong>Investment Period</strong></TableCell>
                            <TableCell><strong>Minimum Investment Amount</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data?.map((project: ConfiguredProject) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.id}</TableCell>
                                <TableCell>{project.name}</TableCell>
                                <TableCell>{project.investment_percentage}%</TableCell>
                                <TableCell>{project.investment_period}</TableCell>
                                <TableCell>${Number(project.min_investment_amount).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleOpenDialog(project)}
                                        style={{ marginRight: '5px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleDeleteProject(project.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={data?.total || 0} // Total rows from backend
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Add/Edit Project Dialog */}
            <CustomDialog
                open={isOpen}
                onClose={handleCloseDialog}
                onConfirm={handleSaveProject}
                title={selectedProject ? 'Edit Project Configuration' : 'Add New Project'}
                fields={[
                    {
                        label: 'Name',
                        value: formData.name,
                        onChange: (value) => setFormData({ ...formData, name: value }),
                    },
                    {
                        label: 'Investment Percentage',
                        type: 'number',
                        value: formData.investment_percentage,
                        onChange: (value) => setFormData({ ...formData, investment_percentage: value }),
                    },
                    {
                        label: 'Investment Period',
                        value: formData.investment_period,
                        onChange: (value) => setFormData({ ...formData, investment_period: value }),
                    },
                    {
                        label: 'Minimum Investment Amount',
                        type: 'number',
                        value: formData.min_investment_amount,
                        onChange: (value) => setFormData({ ...formData, min_investment_amount: value }),
                    },
                ]}
            />
        </div>
    );
};

export default ProjectConfigurations;
