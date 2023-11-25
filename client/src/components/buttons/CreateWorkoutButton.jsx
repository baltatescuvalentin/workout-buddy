import { useSelector } from 'react-redux';
import '../../Styles/buttons.css';

const CreateWorkoutButton = ({activeCreate, handleActiveForm}) => {

    const mode = useSelector(state => state.mode)

    return (
        <button onClick={handleActiveForm} 
            disabled={activeCreate}
            className={`${!activeCreate ? 'create_workout_button_active' : 'create_workout_button_disabled'} ${mode === 'light' ? 'create_workout_btn_light' : 'create_workout_btn_dark'}`}>
            Create
        </button>
    )
}

export default CreateWorkoutButton;