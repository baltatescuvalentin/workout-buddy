import { useEffect, useState } from 'react';
import '../Styles/workouts.css';
import UtilityButton from './buttons/UtilityButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const WorkoutRoutineView = () => {

    const [step, setStep] = useState(0);
    const [currentDay, setCurrentDay] = useState(null);
    const navigate = useNavigate();

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
            await axios.get(`https://workout-buddy-3j5n.onrender.com/workoutroutine/getWorkoutById/${id}`, options)
                .then((response) => {
                    setCurrentDay(response.data.workout.days[`${day}`]);
                })
                .catch((error) => {
                    if(error.response.data.message) {
                        toast.error(error.response.data.message, { duration: 3000});
                    }
                    else {
                        toast.error(error.error , { duration: 3000});
                    }
                })
        }

        getDayExercise();
    }, [id, jwt, day]);

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
                            step > 0 ? <UtilityButton styles='workout_routine_step_button' title='Previous' onClick={prevStep} />
                            : step === 0 ? <UtilityButton styles='workout_routine_step_button' title='Back' onClick={() => navigate(-1)}/> : <div></div>
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