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
                    <div onClick={() => { handleMobileClick(); navigate('/workouts')}} className='pages_navbar_item'>
                        <MdFitnessCenter className={mode === 'light' ? 'navbar_icon_light' : 'navbar_icon_dark'} />
                        <p>Workouts</p>
                    </div>
                    <div className='category_elements'>
                        <div to='/workouts/findexercise' onClick={() => { handleMobileClick(); navigate('/workouts/findexercise')}} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Find an exercise</div>
                        <div onClick={() => { handleMobileClick(); navigate('/workouts/create_workout')}} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Create workout</div>
                        <div onClick={() => { handleMobileClick(); navigate('/workouts/myworkouts')}} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Your workouts</div>
                    </div>
                </div>
                <div className='vertical_flex'>
                    <div onClick={() => { handleMobileClick(); navigate('/fitness')}} className='pages_navbar_item'>
                        <PiHeartbeatFill className={mode === 'light' ? 'navbar_icon_light' : 'navbar_icon_dark'} />
                        <p>Fitness</p>
                    </div>
                    <div className='category_elements'>
                        <div onClick={() => { handleMobileClick(); navigate('/fitness/calculator')}} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Fitness Calculator</div>
                        <div onClick={() => { handleMobileClick(); navigate('/fitness/tracker')}} className={mode === 'light' ? 'light_menu_item' : 'dark_menu_item'}>Fitness Tracker</div>
                    </div>
                </div>
                <div onClick={() => { handleMobileClick(); navigate('/fitness/summary')}} className='pages_navbar_item'>
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
                    <div to='/' onClick={() => { handleMobileClick(); dispatch(setLogout())}} className={`${mode === 'light' ? 'light_menu_item' : 'dark_menu_item'} link_navbar`}>Sign out</div>
                </div>
            ) : (
                <div className='vertical_flex'>
                    <div onClick={() => { handleMobileClick(); }} to='/login' className={`${mode === 'light' ? 'light_menu_item' : 'dark_menu_item'} link_navbar`}>Log in</div>
                    <div onClick={() => { handleMobileClick(); }} to='/register' className={`${mode === 'light' ? 'light_menu_item' : 'dark_menu_item'} link_navbar`}>Sign in</div>
                </div>
            )}
        </>
    )
}

export default NavbarContent;