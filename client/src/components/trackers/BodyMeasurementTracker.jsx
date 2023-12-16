import { useState } from 'react';
import '../../Styles/fitness.css';
import '../../Styles/buttons.css';
import '../../Styles/inputs.css';
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import UtilityButton from '../buttons/UtilityButton';

const BodyMeasurementTracker = ({id, register, setValue, value, title, metric, saveToTracker, deleteFromTracker}) => {

    const [edit, setEdit] = useState(false);

    const changeEdit = () => {
        setEdit(prev => !prev)
    }

    const saveToDB = () => {
        setEdit(prev => !prev);
        saveToTracker();
    }

    const deleteAction = () => {
        setEdit(prev => !prev);
        deleteFromTracker(id);
        setValue(id, 0);
    }

    return (
        <div>
            { edit ? (
                <div className='tracker_header'>
                    <div className='tracker_title_input'>
                        <p>{title}</p>
                        <input className='tracker_input' type='number' {...register(id)} id={id} value={value} />
                    </div>
                    <div className='tracker_buttons'>
                        <UtilityButton styles='tracker_button' onClick={saveToDB} icon={<FaSave className='tracker_button_icon'/>}/>
                        <UtilityButton styles='tracker_button' onClick={deleteAction} icon={<FaTrashCan className='tracker_button_icon_cancel'/>}/>
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