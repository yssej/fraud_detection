import { useNavigate } from "react-router-dom";

export const GlobalHistory = () => {
    History.navigate = useNavigate();

    return null;
};
