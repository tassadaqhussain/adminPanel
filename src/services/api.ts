import axios from 'axios';
let baseURL = 'http://localhost:8000/api/admin';
if(process.env.REACT_APP_STAGE ==='production'){
    baseURL = 'https://app.blueolivetech.com/api/admin';
}
const api = axios.create({
    baseURL:baseURL,
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