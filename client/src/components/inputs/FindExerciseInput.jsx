import { useSelector } from 'react-redux';
import '../../Styles/inputs.css';

const FindExerciseInput = ({getExerciseInput, styling}) => {

    const mode = useSelector(state => state.mode);

    return (
        <input type="text" placeholder="&#128269; Search" onChange={(e) => getExerciseInput(e.target.value)} onKeyDown={(e) => getExerciseInput(e.target.value)} 
            className={`${mode === 'light' ? 'light_input' : 'dark_input'} ${styling}`}/>
    )
}

export default FindExerciseInput;