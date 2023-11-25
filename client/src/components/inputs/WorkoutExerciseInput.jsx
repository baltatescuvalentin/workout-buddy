import { useSelector } from 'react-redux';
import '../../Styles/inputs.css'

const WorkoutExerciseInput = ({id, title, register, getValues}) => {

    const mode = useSelector(state => state.mode);

    return (
        <div>
            <p>{title}</p>
            <input id={id} placeholder={title} defaultValue="" type='number' {...register(id)} className={`${mode === 'light' ? 'light_input' : 'dark_input'} exercise_sets_reps`}/>
        </div>
    )
}

export default WorkoutExerciseInput;