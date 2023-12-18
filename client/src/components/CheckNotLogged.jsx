import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const CheckNotLogged = ({children, pathTo=''}) => {
    const user = useSelector(state => state.user);
    let location = useLocation();

    if (user && user._id) {
        return children;
    } else {
        return <Navigate to={`/${pathTo}`} state={{ from: location }} replace />;
    }
}

export default CheckNotLogged;