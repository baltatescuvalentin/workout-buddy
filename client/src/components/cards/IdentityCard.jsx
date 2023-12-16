import { useState } from 'react';
import '../../Styles/auth.css';
import { IoMdMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { PiGenderIntersexBold } from 'react-icons/pi';

const IdentityCard = ({value, setValue}) => {

    const [chosen, setChosen] = useState(value || null);

    const chooseMale = () => {
        setValue('sex', 'male');
        setChosen('male');
    }

    const chooseFemale = () => {
        setValue('sex', 'female');
        setChosen('female');
    }

    return (
        <div className='info_card'>
            <div className='info_header'>
                <p>Sex</p>
                <PiGenderIntersexBold className='icon'/>
            </div>
            <div className='identity_wrapper'>
                <IoMdMale className={`${chosen === 'male' ? 'identity_wrapper_icon_chosen' : 'identity_wrapper_icon'}`} onClick={chooseMale}/>
                <IoFemale className={`${chosen === 'female' ? 'identity_wrapper_icon_chosen' : 'identity_wrapper_icon'}`} onClick={chooseFemale}/>
            </div>
        </div>
    )
}

export default IdentityCard;