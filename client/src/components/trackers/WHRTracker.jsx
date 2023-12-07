import '../../Styles/fitness.css';
import '../../Styles/buttons.css';
import '../../Styles/inputs.css';
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import UtilityButton from '../buttons/UtilityButton';
import { useEffect, useState } from 'react';

const WHRTracker = ({id, register, value, getValues, setValue, watch}) => {

    const [edit, setEdit] = useState(false);
    const [calculable, setCalculable] = useState(false);

    const changeEdit = () => {
        setEdit(prev => !prev)
    }

    const calculateWHR = () => {
        let WHR = getValues('waist') / getValues('hips');
        WHR = WHR.toFixed(2);
        setValue('WHR', WHR);
    }

    useEffect(() => {
        const checkForTrackerValues = () => {
            return (getValues('waist') > 0) && (getValues('hips') > 0);
        }

        setCalculable(checkForTrackerValues());

    }, [watch('waist'), watch('hips')]);

    return (
        <div>
            {
                edit ? (
                    <>
                        <div className='tracker_header'>
                            <div className='tracker_title_input'>
                                <p>WHR</p>
                                <input className='tracker_input' type='number' id={id} value={value} {...register(id)}/>
                            </div>
                            <div className='tracker_buttons'>
                                <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaSave className='tracker_button_icon'/>}/>
                                <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaTimes className='tracker_button_icon_cancel'/>}/>
                            </div>
                        </div>
                        <div>
                            <p>WHR or Waist-to-Hips Ratio is an indicator of central obesity and is associated with an increased risk of cardiovascular diseases. A higher waist-to-hip ratio suggests a greater accumulation of abdominal fat.</p>
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