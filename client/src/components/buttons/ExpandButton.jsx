import '../../Styles/buttons.css';
import { FaArrowDown, FaArrowUp  } from "react-icons/fa";
import { useState } from 'react';

const ExpandButton = ({btnStyles, iconStyles, onClick}) => {

    const [isRotated, setIsRotated] = useState(false);

    const handleClick = () => {
        setIsRotated(prev => !prev);
    };

    return (
        <button onClick={() => { handleClick(); onClick(); }} className={`prerotate ${isRotated ? 'rotated_button' : ''} ${btnStyles}`}>
            
            {isRotated ? <FaArrowUp className={`${iconStyles}`}/> : <FaArrowDown className={`${iconStyles}`}/>}
        </button>
    )
}

export default ExpandButton