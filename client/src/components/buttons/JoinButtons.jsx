import { useNavigate } from 'react-router-dom';
import '../../Styles/buttons.css';

const JoinButton = () => {

    const navigate = useNavigate();

    return (
        <button className='join_button' onClick={() => navigate('/register')}>
            Join now
        </button>
    )
}

export default JoinButton;