import React from 'react';
import {fetchUsers} from '../api/ApiCollection';
import {useQuery} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';
import DataTable from "../components/DataTable.tsx";

const Roles = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0); // Current page state
    const [pageSize, setPageSize] = React.useState(10); // Page size state
    const [totalUsers, setTotalUsers] = React.useState(0); // Total number of users
    const [editData, setEditData] = React.useState(null); // State to hold user data for editing

    // Fetch data using React Query
    const {isLoading, isError, isSuccess, data} = useQuery({
        queryKey: ['allusers', page, pageSize], // Key includes pagination details
        queryFn: () => fetchUsers(page, pageSize), // Fetch users for the specific page and size
        keepPreviousData: true, // Keep old data while fetching new data
        onSuccess: (result) => {
            setTotalUsers(result.total); // Set the total number of users
        },
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
    const totalPages = Math.ceil(totalUsers / pageSize);

    const columns: GridColDef[] = [
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

                {isLoading ? (
                    <DataTable
                        slug="orders"
                        columns={columns}
                        rows={[]}
                        includeActionColumn={true}
                    />
                ) : isError ? (
                    <>
                        <DataTable
                            slug="orders"
                            columns={columns}
                            rows={[]}
                            includeActionColumn={true}
                        />
                        <div className="w-full flex justify-center">
                            Error while getting the data!
                        </div>
                    </>
                ) : isSuccess ? (
                    <DataTable
                        slug="orders"
                        columns={columns}
                        rows={data.users}
                        includeActionColumn={true}
                        customFunction={editUser}
                    />
                ) : (
                    <>
                        <DataTable
                            slug="orders"
                            columns={columns}
                            rows={[]}
                            includeActionColumn={true}
                        />
                        <div className="w-full flex justify-center">
                            Error while getting the data!
                        </div>
                    </>
                )}


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

export default Roles;
