import { useState } from 'react';
import '../Styles/workouts.css';
import ExpandButton from './buttons/ExpandButton';

const WorkoutRoutineExercise = ({exercise}) => {

    const [details, setDetails] = useState(false);

    const handleDetails = () => {
        setDetails(prev => !prev);
    }

    return (
        <div className='workout_exercise_wrapper'>
            <div className='workout_exercise_details_header'>
                <p className='workout_exercise_name'>{exercise.exercise.name}</p>
                <div className='workout_exercise_buttons'>
                    <ExpandButton btnStyles='workout_exercise_button' iconStyles='workout_exercise_icon' onClick={handleDetails}/>
                </div>
            </div>
            {
                details && (
                    <></>
                )
            }
        </div>
    )
}

export default WorkoutRoutineExercise;