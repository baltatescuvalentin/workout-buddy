import '../../Styles/buttons.css';
import { FaArrowDown, FaArrowUp  } from "react-icons/fa";
import RotatingButton from './RotatingButton';
import UtilityButton from './UtilityButton';


const ExpandButton = ({btnStyles, iconStyles}) => {

    const [isRotated, setIsRotated] = useState(false);

    const handleClick = () => {
        setIsRotated(!isRotated);
    };

    return (
        <button onClick={handleClick} className={`prerotate ${isRotated ? 'rotated_button' : ''} ${styles}`}>
            {isRotated ? arrowUp : arrowDown}
        </button>
    )
}

export default ExpandButton