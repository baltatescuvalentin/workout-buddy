import '../Styles/navbars.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setMNavbar } from '../state';
import { useNavigate } from 'react-router-dom';


const MobileMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mNavbar = useSelector(state => state.mNavbar);
    console.log(`mNavbar: ${mNavbar}`);

    return (
        <div className='mobile_menu_wrapper'>
            <GiHamburgerMenu onClick={() => dispatch(setMNavbar({mNavbar: true}))} className='mobile_menu_icon'/>
            <FaUserCircle onClick={() => navigate('/profile')} className='mobile_menu_icon' />
        </div>
    )
}

export default MobileMenu;