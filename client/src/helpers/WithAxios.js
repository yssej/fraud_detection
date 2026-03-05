import {useUser} from "../context/userContext.jsx";
import {useMemo} from "react";
import API from "../API/axios.config.js";
import history from "./history.js";

const WithAxios = ({children}) => {
    const { setIsLoggedIn, setUserData, setAuthData, isLoggedIn } = useUser();

    useMemo(() => {
        if(isLoggedIn) {
            API.interceptors.response.use(
                (response) => response,
                async (error) => {
                    const originalRequest = error.config;
                    console.log('error', error.response);
                    if(error.response?.status === 401 && originalRequest.url === '/auth/refresh') {
                        console.log('Refresh token expired ', error.response?.status);
                        return new Promise((resolve, reject) => {
                            setIsLoggedIn(false);
                            setUserData(null);
                            setAuthData(null);
                            history.push('/login');
                            reject(error);
                        })
                    }

                    if(error.response?.status === 401 && !originalRequest._retry) {
                        console.log('Refresh token expired ', originalRequest._retry);
                        try {
                            originalRequest._retry = true;
                            const response = await API.post('/auth/refresh');
                            const { accessToken, refreshToken } = response.data;
                            // localStorage.setItem('RISK_MONITOR_accessToken', accessToken);
                            // localStorage.setItem('RISK_MONITOR_refreshToken', refreshToken);
                            // API.defaults.headers['auth-token'] = accessToken;
                            return API(originalRequest);
                        } catch (error) {
                            setIsLoggedIn(false);
                            setUserData(null);
                            setAuthData(null);
                            history.push('/login');
                        }
                    }
                    return Promise.reject(error);
                }
            )
        }
    }, [isLoggedIn, setIsLoggedIn, setUserData, setAuthData]);

    return children;
}

export default WithAxios;
