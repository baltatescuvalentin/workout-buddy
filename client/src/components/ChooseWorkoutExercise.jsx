import { useState } from "react";
import '../Styles/workouts.css';
import { useForm } from "react-hook-form";
import FindExerciseInput from './inputs/FindExerciseInput';
import ExercisesResultsList from './ExercisesResultsList';
import ChosenExercise from './ChosenExercise';
import WorkoutExerciseInput from "./inputs/WorkoutExerciseInput";
import { filterExercises } from "../utils/functions/workouts";
import { useSelector } from "react-redux";
import UtilityButton from "./buttons/UtilityButton";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

const ChooseWorkoutExercise = ({handleCloseFind, handleExpand, handleAddExercise, dayIndex}) => {

    const [exercisesList, setExecisesList] = useState([]);
    const [chosenExercise, setChosenExercise] = useState(null);
    const exercises = useSelector(state => state.exercices);
    const {
        register,
        getValues,
    } = useForm({
        defaultValues: {
            reps: '',
            sets: '',
            minutes: '',
        }
    })

    const getExerciseInput = (e) => {
        const filtered = filterExercises(e, exercises);
        setExecisesList(filtered);
    }

    const saveExerciseToState = () => {
        const exercise = {
            exercise: chosenExercise,
            reps: getValues('reps'),
            sets: getValues('sets'),
            minutes: getValues('minutes'),
        };

        console.log(chosenExercise);
        console.log(exercise);

        handleAddExercise(dayIndex, exercise);
    }

    const handleSave = () => {
        saveExerciseToState();
        handleCloseFind();
    }

    return (
        <div className="choose_workout_wrapper">
            <div className="choose_workout_exercise_header">
                <FindExerciseInput getExerciseInput={getExerciseInput} styling='find_workout_exercise_input'/>
                <div>
                    <UtilityButton onClick={handleSave} title='Save' icon={<FaSave className="choose_workout_exercise_close_icon"/>} styles='choose_workout_exercise_save'/>
                    <UtilityButton onClick={handleCloseFind} title='Close' icon={<FaRegTimesCircle className="choose_workout_exercise_close_icon"/>} styles='choose_workout_exercise_close'/>
                </div>
            </div>

            <ExercisesResultsList exercises={exercisesList} setChosenExercise={setChosenExercise} styling='workout_exercises_results_list'/>

            {chosenExercise && <ChosenExercise exercise={chosenExercise} wrapper_styling='create_workout_exercise' instructions_styling='create_workout_exercise_steps_image'/>}

            {chosenExercise && (
                <div className="sets_reps_wrapper">
                    <div className="sets_reps">
                        <WorkoutExerciseInput id='sets' getValues={getValues} register={register} title='Sets' styles='exercise_sets_reps'/>
                        <WorkoutExerciseInput id='reps' getValues={getValues} register={register} title='Reps' styles='exercise_sets_reps'/>
                    </div>
                    <h2>or</h2>
                    <WorkoutExerciseInput id='minutes' getValues={getValues} register={register} title='Minutes' styles='exercise_sets_reps'/>
                </div>
            )}
        </div>
    )
}

export default ChooseWorkoutExercise;