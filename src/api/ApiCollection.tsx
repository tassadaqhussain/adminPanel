import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/admin',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Example of using a token stored in localStorage
    },
});
// GET TOP DEALS
export const fetchTopDeals = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/topdeals');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET TOTAL USERS
export const fetchTotalUsers = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/totalusers');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET TOTAL PRODUCTS
export const fetchTotalProducts = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/totalproducts');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET TOTAL RATIO
export const fetchTotalRatio = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/totalratio');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET TOTAL REVENUE
export const fetchTotalRevenue = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/totalrevenue');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET TOTAL SOURCE
export const fetchTotalSource = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/totalsource');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET TOTAL VISIT
export const fetchTotalVisit = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/totalvisit');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET TOTAL REVENUE BY PRODUCTS
export const fetchTotalRevenueByProducts = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/totalrevenue-by-product');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET TOTAL PROFIT
export const fetchTotalProfit = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/totalprofit');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET ALL USERS
export const fetchUsers = async (page: number = 0, pageSize: number = 10) => {
    try {
        const response = await api.post('/users-with-roles', {
            page: page + 1, // Ensure page is at least 1
            pageSize: pageSize, // Ensure pageSize has a default value
        });
        console.log('axios post:', response.data.data);

        // Assuming the API returns both the user data and the total count of users
        return {
            users: response.data.data || [], // Fallback to an empty array if undefined
            total: response.data.total || 0,  // Fallback to 0 if total is undefined
        };
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
};


// GET SINGLE USER
export const fetchSingleUser = async (id: string) => {
    try {
        const response = await axios.get(`https://react-admin-ui-v1-api.vercel.app/users/${id}`);
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET ALL PRODUCTS
export const fetchProducts = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/products');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET SINGLE PRODUCT
export const fetchSingleProduct = async (id: string) => {
    try {
        const response = await axios.get(`https://react-admin-ui-v1-api.vercel.app/products/${id}`);
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET ALL ORDERS
export const fetchOrders = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/orders');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET ALL POSTS
export const fetchPosts = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/posts');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET ALL NOTES
export const fetchNotes = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/notes?q=');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// GET ALL LOGS
export const fetchLogs = async () => {
    try {
        const response = await axios.get('https://react-admin-ui-v1-api.vercel.app/logs');
        console.log('axios get:', response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};


export const fetchRoles = async () => {
    try {
        const response = await api.get('/roles'); // Assuming the roles endpoint is /roles
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch roles');
    }
};
export const addUser = async (name: string, email: string, password: string, role: string) => {
    try {
        const response = await api.post('/users', {name, email, password, role});
        return response.data; // Return response data if needed
    } catch (error) {
        throw new Error('Error adding user');
    }
};