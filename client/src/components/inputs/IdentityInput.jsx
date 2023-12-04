import { useState } from 'react';
import '../../Styles/auth.css';
import { IoMdMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { PiGenderIntersexBold } from 'react-icons/pi';

const IdentityInput = ({setValue}) => {

    const [chosen, setChosen] = useState(null);

    const chooseMale = () => {
        setValue('sex', 'male');
        setChosen('male');
    }

    const chooseFemale = () => {
        setValue('sex', 'female');
        setChosen('female');
    }

    return (
        <div className='identity_input_wrapper'>
            <p>Sex</p>
            <div className='identity_wrapper'>
                <IoMdMale className={`${chosen === 'male' ? 'identity_wrapper_icon_chosen' : 'identity_wrapper_icon_calculator'}`} onClick={chooseMale}/>
                <IoFemale className={`${chosen === 'female' ? 'identity_wrapper_icon_chosen' : 'identity_wrapper_icon_calculator'}`} onClick={chooseFemale}/>
            </div>
        </div>
    )
}

export default IdentityInput;