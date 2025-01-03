import axios from 'axios';

// Define the API interface
const baseURL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_PRODUCTION_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL;


const api = axios.create({
    baseURL: baseURL,
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
            page: page, // Ensure page is at least 1
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
export const fetchUsersAllUers = async () => {
    try {
        const response = await api.get('/get-all-users');
        console.log('Fetched all users:', response.data.data);

        return response.data.data || []; // Return an empty array if no data is returned
    } catch (err) {
        console.error('Error fetching all users:', err);
        throw new Error('Error fetching users');
    }
};


// GET SINGLE USER
export const fetchSingleUser = async (id: string) => {
    try {
        const response = await axios.get(`https://react-admin-ui-v1-api.vercel.app/users/${id}`);

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


export const fetchRoles = async (page: number = 0, pageSize: number = 10) => {
    try {
        const response = await api.post('/roles', {
            page: page + 1, // Ensure page is at least 1
            pageSize: pageSize, // Ensure pageSize has a default value
        });


        // Assuming the API returns both the user data and the total count of users
        return {
            roles: response.data.data || [], // Fallback to an empty array if undefined
            total: response.data.total || 0,  // Fallback to 0 if total is undefined
        };
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


export const fetchProjectConfiguration = async (page: number = 0, pageSize: number = 10) => {
    try {
        const response = await api.post('/configured-projects-list', {
            page: page + 1, // Ensure page is at least 1
            pageSize: pageSize, // Ensure pageSize has a default value
        });


        // Assuming the API returns both the user data and the total count of users
        return {
            data: response.data.data || [], // Fallback to an empty array if undefined
            total: response.data.total || 0,  // Fallback to 0 if total is undefined
        };
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch roles');
    }
};
export const fetchAllFarmData = async (page: number = 0, pageSize: number = 10) => {
    try {
        const response = await api.post('/all-farm-list', {
            page: page + 1, // Ensure page is at least 1
            pageSize: pageSize, // Ensure pageSize has a default value
        });


        // Assuming the API returns both the user data and the total count of users
        return {
            data: response.data.data || [], // Fallback to an empty array if undefined
            total: response.data.total || 0,  // Fallback to 0 if total is undefined
        };
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch roles');
    }
};

export const addInvestment = async ({
                                        investment_percentage,
                                        investment_period,
                                        min_investment_amount,
                                        is_active,
                                        farm_id
                                    }: {
    investment_percentage: string;
    investment_period: string;
    min_investment_amount: string;
    is_active: boolean;
    farm_id: string;
}) => {
    try {
        const response = await api.post('/configured-projects', {
            investment_percentage,
            investment_period,
            min_investment_amount,
            is_active,
            farm_id
        });
        return response.data;
    } catch (error) {
        throw new Error('Error adding investment');
    }
};


export const fetchFarms = async () => {
    try {
        const response = await api.get('/get-farms');

        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch farms');
    }

}

export const addFarm = async ({
                                  location,
                                  latitude,
                                  longitude,
                                  size,
                                  irrigation_source,
                                  soil_type,
                                  sowing_method,
                                  seed_variety,
                                  crop,
                                  sowing_date,
                                  name,
                                  farm_configuration,
                                  user_id,
                              }: {
    location: string;
    latitude: string;
    longitude: string;
    size: string;
    irrigation_source: string;
    soil_type: string;
    sowing_method: string;
    seed_variety: string;
    crop: string;
    sowing_date: string;
    name?: string;
    farm_configuration: { key: string; value: string }[];
    user_id: string;
}) => {
    try {
        const response = await api.post('/add-farm', {
            location,
            latitude,
            longitude,
            size,
            irrigation_source,
            soil_type,
            sowing_method,
            seed_variety,
            crop,
            sowing_date,
            name,
            farm_configuration,
            user_id,
        });

        return response.data; // Return the response if needed
    } catch (error) {
        console.error('Error adding farm:', error);
        throw new Error('Error adding farm');
    }
};
