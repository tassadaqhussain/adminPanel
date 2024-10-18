import axios from 'axios';
// Define the API interface
const baseURL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PRODUCTION_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: baseURL,
});

export const loginUser = async (email: string, password: string) => {
    const response = await api.post('/login', {email, password});
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