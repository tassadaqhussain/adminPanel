import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/admin',
});

export const loginUser = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
}
export const logoutUser = async () => {
    const response = await api.post('/logout');
    return response.data;
}