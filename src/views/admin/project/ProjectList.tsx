import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import DataTable, { Column } from '../dataTables/DataTable';
import { useLazyGetProjectsPaginationQuery } from "../../../features/project";
import { Project } from '../../../features/project'; // Import the Project interface

const ProjectList: React.FC = () => {
    const [page, setPage] = useState(1);
    const pageSize = 10; // Number of items per page
    const [projectsData, setProjects] = useState<Project[]>([]);
    const [trigger, { data, error, isLoading }] = useLazyGetProjectsPaginationQuery();

    useEffect(() => {
        trigger({ page, pageSize });
    }, [page, trigger]);

    useEffect(() => {
        if (data) {
            setProjects(prevProjects => {
                const newProjects = data.data.filter(
                    newProject => !prevProjects.some(project => project.id === newProject.id)
                );
                return [...prevProjects, ...newProjects];
            });
        }
    }, [data]);

    const total = data?.total || 0;

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const columns: Column[] = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Location', accessor: 'location' },
        { Header: 'Size', accessor: 'size' }
    ];

    return (
        <Box>
            <DataTable columns={columns} data={projectsData} isLoading={isLoading && page === 1} error={error} />
            {projectsData.length < total && (
                <Button onClick={handleLoadMore} mt={4} colorScheme="teal">
                    Load More
                </Button>
            )}
        </Box>
    );
};

export default ProjectList;
