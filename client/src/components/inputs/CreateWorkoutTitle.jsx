import { useSelector } from 'react-redux';
import '../../Styles/inputs.css';

const CreateWorkoutTitle = ({id, name, register}) => {

    const mode = useSelector(state => state.mode);

    return (
        <input id={id} placeholder={name} {...register(id)} 
            className={`create_workout_title ${mode === 'light' ? 'light_input' : 'dark_input'}`}/>
    )
}

export default CreateWorkoutTitle;