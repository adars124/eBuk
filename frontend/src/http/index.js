import axios from 'axios';
import toast from 'react-hot-toast';
import { fromStorage } from '../lib';

console.log(import.meta.env.VITE_API_URL);

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
    },
});

// interceptor (request)
http.interceptors.request.use(req => {
    const token = fromStorage('token');

    if(token) {
        req.headers = {
            ...req.headers,
            'Authorization': `Bearer ${token}`,
        };
    }

    return req;
}, err => Promise.reject(err));

// interceptors (response)
http.interceptors.response.use(res => {
    if('user' in res.data) {
        toast.success('Logged in successfully!');
    }

    if('newUser' in res.data) {
        toast.success('User registered!');
    }

    return res;
}, err => {
    if('response' in err && 'error' in err.response.data) {
        toast.error(err.response.data.error);
    }

    return Promise.reject(err);
});

export default http;