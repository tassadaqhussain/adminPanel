import React from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

export interface Column { // Export the Column interface
    Header: string;
    accessor: string;
    Cell?: (props: { value: any, row: any }) => JSX.Element | string | number;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    isLoading: boolean;
    error?: any;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, isLoading, error }) => {
    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                {error.message || 'Error loading data.'}
            </Alert>
        );
    }

    return (
        <Box>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {columns.map((column) => (
                            <Th key={column.accessor}>{column.Header}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row, rowIndex) => (
                        <Tr key={rowIndex}>
                            {columns.map((column) => (
                                <Td key={column.accessor}>
                                    {column.Cell ? column.Cell({ value: row[column.accessor], row }) : row[column.accessor]}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default DataTable;
