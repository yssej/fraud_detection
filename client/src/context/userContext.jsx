import {createContext, useContext, useEffect, useState} from "react";
import authService from "../services/auth.service.js";
import WithAxios from "../helpers/WithAxios.js";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [authData, setAuthData] = useState({
       token: "",
    });

    useEffect(() => {
        if(isLoggedIn){
            authService.getCurrentUser().then((res) => {setUserData(res?.data)});
        }
    }, [isLoggedIn]);

    useEffect(() => {
       if(localStorage.getItem('RISK_MONITOR_token')){
           setIsLoggedIn(true);
           setAuthData({
               token: localStorage.getItem('RISK_MONITOR_token')
           })
       }
    }, []);

    const setUserInfo = (data) => {
       const { user, token } = data;
       setIsLoggedIn(true);
       setUserData(user);
       setAuthData({
           token: token
       });
       localStorage.setItem('RISK_MONITOR_token', token);
    }

    const logout = () => {
        setUserData(null);
        setAuthData(null);
        setIsLoggedIn(false);
        authService.logout();
    };

    return (
       <UserContext.Provider
           value={{
               isLoggedIn,
               setIsLoggedIn,
               userData,
               setUserData,
               setUserState: (data) => setUserInfo(data),
               authData,
               setAuthData,
               logout
       }}>
        <WithAxios>{children}</WithAxios>
       </UserContext.Provider>
    )
};

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
};

export { UserProvider, useUser };
