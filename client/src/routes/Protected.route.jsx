import {useUser} from "../context/userContext.jsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export const ProtectedRoute = ({redirectPath = "/login", chilren}) => {
    const {isLoggedIn} = useUser();
    const location = useLocation();

    if(!isLoggedIn) {
        return <Navigate to={redirectPath} state={{from: location}} replace />;
    }

    return chilren ? chilren : <Outlet />;
}
