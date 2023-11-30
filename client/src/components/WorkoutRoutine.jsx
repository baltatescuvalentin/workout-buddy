import '../Styles/workouts.css';
import { FaEdit, FaRegTrashAlt, FaEye  } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import ExpandButton from './buttons/ExpandButton';
import UtilityButton from './buttons/UtilityButton';
import { useState } from 'react';
import WorkoutRoutineDay from './WorkoutRoutineDay';


const WorkoutRoutine = ({workout}) => {

    const [details, setDetails] = useState(false);

    const handleDetails = () => {
        setDetails(prev => !prev);
    }

    console.log(workout.days);

    return (
        <div className='myworkouts_workout_wrapper'>
            <div className='myworkouts_workout_header'>
                <h2>{workout.name ? workout.name : 'Workout'}</h2>
                <div className='myworkouts_workout_buttons'>
                    <UtilityButton  icon={<FaEdit className='workout_exercise_icon'/>} styles='myworkouts_header_button'/>
                    <UtilityButton  icon={<FaRegTrashAlt className='workout_exercise_icon'/>} styles='myworkouts_header_button'/>
                    <ExpandButton btnStyles='myworkouts_header_button' iconStyles='workout_exercise_icon' onClick={handleDetails}/>
                </div>
            </div>    
            {Object.entries(workout.days).map(([key, day]) => <WorkoutRoutineDay day={day} workoutId={workout._id} key={key} />)}
        </div>
    )
}

export default WorkoutRoutine;