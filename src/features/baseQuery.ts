import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import {getLocalStorageValue} from '../utils/localStorage';


const baseURL = 'http://localhost:8000/api/admin';
/*
if (process.env.REACT_APP_STAGE === 'production') {
    baseURL = 'https://app.blueolivetech.com/api/admin';
}

*/

const tagTypes = [
    "projects",

    'UserWallet',
    'ConfiguredProject'

];

const baseQuery = createApi({
    tagTypes,

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = getLocalStorageValue('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: () => ({}),
});

export const {injectEndpoints, endpoints} = baseQuery;

export default baseQuery;
