import axios from 'axios';

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : 'http://localhost:3000/api';

const API = axios.create({baseURL, withCredentials: true});

API.interceptors.request.use(
    function (req) {
        const token = localStorage.getItem('RISK_MONITOR_token');
        if(token) req.headers['authorization'] = 'Bearer '+token;
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default API;
