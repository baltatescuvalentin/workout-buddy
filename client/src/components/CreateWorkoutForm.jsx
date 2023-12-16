import { useForm } from 'react-hook-form';
import '../Styles/workouts.css';
import '../Styles/buttons.css';
import '../Styles/inputs.css';
import CreateWorkoutTitle from './inputs/CreateWorkoutTitle';
import CreateWorkoutDescription from './inputs/CreateWorkoutDescription';
import CreateWorkoutHeaderButton from './buttons/UtilityButton';
import { FaSave } from "react-icons/fa";
import CreateWorkoutDay from './CreateWorkoutDay';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateWorkoutForm = ({handleActiveForm}) => {

    const [workout, setWorkout] = useState([
        { dayName: 'Monday', name: '', exercises: [] },
        { dayName: 'Tuesday', name: '', exercises: [] },
        { dayName: 'Wednesday', name: '', exercises: [] },
        { dayName: 'Thursday', name: '', exercises: [] },
        { dayName: 'Friday', name: '', exercises: [] },
        { dayName: 'Saturday', name: '', exercises: [] },
        { dayName: 'Sunday', name: '', exercises: [] },
    ]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const jwt = useSelector(state => state.token);
    const user = useSelector(state => state.user);

    const {
        register: registerInfo,
        getValues,
    } = useForm({
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const handleChangeDayName = (dayIndex, name) => {
        setWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                name: name,
            }
            return updatedWorkout;
        })
    }

    const handleAddExercise = (dayIndex, exercise) => {
        setWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                exercises: [...updatedWorkout[dayIndex].exercises, exercise]
            }
            return updatedWorkout;
        })
    }

    const handleRemoveExercise = (dayIndex, itemIndex) => {
        setWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                exercises: updatedWorkout[dayIndex].exercises.filter((_, index) => index !== itemIndex)
            }
            return updatedWorkout;
        })
    }

    const handleEditExercise = (dayIndex, editedExercise) => {
        setWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                exercises: updatedWorkout[dayIndex].exercises.map((exercise) => {
                    if(exercise.id === editedExercise.id) {
                        return {
                            ...exercise,
                            sets: editedExercise.sets,
                            reps: editedExercise.reps,
                            minutes: editedExercise.minutes,
                        }
                    }
                    else {
                        return exercise;
                    }
                })
            }

            return updatedWorkout;
        })
    }

    const saveToDB = async () => {

        setLoading(true);

        const data = {
            name: getValues('name'),
            description: getValues('description'),
            userId: user._id,
            days: {
                monday: {
                    dayName: 'monday',
                    name: workout[0].name,
                    exercises: workout[0].exercises,
                },
                tuesday: {
                    dayName: 'tuesday',
                    name: workout[1].name,
                    exercises: workout[1].exercises,
                },
                wednesday: {
                    dayName: 'wednesday',
                    name: workout[2].name,
                    exercises: workout[2].exercises,
                },
                thursday: {
                    dayName: 'thursday',
                    name: workout[3].name,
                    exercises: workout[3].exercises,
                },
                friday: {
                    dayName: 'friday',
                    name: workout[4].name,
                    exercises: workout[4].exercises,
                },
                saturday: {
                    dayName: 'saturday',
                    name: workout[5].name,
                    exercises: workout[5].exercises,
                },
                sunday: {
                    dayName: 'sunday',
                    name: workout[6].name,
                    exercises: workout[6].exercises,
                },
            }
        };

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }

        await axios.post('http://localhost:3001/workoutroutine/create', data, options)
            .then(() => {
                toast.success('Workout succesfully created 💪!');
                handleActiveForm();
            })
            .catch((error) => {
                if(error) {
                    if(error.response.status === 403) {
                        navigate('/login');
                        toast.error('Not logged in!');
                    }
                    if(error.error) {
                        setError(error.error);
                    }
                    else if(error.message) {
                        setError(error.message);
                    }
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className='create_workout_form_wrapper'>
            <CreateWorkoutTitle id='name' name='Name...' register={registerInfo}/>
            <CreateWorkoutDescription id='description' name='Description...' register={registerInfo} styles='create_workout_description'/>
            <h2>{error}</h2>
            <div className='days_wrapper'>
                {workout.map((day, dayIndex) => {
                    console.log(`day ${dayIndex}: ${day.exercises[0]}`);
                    return <CreateWorkoutDay handleEditExercise={handleEditExercise} handleAddExercise={handleAddExercise} handleChangeDayName={handleChangeDayName} handleRemoveExercise={handleRemoveExercise} day={day} dayIndex={dayIndex} key={dayIndex}/>
                }
                )}
            </div>
            <div className='create_workout_buttons_header'>
                <div className='create_workout_form_header_buttons'>
                    <CreateWorkoutHeaderButton onClick={saveToDB} title={!loading && 'Save'} icon={loading ? <ClipLoader className='workout_header_button_loader'/> : <FaSave className='workout_header_button_icon'/>} styles='create_workout_form_header_save_button'/>
                    <CreateWorkoutHeaderButton onClick={handleActiveForm} title='Cancel'  styles='create_workout_form_header_cancel_button'/>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkoutForm;