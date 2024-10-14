import React, {useState} from 'react';
import {fetchRoles} from '../api/ApiCollection';
import {useQuery, keepPreviousData} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import DataTable from '../components/DataTable';

const Roles = () => {

    const [page, setPage] = useState(0); // Page state for server-side pagination
    const [pageSize, setPageSize] = useState(10); // Page size state for server-side pagination

    // Fetch data using React Query
    const {isLoading, isError, isSuccess, data} = useQuery({
        queryKey: ['allRoles', page, pageSize], // Key includes pagination details
        queryFn: () => fetchRoles(page, pageSize), // Fetch users for the specific page and size
        placeholderData: keepPreviousData, // Keep old data while fetching new data

    });


    React.useEffect(() => {
        if (isLoading) {
            toast.loading('Loading...', {id: 'promiseUsers'});
        }
        if (isError) {
            toast.error('Error while getting the data!', {id: 'promiseUsers'});
        }
        if (isSuccess) {
            toast.success('Got the data successfully!', {id: 'promiseUsers'});
        }
    }, [isError, isLoading, isSuccess]);

    // Calculate the total number of pages based on totalUsers and pageSize
    // const totalPages = Math.ceil(totalUsers / pageSize);

    const columns = [
        {field: 'id', headerName: 'ID', minWidth: 90},
        {field: 'name', headerName: 'Name'}

    ];

    return (
        <div className="w-full p-0 m-0">
            <div className="w-full flex flex-col items-stretch gap-3">
                <div className="w-full flex justify-between mb-5">
                    <div className="flex gap-1 justify-start flex-col items-start">
                        <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
                            Roles
                        </h2>
                        <p>{data?.total} Roles</p>
                    </div>
                    <button

                        className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
                    >
                        Add New Role+
                    </button>
                </div>

                {/* Use DataTable with server-side pagination */}
                <DataTable
                    slug="Role"
                    columns={columns}
                    rows={data?.roles || []} // Pass fetched rows
                    includeActionColumn={true}
                    customFunction={() => {}}
                    page={page} // Current page
                    setPage={setPage} // Setter function for page
                    pageSize={pageSize} // Current page size
                    setPageSize={setPageSize} // Setter function for page size
                    rowCount={data?.total || 0} // Total rows count
                    loading={isLoading} // Loading state
                />


            </div>
        </div>
    );
};

export default Roles;
