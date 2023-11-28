import { useSelector } from 'react-redux';
import '../../Styles/inputs.css'

const WorkoutExerciseInput = ({id, title, register, value, styles}) => {

    const mode = useSelector(state => state.mode);

    return (
        <div>
            <p>{title}</p>
            <input value={value} id={id} placeholder={title} defaultValue="" type='number' {...register(id)} className={`${mode === 'light' ? 'light_input' : 'dark_input'} ${styles}`}/>
        </div>
    )
}

export default WorkoutExerciseInput;