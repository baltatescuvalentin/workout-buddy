import { useState } from 'react';
import '../Styles/workouts.css';
import ChooseWorkoutExercise from './ChooseWorkoutExercise';
import UtilityButton from './buttons/UtilityButton';
import { FaPlus } from "react-icons/fa";
import ExpandButton from './buttons/ExpandButton';

const CreateWorkoutDay = ({handleAddExercise, handleRemoveExercise, day, dayIndex}) => {

    const [openFind, setOpenFind] = useState(false);

    const handleOpenFind = () => {
        setOpenFind(prev => !prev);
    }

    return (
        <div className='day_wrapper'>
            <div className='day_header'>
                <h2>{day.dayName}</h2>
                <div className='day_header_buttons'>
                    <UtilityButton title='Add' icon={<FaPlus />} styles=''/>
                    <ExpandButton />
                </div>
            </div>
            <ChooseWorkoutExercise />
        </div>
    )
}

export default CreateWorkoutDay;