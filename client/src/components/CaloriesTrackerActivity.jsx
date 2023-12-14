import '../Styles/inputs.css';
import '../Styles/buttons.css';
import '../Styles/fitness.css';
import { useState } from 'react';
import { FaSave, FaTimes, FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import UtilityButton from './buttons/UtilityButton';
import { useForm } from 'react-hook-form';

const CaloriesTrackerActivity = ({index, trackerItem, removeFromCaloriesArray, editToCaloriesArray, saveToTracker}) => {

    const [edit, setEdit] = useState(false);
    const [caloriesItem, setCalorieItem] = useState(trackerItem);
    const {
        register,
        watch,
        getValues,
    } = useForm({
        defaultValues: {
            activity: caloriesItem.activity || '',
            time: caloriesItem.time || 0,
            calories: caloriesItem.calories || 0,
        }
    })

    console.log(caloriesItem);

    const handleEdit = () => {
        setEdit(prev => !prev);
    }

    const saveToArray = () => {
        const data = {
            activity: getValues('activity'),
            time: parseFloat(getValues('time')),
            calories: parseFloat(getValues('calories')),
        }

        editToCaloriesArray(index, data);
        handleEdit();
        //saveToTracker();
    }

    return (
        <div>
            {
                edit ? (
                    <>
                        <div className='calories_tracker_food_wrapper'>
                            <div className='calories_tracker_food_elements_wrapper'>
                                <div className='calories_tracker_food_element'>
                                    <p>Activty</p>
                                    <input type='text' className='calories_intake_input_foodname' {...register('activity')} placeholder='Activity' value={watch('activity')}/>
                                </div>
                                <div className='calories_tracker_food_element'>
                                    <p>Time</p>
                                    <input className='calories_intake_input_quantity' type='number' {...register('time')} value={watch('time')}/>
                                </div>
                                <div className='calories_tracker_food_element'>
                                    <p>Calories</p>
                                    <input className='calories_intake_input_quantity' type='number' {...register('calories')} value={watch('calories')}/>
                                </div>
                            </div>
                            <div className='calories_tracker_food_buttons'>
                                <UtilityButton onClick={saveToArray} styles='tracker_button'  icon={<FaSave className='tracker_button_icon'/>}/>
                                <UtilityButton onClick={() => removeFromCaloriesArray(index)} styles='tracker_button' icon={<FaTrashCan className='tracker_button_icon'/>}/>
                                <UtilityButton onClick={handleEdit} styles='tracker_button' icon={<FaTimes className='tracker_button_icon_cancel'/>}/>
                            </div>
                        </div>
                        <div>

                        </div>
                    </>
                ) : (
                    <div className='calories_tracker_food_wrapper'>
                        <div className='calories_tracker_food_elements_wrapper'>
                            <div className='calories_tracker_food_element'>
                                <p>Activity</p>
                                <p>{trackerItem.activity}</p>
                            </div>
                            <div className='calories_tracker_food_element'>
                                <p>Time</p>
                                <p>{trackerItem.time} mins</p>
                            </div>
                            <div className='calories_tracker_food_element'>
                                <p>Calories</p>
                                <p>{trackerItem.calories}</p>
                            </div>
                        </div>
                        <div className='calories_tracker_food_buttons'>
                            <UtilityButton styles='tracker_button' onClick={handleEdit} icon={<FaEdit className='tracker_button_icon'/>}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CaloriesTrackerActivity;