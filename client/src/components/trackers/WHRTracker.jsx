import '../../Styles/fitness.css';
import '../../Styles/buttons.css';
import '../../Styles/inputs.css';
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import UtilityButton from '../buttons/UtilityButton';
import { useEffect, useState } from 'react';

const WHRTracker = ({id, register, value, getValues, setValue, watch, saveToTracker, deleteFromTracker}) => {

    const [edit, setEdit] = useState(false);
    const [calculable, setCalculable] = useState(false);

    const changeEdit = () => {
        setEdit(prev => !prev)
    }

    const savetToDB = () => {
        setEdit(prev => !prev);
        saveToTracker();
    }

    const deteleAction = () => {
        setEdit(prev => !prev);
        deleteFromTracker(id);
        setValue(id, 0);
    }

    const calculateWHR = () => {
        let WHR = getValues('waist') / getValues('hips');
        WHR = WHR.toFixed(2);
        setValue('WHR', WHR);
    }

    let waistEffect = watch('waist');
    let hipsEffect = watch('hips');

    useEffect(() => {
        const checkForTrackerValues = () => {
            return (waistEffect > 0) && (hipsEffect > 0);
        }

        setCalculable(checkForTrackerValues());

    }, [hipsEffect, waistEffect]);

    return (
        <div>
            {
                edit ? (
                    <>
                        <div className='tracker_header'>
                            <div className='tracker_title_input'>
                                <p>WHR</p>
                                <input className='tracker_input' type='number' id={id} value={watch(id)} {...register(id)}/>
                            </div>
                            <div className='tracker_buttons'>
                                <UtilityButton styles='tracker_button' onClick={savetToDB} icon={<FaSave className='tracker_button_icon'/>}/>
                                <UtilityButton styles='tracker_button' onClick={deteleAction} icon={<FaTrashCan className='tracker_button_icon_cancel'/>}/>
                                <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaTimes className='tracker_button_icon_cancel'/>}/>
                            </div>
                        </div>
                        <div>
                            <button className={`${calculable ? 'tracker_calculate_button' : 'tracker_calculate_button_disabled'}`} onClick={calculateWHR} disabled={!calculable}>
                                Calculate with tracked values
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='tracker_header'>
                        <div className='tracker_title_input'>
                            <p>WHR</p>
                            <p className='tracker_value'>{value}</p>
                        </div>
                        <div className='tracker_buttons'>
                            <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaEdit className='tracker_button_icon'/>}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default WHRTracker;