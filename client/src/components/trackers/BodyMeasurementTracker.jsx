import { useState } from 'react';
import '../../Styles/fitness.css';
import '../../Styles/buttons.css';
import '../../Styles/inputs.css';
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import UtilityButton from '../buttons/UtilityButton';

const BodyMeasurementTracker = ({id, register, value, title, metric}) => {

    const [edit, setEdit] = useState(false);

    const changeEdit = () => {
        setEdit(prev => !prev)
    }

    return (
        <div>
            { edit ? (
                <div className='tracker_header'>
                    <div className='tracker_title_input'>
                        <p>{title}</p>
                        <input className='tracker_input' type='number' id={id} value={value} {...register(id)}/>
                    </div>
                    <div className='tracker_buttons'>
                        <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaSave className='tracker_button_icon'/>}/>
                        <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaTimes className='tracker_button_icon_cancel'/>}/>
                    </div>
                </div>
            ) : (
                <div className='tracker_header'>
                    <div className='tracker_title_input'>
                        <p>{title}</p>
                        <p className='tracker_value'>{value} {metric}</p>
                    </div>
                    <div className='tracker_buttons'>
                        <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaEdit className='tracker_button_icon'/>}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BodyMeasurementTracker;