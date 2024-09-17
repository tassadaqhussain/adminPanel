import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';
import { loginUser, logoutUser } from '../services/api';
import { AppDispatch } from '../app/store';
import { User } from '../types/auth';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const dispatch: AppDispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation(
        async ({ email, password }: { email: string; password: string }) => {
            return await loginUser(email, password);
        },
        {
            onSuccess: (data: { token: string; user: User }) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                dispatch(login(data.user));
                queryClient.invalidateQueries('auth');
            },
        }
    );
};
export const useLogout = () => {
    const dispatch: AppDispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation(
        async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await logoutUser(token);
            }
        },
        {
            onSuccess: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch(logout());
                queryClient.invalidateQueries('auth');
                navigate('/login');
            },
        }
    );
};