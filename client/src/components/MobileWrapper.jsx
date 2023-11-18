import { Outlet } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import MobileNavbar from "./navbars/MobileNavbar";


const MobileWrapper = () => {
    return (
        <>
            <MobileMenu />
            <MobileNavbar />
            <Outlet />
        </>
    )
}

export default MobileWrapper;