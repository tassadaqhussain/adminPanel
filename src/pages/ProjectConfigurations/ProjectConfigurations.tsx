import React, { useState } from 'react';
import { fetchProjectConfiguration } from '../../api/ApiCollection.tsx';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import DataTable from '../../components/DataTable.tsx';
import AddInvestment from './AddInvestment.tsx';

const ProjectConfigurations = () => {
    const [isOpen, setIsOpen] = useState(false); // Modal state
    const [page, setPage] = useState(0); // Page state for server-side pagination
    const [pageSize, setPageSize] = useState(3); // Page size state for server-side pagination

    // Fetch data using React Query
    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['allprojectConfiguration', page, pageSize], // Key includes pagination details
        queryFn: () => fetchProjectConfiguration(page, pageSize), // Fetch users for the specific page and size
        placeholderData: keepPreviousData, // Keep old data while fetching new data
    });

    React.useEffect(() => {
        if (isLoading) {
            toast.loading('Loading...', { id: 'promiseUsers' });
        }
        if (isError) {
            toast.error('Error while getting the data!', { id: 'promiseUsers' });
        }
        if (isSuccess) {
            toast.success('Got the data successfully!', { id: 'promiseUsers' });
        }
    }, [isError, isLoading, isSuccess]);

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 90 },
        { field: 'name', headerName: 'Name' },
        { field: 'investment_percentage', headerName: 'Investment Percentage', minWidth: 150 },
        { field: 'investment_period', headerName: 'Investment Period', minWidth: 90 },
        { field: 'min_investment_amount', headerName: 'Minimum Investment Amount', minWidth: 90 },
    ];

    return (
        <div className="w-full p-0 m-0">
            <div className="w-full flex flex-col items-stretch gap-3">
                <div className="w-full flex justify-between mb-5">
                    <div className="flex gap-1 justify-start flex-col items-start">
                        <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
                            Project Configurations
                        </h2>
                        <button
                            onClick={() => setIsOpen(true)}
                            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
                        >
                            Add New User +
                        </button>
                    </div>

                </div>

                {/* DataTable with server-side pagination */}
                <div className="flex flex-col items-stretch">
                    <DataTable
                        slug="users"
                        columns={columns}
                        rows={data?.data || []} // Pass fetched rows
                        includeActionColumn={true}
                        page={page} // Current page
                        setPage={setPage} // Setter function for page
                        pageSize={pageSize} // Current page size
                        setPageSize={setPageSize} // Setter function for page size
                        rowCount={data?.total || 0} // Total rows count
                        loading={isLoading} // Loading state
                    />
                </div>

                {/* Add or Edit User Modal */}
                {isOpen && (
                    <AddInvestment
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                )}
            </div>
        </div>
    );
};

export default ProjectConfigurations;
