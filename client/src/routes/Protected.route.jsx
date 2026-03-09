import {useUser} from "../context/userContext.jsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import {useEffect, useRef} from "react";

export const ProtectedRoute = ({redirectPath = "/login", children}) => {
    const {isLoading, isLoggedIn} = useUser();
    const location = useLocation();

    if(!isLoading && !isLoggedIn) {
        return <UnauthorizedRedirect redirectPath={redirectPath} state={{ from: location }} />;
    }

    return children ? children : <Outlet />;
}

const UnauthorizedRedirect = ({ redirectPath, state }) => {
    const hasChecked = useRef(false);
    useEffect(() => {
        if (hasChecked.current) return;
        toast.error("Accès refusé. Veuillez vous connecter.");
        hasChecked.current = true;
    }, []);

    return <Navigate to={redirectPath} state={state} replace />;
};
