    import {useUser} from "../context/userContext.jsx";
    import {useMemo} from "react";
    import API from "../API/axios.config.js";
    import history from "./history.js";

    const WithAxios = ({children}) => {
        const { setIsLoggedIn, setUserData, isLoggedIn, isLoading } = useUser();

        useMemo(() => {
            if(!isLoading && isLoggedIn) {
                API.interceptors.response.use(
                    (response) => response,
                    async (error) => {
                        const originalRequest = error.config;
                        if(error.response?.status === 401 && originalRequest.url === '/auth/refresh') {
                            console.log('Refresh token expired ', error.response?.status);
                            localStorage.setItem('isLoggedIn', 'false');
                            return new Promise((resolve, reject) => {
                                setIsLoggedIn(false);
                                setUserData(null);
                                history.push('/login');
                                reject(error);
                            })
                        }

                        if(error.response?.status === 401 && !originalRequest._retry) {
                            console.log('Access token expired ', originalRequest._retry);
                            try {
                                originalRequest._retry = true;
                                await API.post('/auth/refresh');
                                return API(originalRequest);
                            } catch (error) {
                                setIsLoggedIn(false);
                                setUserData(null);
                                history.push('/login');
                            }
                        }
                        return Promise.reject(error);
                    }
                )
            }
        }, [isLoggedIn, setIsLoggedIn, setUserData]);

        return children;
    }

    export default WithAxios;
