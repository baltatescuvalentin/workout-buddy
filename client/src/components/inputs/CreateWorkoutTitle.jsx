import { useSelector } from 'react-redux';
import '../../Styles/inputs.css';

const CreateWorkoutTitle = ({id, name, register, defaultValue}) => {

    const mode = useSelector(state => state.mode);

    return (
        <input id={id} placeholder={name} {...register(id)} value={defaultValue}
            className={`create_workout_title ${mode === 'light' ? 'light_input' : 'dark_input'}`}/>
    )
}

export default CreateWorkoutTitle;