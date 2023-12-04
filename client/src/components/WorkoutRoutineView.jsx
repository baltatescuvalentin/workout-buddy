import { useEffect, useState } from 'react';
import '../Styles/workouts.css';
import UtilityButton from './buttons/UtilityButton';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


const WorkoutRoutineView = () => {

    const [step, setStep] = useState(0);
    const [currentDay, setCurrentDay] = useState(null);

    const jwt = useSelector(state => state.token);

    const { id, day } = useParams();

    useEffect(() => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }

        const getDayExercise = async () => {
            await axios.get(`http://localhost:3001/workoutroutine/getWorkoutById/${id}`, options)
                .then((response) => {
                    setCurrentDay(response.data.workout.days[`${day}`]);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        getDayExercise();
    }, [])

    const nextStep = () => {
        setStep(prev => prev + 1);
    }

    const prevStep = () => {
        setStep(prev => prev - 1);
    }

    return (
        <div className='workout_wrapper'>
            {currentDay && (
                <>
                    <h1>{currentDay.dayName} {currentDay.name && `(${currentDay.name})`}</h1>
                    <h2>{currentDay.exercises[step].exercise.name}</h2>
                    <p>Target: <span>{currentDay.exercises[step].exercise.target}</span></p>
                    <p>Secondary target: {currentDay.exercises[step].exercise.secondaryTarget.map((target) => {
                        return <span key={target}>{target} </span>
                    })}</p>
                    <p>Equipment: <span>{currentDay.exercises[step].exercise.equipment}</span></p>
                    <div className='view_exercise_steps_image'>
                        <div>
                            {currentDay.exercises[step].exercise.instructions.map((instr, index) => {
                                return <p key={index}>{index+1}. {instr}</p>
                            })}
                        </div>
                        <img src={currentDay.exercises[step].exercise.gifUrl} alt="Exercise instruction" loading='lazy'/>
                    </div>
                    <div className='workout_routine_step_buttons_wrapper'>
                        {
                            step > 0 ? <UtilityButton styles='workout_routine_step_button' title='Previous' onClick={prevStep} /> : <div></div>
                        }
                        {
                            step < currentDay.exercises.length - 1 ? <UtilityButton styles='workout_routine_step_button' title='Next' onClick={nextStep} /> : <div></div>
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default WorkoutRoutineView;