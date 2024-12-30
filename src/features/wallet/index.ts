import { injectEndpoints } from '../baseQuery';

export interface User {
    id: number;
    name: string;
    email: string;
    cash_balance: number;
    rewards_balance: number;
    credit: number;
    debit: number;
    available_balance: number;
    transactions: any[]; // Replace `any[]` with the correct type if possible
}

interface PaginatedUsersResponse {
    success: boolean;
    data: {
        users: User[];
        total: number;
        page: number;
        pageSize: number;
    };
}

export const userWalletSlice = injectEndpoints({
    endpoints: (builder) => ({
        // Fetch users with wallets
        getUsersWithWallets: builder.query<PaginatedUsersResponse['data'], { page: number; pageSize: number }>({
            query: ({ page, pageSize }) => ({
                url: 'users-with-wallets',
                params: { page, pageSize },
            }),
            transformResponse: (response: PaginatedUsersResponse) => response.data, // Correctly transforms to 'data'
            providesTags: ['UserWallet'],
        }),

        // Add cash balance to user wallet
        addCashBalance: builder.mutation<void, { user_id: number; amount: number }>({
            query: ({ user_id, amount }) => ({
                url: '/wallet/add-funds',
                method: 'POST',
                body: {
                    user_id,
                    amount,
                    type: 'cash', // Always cash for this mutation
                },
            }),
            invalidatesTags: ['UserWallet'], // Invalidate to refetch updated data
        }),

        // Add reward balance to user wallet
        addRewardBalance: builder.mutation<void, { user_id: number; amount: number }>({
            query: ({ user_id, amount }) => ({
                url: '/wallet/add-funds',
                method: 'POST',
                body: {
                    user_id,
                    amount,
                    type: 'rewards', // Always rewards for this mutation
                },
            }),
            invalidatesTags: ['UserWallet'], // Invalidate to refetch updated data
        }),
    }),
});

export const {
    useGetUsersWithWalletsQuery,
    useAddCashBalanceMutation,
    useAddRewardBalanceMutation,
} = userWalletSlice;
