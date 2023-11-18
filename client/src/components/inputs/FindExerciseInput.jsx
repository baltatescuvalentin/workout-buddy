import { useSelector } from 'react-redux';
import '../../Styles/inputs.css';
import { useEffect } from 'react';

const FindExerciseInput = ({getExerciseInput}) => {

    const mode = useSelector(state => state.mode);

    return (
        <input type="text" placeholder="&#128269; Search" onInput={(e) => getExerciseInput(e.target.value)} 
            className={`${mode === 'light' ? 'light_input' : 'dark_input'} find_exercise_input`}/>
    )
}

export default FindExerciseInput;