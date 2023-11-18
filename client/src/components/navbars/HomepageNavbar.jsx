import { useDispatch, useSelector } from 'react-redux';
import '../../Styles/navbars.css';
import darkLogo from '../../utils/images/dark-logo.png';
import lightLogo from '../../utils/images/light-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher';
import { setLogout } from '../../state';

const HomepageNavbar = () => {

    const mode = useSelector(state => state.mode);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='homepage_navbar'>
            {mode === 'light' 
                ? <img src={lightLogo} alt='Light logo' className='navbar_logo' onClick={() => navigate('/')}/> 
                : <img src={darkLogo} alt='Dark logo' className='navbar_logo' onClick={() => navigate('/')}/>}
            <div className='homepage_menu'>
                <Link to='/workouts' className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Workouts</Link>
                <Link className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Fitness</Link>
                <ThemeSwitcher />
                {user ? (
                    <div className='homepage_menu'>
                        <Link className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Profile</Link>
                        <Link to='/' onClick={() => dispatch(setLogout())} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Sign out</Link>
                    </div>
                ) : (
                    <div className='homepage_menu'>
                        <Link to='/login' className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Log in</Link>
                        <Link to='/register' className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Sign in</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomepageNavbar;