import {useMutation, useQueryClient, InvalidateQueryFilters} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {login, logout} from '../features/auth/authSlice';
import {loginUser, logoutUser} from '../services/api';
import {AppDispatch} from '../app/store';
import {User} from '../types/auth';
import {useNavigate} from 'react-router-dom';

export const useLogin = () => {
    const dispatch: AppDispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({email, password}: { email: string; password: string }) => {
            const data = await loginUser(email, password);
            return data;
        },
        onSuccess: (data: { token: string; user: User }) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            dispatch(login(data.user));
            queryClient.invalidateQueries('auth' as unknown as InvalidateQueryFilters);
            navigate('/'); // Redirect or do something else after login
        }
    });
};
export const useLogout = () => {
    const dispatch: AppDispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        // Use mutationFn for the async operation
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await logoutUser(token); // Assuming logoutUser takes the token and handles the API call
            }
        },
        onSuccess: () => {
            // Remove token and user from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Dispatch logout action to Redux
            dispatch(logout());

            // Invalidate the 'auth' query in React Query cache
            queryClient.invalidateQueries('auth' as unknown as InvalidateQueryFilters);

            // Navigate to the login page after logout
            navigate('/login');
        }
    });
};

