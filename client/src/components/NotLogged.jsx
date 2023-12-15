import '../Styles/styles.css';
import '../Styles/buttons.css';
import UtilityButton from './buttons/UtilityButton';
import { useNavigate } from 'react-router-dom';

const NotLogged = () => {

    const navigate = useNavigate();

    return (
        <div className='not_logged_wrapper'>
            <p>It appears you are not logged in. Log in so you can use website's features.</p>
            <div className='not_logged_buttons'>
                <UtilityButton styles='not_logged_button' title='Register' onClick={() => navigate('/register')}/>
                <UtilityButton styles='not_logged_button' title='Log in' onClick={() => navigate('/login')}/>
            </div>
        </div>
    )
}

export default NotLogged;