import { Outlet } from "react-router-dom";
import PagesNavbar from "./navbars/PagesNavbar";

const SharedLayout = () => {
    return (
        <div className="shared_layout">
            <PagesNavbar />
            <Outlet />
        </div>
    )
}

export default SharedLayout;