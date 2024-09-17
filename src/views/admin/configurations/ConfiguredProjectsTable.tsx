import React, { useState, useEffect } from 'react';
import { useGetConfiguredProjectsQuery, ConfiguredProject } from '../../../features/configurations/index';
import { Box, Button } from '@chakra-ui/react';
import DataTable , { Column }  from '../dataTables/DataTable';

const ConfiguredProjectsTable: React.FC = () => {
    const [page, setPage] = useState(1);
    const pageSize = 10; // Number of items per page
    const [projects, setProjects] = useState<ConfiguredProject[]>([]);
    const { data, error, isLoading, refetch } = useGetConfiguredProjectsQuery({ page, pageSize });

    useEffect(() => {
        if (data) {
            setProjects(prevProjects => [...prevProjects, ...data.data]);
        }
    }, [data]);

    const total = data?.total || 0;

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        refetch();
    }, [page, refetch]);

    const columns: Column[] = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Investment Percentage', accessor: 'investment_percentage' },
        { Header: 'Investment Period', accessor: 'investment_period' },
        { Header: 'Minimum Investment Amount', accessor: 'min_investment_amount' },
        { Header: 'Active', accessor: 'is_active', Cell: ({ value }: { value: boolean }) => (value ? 'Yes' : 'No') },
    ];

    return (
        <Box>
            <DataTable columns={columns} data={projects} isLoading={isLoading && page === 1} error={error} />
            {projects.length < total && (
                <Button onClick={handleLoadMore} mt={4} colorScheme="teal">
                    Load More
                </Button>
            )}
        </Box>
    );
};

export default ConfiguredProjectsTable;
