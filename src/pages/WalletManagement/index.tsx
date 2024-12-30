import React, { useState } from 'react';
import {
    useGetUsersWithWalletsQuery,
    useAddCashBalanceMutation,
    useAddRewardBalanceMutation,
} from '../../features/wallet';
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

// User Interface
interface User {
    id: number;
    name: string;
    email: string;
    cash_balance: number;
    rewards_balance: number;
}

// Component
const UsersWithWallets: React.FC = () => {
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Selected user
    const [transactionType, setTransactionType] = useState<string>(''); // 'cash' or 'rewards'
    const [amount, setAmount] = useState<string>(''); // Amount to add
    const [open, setOpen] = useState(false); // Dialog state

    const { data, isLoading, isError } = useGetUsersWithWalletsQuery({
        page: page + 1,
        pageSize: rowsPerPage,
    });

    const [addCashBalance] = useAddCashBalanceMutation();
    const [addRewardBalance] = useAddRewardBalanceMutation();

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
    const handleOpenDialog = (user: User, type: string) => {
        setSelectedUser(user);
        setTransactionType(type);
        setAmount('');
        setOpen(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpen(false);
    };

    // Handle adding balance
    const handleAddBalance = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert('Enter a valid amount.');
            return;
        }

        const transactionAmount = parseFloat(amount);

        try {
            if (transactionType === 'cash') {
                await addCashBalance({
                    user_id: selectedUser!.id,
                    amount: transactionAmount,
                }).unwrap();
            } else if (transactionType === 'rewards') {
                await addRewardBalance({
                    user_id: selectedUser!.id,
                    amount: transactionAmount,
                }).unwrap();
            }
            alert('Balance added successfully.');
            handleCloseDialog();
        } catch (error) {
            console.error('Error adding balance:', error);
            alert('Failed to add balance.');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching user data</div>;

    return (
        <div style={{ margin: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Wallets</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Cash Balance</strong></TableCell>
                            <TableCell><strong>Rewards Balance</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.users.map((user: User) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>${user.cash_balance.toFixed(2)}</TableCell>
                                <TableCell>${user.rewards_balance.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleOpenDialog(user, 'cash')}
                                        style={{ marginRight: '5px' }}
                                    >
                                        Add Cash
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleOpenDialog(user, 'rewards')}
                                    >
                                        Add Rewards
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={data?.total || 0} // Adjusted for nested structure
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Add Balance Dialog */}
            <CustomDialog
                open={open}
                onClose={handleCloseDialog}
                onConfirm={handleAddBalance}
                title={transactionType === 'cash' ? 'Add Cash Balance' : 'Add Rewards Balance'}
                value={amount}
                setValue={setAmount}
            />
        </div>
    );
};

export default UsersWithWallets;
