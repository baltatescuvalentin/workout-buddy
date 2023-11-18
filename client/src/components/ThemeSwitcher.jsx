import { useDispatch, useSelector } from "react-redux"
import { PiSunLight, PiMoonLight } from 'react-icons/pi';
import '../Styles/themeswitcher.css';
import '../Styles/navbars.css';
import { setMode } from "../state";

const ThemeSwitcher = ({bonusStyles}) => {

    const dispatch = useDispatch();
    const theme = useSelector(state => state.mode);

    const toggleTheme = () => {
        dispatch(setMode());
    }

    return (
        <button className={`${theme === 'light' ? 'dark_switcher' : 'light_switcher'} ${bonusStyles}`} onClick={toggleTheme}>
            {
                theme === 'light' ? <PiSunLight className="light_button"/> : <PiMoonLight className="dark_button"/>
            }  
        </button>
    )
}

export default ThemeSwitcher;