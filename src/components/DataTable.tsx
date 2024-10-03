import React, { useState } from 'react';
import {
    DataGrid,
    GridColDef,
    GridToolbar,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import {
    HiOutlinePencilSquare,
    HiOutlineEye,
    HiOutlineTrash,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

interface DataTableProps {
    columns: GridColDef[];
    rows: object[];
    slug: string;
    includeActionColumn: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
                                                 columns,
                                                 rows,
                                                 slug,
                                                 includeActionColumn,
                customFunction
                                             }) => {
    const navigate = useNavigate();

    // Pagination state
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    // Action column definition
    const actionColumn: GridColDef = {
        field: 'action',
        headerName: 'Action',
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
            return (
                <div className="flex items-center">
                    <button
                        onClick={() => {
                            navigate(`/${slug}/${params.row.id}`);
                        }}
                        className="btn btn-square btn-ghost"
                    >
                        <HiOutlineEye />
                    </button>
                    <button
                        onClick={() => {
                            customFunction(params.row)
                        }}
                        className="btn btn-square btn-ghost"
                    >
                        <HiOutlinePencilSquare />
                    </button>
                    <button
                        onClick={() => {
                            toast('Jangan dihapus!', { icon: '😠' });
                        }}
                        className="btn btn-square btn-ghost"
                    >
                        <HiOutlineTrash />
                    </button>
                </div>
            );
        },
    };

    // Add the action column conditionally
    const columnsWithAction = includeActionColumn
        ? [...columns, actionColumn]
        : [...columns];

    return (
        <div className="w-full bg-base-100 text-base-content">
            <DataGrid
                className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
                rows={rows}
                columns={columnsWithAction}
                getRowHeight={() => 'auto'}
                pagination
                paginationMode="client" // Enable client-side pagination
                page={page} // Current page
                pageSize={pageSize} // Page size
                onPaginationModelChange={(newPagination) => {
                    setPage(newPagination.page);
                    setPageSize(newPagination.pageSize);
                }}
                rowCount={rows.length} // Total rows count
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10, // Initial page size
                        },
                    },
                }}
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
