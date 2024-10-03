import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8000/api/admin',
});

export const loginUser = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
}
export const logoutUser = async (token: string) => {
    await api.post('/logout', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getProjects = async (token: string) => {
    const response = await api.get('/farm_configurations', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
    return response.data;
}