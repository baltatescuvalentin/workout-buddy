import { useEffect, useState } from 'react';
import '../../Styles/workouts.css';
import FindExerciseInput from '../../components/inputs/FindExerciseInput';
import ExercisesResultsList from '../../components/ExercisesResultsList';
import { useDispatch, useSelector } from 'react-redux';
import { filterExercises } from '../../utils/functions/workouts';
import ChosenExercise from '../../components/ChosenExercise';

const FindExercise = () => {

    const [exerciseInput, setExerciseInput] = useState("");
    const [exercisesList, setExecisesList] = useState([]);
    const [chosenExercise, setChosenExercise] = useState(null);
    const exercises = useSelector(state => state.exercices);
    console.log(exercises);

    const getExerciseInput = (e) => {
        setExerciseInput(e);
        const filtered = filterExercises(e, exercises);
        setExecisesList(filtered);
    }


    return (
        <div className='workout_wrapper'>
            <div className='workouts_find_wrapper'>
                <h1>
                    Find an exercise
                </h1>
                <p>Have you ever forgotten how to do your exercises or if you are doing them correctly? Do not worry anymore
                    cause <span>Workout Buddy</span> got your back! Search for a specific exercise, an exercise that 
                    targets your desired muscle group or some exercises that can be done with your equipment, we got you
                    covered!
                </p>
                <p>
                    We will find your exercise and give you all the information you need: how to do the exercise
                    correcly with steps and also a GIF to visually understand, what is trains and the equipment needed. 
                    So just type it up and get healthy!
                </p>

                <FindExerciseInput getExerciseInput={getExerciseInput}/>

                <ExercisesResultsList exercises={exercisesList} setChosenExercise={setChosenExercise}/>

                {chosenExercise && <ChosenExercise exercise={chosenExercise} />}
            </div>
        </div>
    )
}

export default FindExercise;