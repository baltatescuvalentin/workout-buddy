import { useState } from 'react';
import '../../Styles/buttons.css';


const RotatingButton = ({arrowUp, arrowDown, styles}) => {

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

export default RotatingButton;