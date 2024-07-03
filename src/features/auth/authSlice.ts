// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, User } from '../../types/auth';
import { loadAuthState } from '../../utils/auth';

const initialState: Auth = loadAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
