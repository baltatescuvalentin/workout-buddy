import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AlreadyLogged = ({children}) => {
    const user = useSelector(state => state.user);
    let location = useLocation();

    if (user && user._id) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } else {
        return children;
    }
}

export default AlreadyLogged;