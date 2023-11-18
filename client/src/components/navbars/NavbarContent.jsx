import '../../Styles/navbars.css';
import '../../Styles/styles.css';
import { AiFillHome } from 'react-icons/ai';
import { MdFitnessCenter } from 'react-icons/md';
import { BiSolidBarChartAlt2 } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { PiHeartbeatFill } from 'react-icons/pi';
import darkLogo from '../../utils/images/dark-logo.png';
import lightLogo from '../../utils/images/light-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { setLogout, setMNavbar } from '../../state';
import ThemeSwitcher from '../ThemeSwitcher';

const NavbarContent = () => {

    const mode = useSelector(state => state.mode);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const mNavbar = useSelector(state => state.mNavbar);

    const handleMobileClick = () => {
        if(mNavbar) {
            dispatch(setMNavbar({mNavbar: false}));
        }
    }

    return (
        <>
            {mode === 'light' 
                ? <img onClick={() => { handleMobileClick(); navigate('/');}} src={lightLogo} alt='Light logo' className='pages_navbar_logo' /> 
                : <img onClick={() => { handleMobileClick(); navigate('/');}} src={darkLogo} alt='Dark logo' className='pages_navbar_logo' />}
            <div>
                <div onClick={() => { handleMobileClick(); navigate('/')}} className='pages_navbar_item'>
                    <AiFillHome className={mode === 'light' ? 'navbar_icon_light' : 'navbar_icon_dark'} />
                    <p>Home</p>
                </div>
                <div className='vertical_flex'>
                    <div onClick={() => { handleMobileClick(); navigate('/')}} className='pages_navbar_item'>
                        <MdFitnessCenter className={mode === 'light' ? 'navbar_icon_light' : 'navbar_icon_dark'} />
                        <p>Workouts</p>
                    </div>
                    <div className='category_elements'>
                        <Link to='/workouts/findexercise' onClick={() => { handleMobileClick(); }} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Find an exercise</Link>
                        <Link onClick={() => { handleMobileClick(); }} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Create workout</Link>
                        <Link onClick={() => { handleMobileClick(); }} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Your workouts</Link>
                    </div>
                </div>
                <div className='vertical_flex'>
                    <div onClick={() => { handleMobileClick(); navigate('/')}} className='pages_navbar_item'>
                        <PiHeartbeatFill className={mode === 'light' ? 'navbar_icon_light' : 'navbar_icon_dark'} />
                        <p>Fitness</p>
                    </div>
                    <div className='category_elements'>
                        <Link onClick={() => { handleMobileClick(); }} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Fitness Calculator</Link>
                        <Link onClick={() => { handleMobileClick(); }} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Fitness Tracker</Link>
                    </div>
                </div>
                <div onClick={() => { handleMobileClick(); navigate('/')}} className='pages_navbar_item'>
                    <BiSolidBarChartAlt2 className={mode === 'light' ? 'navbar_icon_light' : 'navbar_icon_dark'} />
                    <p>Summary</p>
                </div>
                <ThemeSwitcher bonusStyles='item_margin_left_navbar'/>
            </div>
            {user ? (
                <div className='vertical_flex'>
                    <div onClick={() => { handleMobileClick(); navigate('/')}} className='pages_navbar_item'>
                        <BsFillPersonFill className={mode === 'light' ? 'navbar_icon_light' : 'navbar_icon_dark'} />
                        <p>Profile</p>
                    </div>
                    <Link to='/' onClick={() => { handleMobileClick(); dispatch(setLogout())}} className={`${mode === 'light' ? 'light_menu_item' : 'dark_menu_item'} link_navbar`}>Sign out</Link>
                </div>
            ) : (
                <div className='vertical_flex'>
                    <Link onClick={() => { handleMobileClick(); }} to='/login' className={`${mode === 'light' ? 'light_menu_item' : 'dark_menu_item'} link_navbar`}>Log in</Link>
                    <Link onClick={() => { handleMobileClick(); }} to='/register' className={`${mode === 'light' ? 'light_menu_item' : 'dark_menu_item'} link_navbar`}>Sign in</Link>
                </div>
            )}
        </>
    )
}

export default NavbarContent;