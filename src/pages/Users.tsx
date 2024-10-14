import React, {useState} from 'react';
import {fetchUsers} from '../api/ApiCollection';
import {useQuery,keepPreviousData} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';
import DataTable from '../components/DataTable';

const Users = () => {
    const [isOpen, setIsOpen] = useState(false); // Modal state
    const [page, setPage] = useState(0); // Page state for server-side pagination
    const [pageSize, setPageSize] = useState(3); // Page size state for server-side pagination
    const [editData, setEditData] = useState(null);
    // Fetch data using React Query
    const {isLoading, isError, isSuccess, data} = useQuery({
        queryKey: ['allusers', page, pageSize], // Key includes pagination details
        queryFn: () => fetchUsers(page, pageSize), // Fetch users for the specific page and size
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
        {field: 'name', headerName: 'Name'},
        {field: 'email', headerName: 'Email', minWidth: 150},
        {field: 'roles', headerName: 'Roles', minWidth: 90},


    ];
    const editUser = (user: any) => {
        setEditData(user); // Set the user data for editing
        setIsOpen(true); // Open the modal
    };
    return (
        <div className="w-full p-0 m-0">
            <div className="w-full flex flex-col items-stretch gap-3">
                <div className="w-full flex justify-between mb-5">
                    <div className="flex gap-1 justify-start flex-col items-start">
                        <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
                            Users
                        </h2>
                        <p>{data?.total} Users Found</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
                    >
                        Add New User +
                    </button>
                </div>

                {/* Use DataTable with server-side pagination */}
                <DataTable
                    slug="users"
                    columns={columns}
                    rows={data?.users || []} // Pass fetched rows
                    includeActionColumn={true}
                    customFunction={editUser}
                    page={page} // Current page
                    setPage={setPage} // Setter function for page
                    pageSize={pageSize} // Current page size
                    setPageSize={setPageSize} // Setter function for page size
                    rowCount={data?.total || 0} // Total rows count
                    loading={isLoading} // Loading state
                />

                {/* Add or Edit User Modal */}
                {isOpen && (
                    <AddData
                        slug={'user'}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        editData={editData} // Pass editData to modal component
                    />
                )}
            </div>
        </div>
    );
};

export default Users;
