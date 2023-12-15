import '../Styles/styles.css';
import '../Styles/buttons.css';
import UtilityButton from '../components/buttons/UtilityButton';
import { useNavigate } from 'react-router-dom';

const Error = () => {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div className='error_wrapper'>
            <p className='title'>Error ☹️</p>
            <p className='subtitle'>Page does not exist!</p>
            <UtilityButton styles='error_button' title='Go to Homepage' onClick={goToHome}/>
            {/* <img src={ErrorImage} alt="Error" /> */}
        </div>
    )
}

export default Error;