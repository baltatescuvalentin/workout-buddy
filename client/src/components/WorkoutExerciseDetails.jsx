import { useState } from 'react';
import '../Styles/workouts.css';
import '../Styles/buttons.css';
import UtilityButton from './buttons/UtilityButton';
import ExpandButton from './buttons/ExpandButton';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

const WorkoutExerciseDetails = ({exercise, handleRemoveExercise, handleEdit}) => {

    const [details, setDetails] = useState(false);

    const handleDetails = () => {
        setDetails(prev => !prev);
    }

    console.log(exercise);

    return (
        <div className='workout_exercise_wrapper'>
            <div className='workout_exercise_details_header'>
                <p className='workout_exercise_name'>{exercise.exercise.name}</p>
                <div className='workout_exercise_buttons'>
                    <UtilityButton onClick={handleEdit} icon={<AiFillEdit className='workout_exercise_icon'/>} styles='workout_exercise_button'/>
                    <UtilityButton onClick={handleRemoveExercise} icon={<FaRegTrashAlt className='workout_exercise_icon'/>} styles='workout_exercise_button'/>
                    <ExpandButton btnStyles='workout_exercise_button' iconStyles='workout_exercise_icon' onClick={handleDetails}/>
                </div>
            </div>
            {details && (
                <div className='workout_exercise_details'>
                    <p><span>{exercise.exercise.name}</span></p>
                    <p>Target: <span>{exercise.exercise.target}</span></p>
                    <p>
                        Secondary target: {exercise.exercise.secondaryTarget.map((target) => {
                            return <span key={target}>{target} </span>
                        })}
                    </p>
                    <p>Equipment: <span>{exercise.exercise.equipment}</span></p>
                    <div>
                        {((exercise.sets && exercise.reps) || exercise.minutes) && (
                            <p>Do the following instructions for 
                                {exercise.sets && exercise.reps && <> <span>{exercise.sets} sets</span> and <span>{exercise.reps} reps</span> </>}
                                {exercise.sets && exercise.reps && exercise.minutes && <> or </>}
                                {exercise.minutes && <><span>{exercise.minutes} minutes</span></>}
                            </p>
                        )}
                    </div>
                    <div className='workout_exercise_details_instructions'>
                        <div>
                            {exercise.exercise.instructions.map((instr, index) => {
                                return <p key={index}>{index+1}. {instr}</p>
                            })}
                        </div>
                        <img src={exercise.exercise.gifUrl} alt="Exercise instruction" loading='lazy'/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorkoutExerciseDetails;