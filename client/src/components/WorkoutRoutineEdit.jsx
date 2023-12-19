import { useNavigate, useParams } from 'react-router-dom';
import '../Styles/workouts.css';
import '../Styles/inputs.css';
import '../Styles/buttons.css';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CreateWorkoutDescription from './inputs/CreateWorkoutDescription';
import CreateWorkoutDay from './CreateWorkoutDay';
import UtilityButton from './buttons/UtilityButton';
import { ClipLoader } from 'react-spinners';
import { FaSave } from "react-icons/fa";
import toast from 'react-hot-toast';

const WorkoutRoutineEdit = () => {

    const [currentWorkout, setCurrentWorkout] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const jwt = useSelector(state => state.token);
    const mode = useSelector(state => state.mode);
    const navigate = useNavigate();
    const {
        register,
        getValues,
        setValue,
        watch
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
        }
    })

    useEffect(() => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }

        const getWorkout = async () => {
            await axios.get(`https://workout-buddy-3j5n.onrender.com/workoutroutine/getWorkoutById/${id}`, options)
                .then((response) => {
                    const array = Object.values(response.data.workout.days);
                    setCurrentWorkout([...array]);
                    //setCurrentWorkout(response.data.workout);
                    setValue('title', response.data.workout.name);
                    setValue('description', response.data.workout.description);
                })
                .catch((error) => {
                    if(error.response.data.message) {
                        setError(error.response.data.message);
                        toast.error(error.response.data.message, { duration: 3000});
                    }
                    else {
                        setError(error.error);
                        toast.error(error.error , { duration: 3000});
                    }
                })
        }

        getWorkout();
    }, [id, jwt, setValue]);

    const handleChangeDayName = useCallback((dayIndex, name) => {
        setCurrentWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                name: name,
            }
            return updatedWorkout;
        })
    }, []);

    const handleAddExercise = useCallback((dayIndex, exercise) => {
        setCurrentWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                exercises: [...updatedWorkout[dayIndex].exercises, exercise]
            }
            return updatedWorkout;
        })
    }, []);

    const handleRemoveExercise = useCallback((dayIndex, itemIndex) => {
        setCurrentWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                exercises: updatedWorkout[dayIndex].exercises.filter((_, index) => index !== itemIndex)
            }
            return updatedWorkout;
        })
    }, []);

    const handleEditExercise = useCallback((dayIndex, editedExercise) => {
        setCurrentWorkout(prevWorkout => {
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
    }, []);

    const cancelEdit = () => {
        navigate(-1);
    }

    const saveToDB = async () => {
        setLoading(true);
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }

        const data = {
            name: getValues('title'),
            description: getValues('description'),
            days: {
                monday: {
                    dayName: 'monday',
                    name: currentWorkout[0].name,
                    exercises: currentWorkout[0].exercises,
                },
                tuesday: {
                    dayName: 'tuesday',
                    name: currentWorkout[1].name,
                    exercises: currentWorkout[1].exercises,
                },
                wednesday: {
                    dayName: 'wednesday',
                    name: currentWorkout[2].name,
                    exercises: currentWorkout[2].exercises,
                },
                thursday: {
                    dayName: 'thursday',
                    name: currentWorkout[3].name,
                    exercises: currentWorkout[3].exercises,
                },
                friday: {
                    dayName: 'friday',
                    name: currentWorkout[4].name,
                    exercises: currentWorkout[4].exercises,
                },
                saturday: {
                    dayName: 'saturday',
                    name: currentWorkout[5].name,
                    exercises: currentWorkout[5].exercises,
                },
                sunday: {
                    dayName: 'sunday',
                    name: currentWorkout[6].name,
                    exercises: currentWorkout[6].exercises,
                },
            }
        };

        await axios.patch(`https://workout-buddy-3j5n.onrender.com/workoutroutine/update/${id}`, data, options)
            .then(() => {
                navigate(-1);
                toast.success('Workout successfully edited!');
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className='workout_wrapper'>
            {
                currentWorkout.length > 0 && (
                    <>
                        <h1>Edit Workout</h1>
                        <input className={`create_workout_title_edit ${mode === 'light' ? 'light_input' : 'dark_input'}`} {...register('title')} defaultValue={watch('title')} placeholder={() => {
                            if(watch('title') === '') {
                                return 'Title...';
                            }
                        }}/>
                        <CreateWorkoutDescription id='description' name={() => {
                            if(watch('description') === '') {
                                return 'Description...';
                            }
                        }} register={register} defaultValue={watch('description')} styles='create_workout_description_edit'/>
                        <h2>{error}</h2>
                        <div className='days_wrapper'>
                            {currentWorkout.map((day, dayIndex) => {
                                return <CreateWorkoutDay handleEditExercise={handleEditExercise} handleAddExercise={handleAddExercise} handleChangeDayName={handleChangeDayName} handleRemoveExercise={handleRemoveExercise} day={day} dayIndex={dayIndex} key={dayIndex}/>
                            }
                            )}
                        </div>
                        <div className='create_workout_buttons_header'>
                            <div className='create_workout_form_header_buttons'>
                                <UtilityButton onClick={saveToDB} title={!loading && 'Save'} icon={loading ? <ClipLoader className='workout_header_button_loader'/> : <FaSave className='workout_header_button_icon'/>} styles='create_workout_form_header_save_button'/>
                                <UtilityButton onClick={cancelEdit} title='Cancel'  styles='create_workout_form_header_cancel_button'/>
                            </div>
                        </div>
                    </>
                )
            }
            
        </div>
    )
}

export default WorkoutRoutineEdit;