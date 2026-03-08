import {createContext, useContext, useEffect, useRef, useState} from "react";
import authService from "../services/auth.service.js";
import WithAxios from "../helpers/WithAxios.js";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const hasChecked = useRef(false);

    useEffect(() => {
        if (hasChecked.current) return;
        if(localStorage.getItem("isLoggedIn") === "true") {
            setIsLoggedIn(true);
            setIsLoading(false);
            const checkAuth = async () => {
                try {
                    // Imaginons que tu vérifies le token ici
                    const res = await authService.getCurrentUser();
                    if (res?.data) {
                        setUserData(res.data);
                        setIsLoggedIn(true);
                    }
                } catch (err) {
                    console.error("Session non valide ou inexistante");
                } finally {
                    setIsLoading(false);
                }
            };
            checkAuth();
            hasChecked.current = true;
        }
        setIsLoading(false);
    }, [])

    useEffect(() => {
        if(isLoggedIn){
            authService.getCurrentUser().then((res) => {setUserData(res?.data)});
        }
    }, [isLoggedIn]);

    const setUserInfo = (data) => {
        const { user } = data;
        setIsLoggedIn(true);
        setUserData(user);
        localStorage.setItem("isLoggedIn", "true");
    }

    const logout = async () => {
        setIsLoading(true);
        setUserData(null);
        setIsLoggedIn(false);
        await authService.logout();
        setIsLoading(false);
    };

    return (
       <UserContext.Provider
           value={{
               isLoading,
               isLoggedIn,
               setIsLoggedIn,
               userData,
               setUserData,
               setUserState: (data) => setUserInfo(data),
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
