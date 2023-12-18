import '../Styles/navbars.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setMNavbar } from '../state';
import { useNavigate } from 'react-router-dom';


const MobileMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mode = useSelector(state => state.mode);

    return (
        <div className={`${mode === 'light' ? 'mobile_menu_wrapper_light' : 'mobile_menu_wrapper_dark'}`}>
            <GiHamburgerMenu onClick={() => dispatch(setMNavbar({mNavbar: true}))} className={`${mode === 'light' ? 'mobile_menu_icon_light' : 'mobile_menu_icon_dark'}`}/>
            <FaUserCircle onClick={() => navigate('/profile')} className={`${mode === 'light' ? 'mobile_menu_icon_light' : 'mobile_menu_icon_dark'}`} />
        </div>
    )
}

export default MobileMenu;