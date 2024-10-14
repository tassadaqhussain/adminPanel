import React from 'react';
import { DataGrid, GridColDef, GridToolbar, GridPaginationModel } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencilSquare, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi2';
import toast from 'react-hot-toast';

interface DataTableProps {
    columns: GridColDef[];
    rows: object[];
    slug: string;
    includeActionColumn: boolean;
    customFunction?: (user: any) => void; // Optional custom function prop
    page: number; // Current page
    setPage: (page: number) => void; // Setter for page state
    pageSize: number; // Current page size
    setPageSize: (size: number) => void; // Setter for page size state
    rowCount: number; // Total row count for server-side pagination
    loading: boolean; // Loading state
}

const DataTable: React.FC<DataTableProps> = ({
                                                 columns,
                                                 rows,
                                                 slug,
                                                 includeActionColumn,
                                                 customFunction,
                                                 page,
                                                 setPage,
                                                 pageSize,
                                                 setPageSize,
                                                 rowCount,
                                                 loading,
                                             }) => {
    const navigate = useNavigate();

    // Action column definition
    const actionColumn: GridColDef = {
        field: 'action',
        headerName: 'Action',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => (
            <div className="flex items-center">
                <button
                    onClick={() => {
                        navigate(`/${slug}/${params.row.id}`);
                    }}
                    className="btn btn-square btn-ghost"
                >
                    <HiOutlineEye />
                </button>
                <button onClick={() => customFunction?.(params.row)} className="btn btn-square btn-ghost">
                    <HiOutlinePencilSquare />
                </button>
                <button onClick={() => toast('Jangan dihapus!', { icon: '😠' })} className="btn btn-square btn-ghost">
                    <HiOutlineTrash />
                </button>
            </div>
        ),
    };

    // Add the action column conditionally
    const columnsWithAction = includeActionColumn ? [...columns, actionColumn] : [...columns];

    return (
        <div className="w-full bg-base-100 text-base-content">
            <DataGrid
                className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
                rows={rows}
                columns={columnsWithAction}
                getRowHeight={() => 'auto'}
                pagination
                paginationMode="server" // Enable server-side pagination
                rowCount={rowCount} // Total rows count from the server
                paginationModel={{ page, pageSize }} // Use the controlled page and pageSize state
                onPaginationModelChange={(newPagination: GridPaginationModel) => {
                    setPage(newPagination.page); // Update page state
                    setPageSize(newPagination.pageSize); // Update page size state
                }}
                loading={loading} // Show loading indicator
                pageSizeOptions={[5, 10, 20]} // Page size options
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    );
};

export default DataTable;
