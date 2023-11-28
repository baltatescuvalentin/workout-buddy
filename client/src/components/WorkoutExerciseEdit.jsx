import { useForm } from 'react-hook-form';
import '../Styles/workouts.css';
import '../Styles/buttons.css';
import WorkoutExerciseInput from './inputs/WorkoutExerciseInput';
import UtilityButton from './buttons/UtilityButton';
import { FaRegTimesCircle, FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const WorkoutExerciseEdit = ({exercise, handleEdit, handleRemoveExercise, handleEditExercise}) => {

    const {
        register,
        getValues,
        watch,
    } = useForm({
        defaultValues: {
            sets: exercise.sets || '',
            reps: exercise.reps || '',
            minutes: exercise.minutes || '',
        }
    });

    const saveEdit = () => {
        const updatedExercise = exercise;
        updatedExercise.sets = getValues('sets');
        updatedExercise.reps = getValues('reps');
        updatedExercise.minutes = getValues('minutes');

        handleEditExercise(updatedExercise);

        handleEdit();
    }

    return (
        <div className='workout_exercise_wrapper'>
            <div className='workout_exercise_details_header'>
                <p className='workout_exercise_name'>{exercise.exercise.name}</p>
                <div className='workout_exercise_buttons'>
                    <UtilityButton onClick={saveEdit} title='Save' icon={<FaSave className='workout_exercise_icon' />} styles='workout_exercise_button'/>
                    <UtilityButton onClick={handleRemoveExercise} title='Delete' icon={<MdDelete className='workout_exercise_icon'/>} styles='workout_exercise_button'/>
                    <UtilityButton onClick={handleEdit} title='Cancel' icon={<FaRegTimesCircle className='workout_exercise_icon'/>} styles='workout_exercise_button'/>
                </div>
            </div>
            <div className='workout_exercise_details'>
                <p><span>{exercise.exercise.name}</span></p>
                <p>Target: <span>{exercise.exercise.target}</span></p>
                <p>
                    Secondary target: {exercise.exercise.secondaryTarget.map((target) => {
                        return <span key={target}>{target} </span>
                    })}
                </p>
                <p>Equipment: <span>{exercise.exercise.equipment}</span></p>
                <div className="sets_reps_wrapper">
                    <div className="sets_reps">
                        <WorkoutExerciseInput id='sets' value={watch('sets')} register={register} title='Sets' styles='edit_exercise_input'/>
                        <WorkoutExerciseInput id='reps' value={watch('reps')} register={register} title='Reps' styles='edit_exercise_input'/>
                    </div>
                    <h2>or</h2>
                    <WorkoutExerciseInput id='minutes' value={watch('minutes')} register={register} title='Minutes' styles='edit_exercise_input'/>
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
        </div>
    )
}

export default WorkoutExerciseEdit;