import { useFieldArray, useForm } from 'react-hook-form';
import '../Styles/workouts.css';
import CreateWorkoutTitle from './inputs/CreateWorkoutTitle';
import CreateWorkoutDescription from './inputs/CreateWorkoutDescription';
import CreateWorkoutHeaderButton from './buttons/UtilityButton';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import CreateWorkoutDay from './CreateWorkoutDay';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateWorkoutForm = ({handleActiveForm}) => {

    const [workout, setWorkout] = useState([
        { dayName: 'Monday', name: '', items: [] },
        { dayName: 'Tuesday', name: '', items: [] },
        { dayName: 'Wednesday', name: '', items: [] },
        { dayName: 'Thursday', name: '', items: [] },
        { dayName: 'Friday', name: '', items: [] },
        { dayName: 'Saturday', name: '', items: [] },
        { dayName: 'Sunday', name: '', items: [] },
    ]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const jwt = useSelector(state => state.token);

    const {
        handleSubmit: handleSubmitInfo,
        register: registerInfo,
        reset: resetInfo,
        getValues,
    } = useForm({
        defaultValues: {
            name: '',
            description: ''
        }
    })

    // const {
    //     register: registerDays,
    //     handleSubmit: handleSubmitDays,
    //     setValue: setValueDays,
    //     getValues: getValuesDays,
    //     control,
    //     reset: resetDays,
    // } = useForm({
    //     defaultValues: {
    //         days: [
    //             { dayName: 'Monday', name: '', items: [] },
    //             { dayName: 'Tuesday', name: '', items: [] },
    //             { dayName: 'Wednesday', name: '', items: [] },
    //             { dayName: 'Thursday', name: '', items: [] },
    //             { dayName: 'Friday', name: '', items: [] },
    //             { dayName: 'Saturday', name: '', items: [] },
    //             { dayName: 'Sunday', name: '', items: [] },
    //           ],
    //     }
    // });

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'days',
    // });

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
                items: [...updatedWorkout[dayIndex].items, exercise]
            }
            return updatedWorkout;
        })
    }

    const handleRemoveExercise = (dayIndex, itemIndex) => {
        setWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                items: updatedWorkout[dayIndex].items.filter((_, index) => index !== itemIndex)
            }
            return updatedWorkout;
        })
    }

    const handleEditExercise = (dayIndex, editedExercise) => {
        setWorkout(prevWorkout => {
            const updatedWorkout = [...prevWorkout];
            updatedWorkout[dayIndex] = {
                ...updatedWorkout[dayIndex],
                items: updatedWorkout[dayIndex].items.map((exercise) => {
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
            monday: {
                name: workout[0].name,
                exercises: workout[0].items,
            },
            tuesday: {
                name: workout[1].name,
                exercises: workout[1].items,
            },
            wednesday: {
                name: workout[2].name,
                exercises: workout[2].items,
            },
            thursday: {
                name: workout[3].name,
                exercises: workout[3].items,
            },
            friday: {
                name: workout[4].name,
                exercises: workout[4].items,
            },
            saturday: {
                name: workout[5].name,
                exercises: workout[5].items,
            },
            sunday: {
                name: workout[6].name,
                exercises: workout[6].items,
            },
        };

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }

        axios.post('http://localhost:3001/workoutroutine/create', data, options)
            .then(() => {
                toast.success('Workout succesfully created 💪!');
                handleActiveForm();
            })
            .catch((error) => {
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
            })
            .finally(() => {
                setLoading(false);
            })
    }

    // const handleAddTitle = (dayIndex, title) => {
    //     const currentDays = getValuesDays('days');
    //     currentDays[dayIndex].name = title;
    //     setValueDays('days', currentDays);
    // }

    // const handleAddExercise = (dayIndex, exercise) => {
    //     const currentDays = getValuesDays('days');
    //     currentDays[dayIndex].items.push(exercise);
    //     setValueDays('days', currentDays);
    // }

    // const handleRemoveExercise = (dayIndex, exerciseIndex) => {
    //     const currentDays = getValuesDays('days');
    //     const filteredDays = currentDays[dayIndex].items.filter((exercise, index) => index !== exerciseIndex);
    //     setValueDays('days', filteredDays);
    // }

    console.log(workout)

    return (
        <div className='create_workout_form_wrapper'>
            <CreateWorkoutTitle id='name' name='Name...' register={registerInfo}/>
            <CreateWorkoutDescription id='description' name='Description...' register={registerInfo} />
            <h2>{error}</h2>
            <div className='days_wrapper'>
                {workout.map((day, dayIndex) => {
                    console.log(`day ${dayIndex}: ${day.items[0]}`);
                    return <CreateWorkoutDay handleEditExercise={handleEditExercise} handleAddExercise={handleAddExercise} handleChangeDayName={handleChangeDayName} handleRemoveExercise={handleRemoveExercise} day={day} dayIndex={dayIndex} key={dayIndex}/>
                }
                )}
            </div>
            <div className='create_workout_buttons_header'>
                <div className='create_workout_form_header_buttons'>
                    <CreateWorkoutHeaderButton onClick={saveToDB} title={!loading && 'Save'} icon={loading ? <ClipLoader workout_header_button_loader/> : <FaSave className='workout_header_button_icon'/>} styles='create_workout_form_header_save_button'/>
                    <CreateWorkoutHeaderButton onClick={handleActiveForm} title='Cancel'  styles='create_workout_form_header_cancel_button'/>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkoutForm;