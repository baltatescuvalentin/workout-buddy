import { useEffect, useState } from 'react';
import '../Styles/workouts.css';
import ChooseWorkoutExercise from './ChooseWorkoutExercise';
import UtilityButton from './buttons/UtilityButton';
import { FaPlus } from "react-icons/fa";
import ExpandButton from './buttons/ExpandButton';
import ExerciseDayTitle from './inputs/ExerciseDayTitle';
import { useForm } from 'react-hook-form';
import WorkoutExercise from './WorkoutExercise';

const CreateWorkoutDay = ({handleEditExercise, handleAddExercise, handleRemoveExercise, handleChangeDayName, day, dayIndex}) => {

    const [openFind, setOpenFind] = useState(false);
    const [expand, setExpand] = useState(false);
    const {
        register,
        getValues,
        watch,
    } = useForm({
        defaultValues: {
            title: day.name || '',
        }
    });

    useEffect(() => {
        console.log(getValues('title'));
        handleChangeDayName(dayIndex, getValues('title'));
    }, [watch('title')])

    const handleOpenFind = () => {
        setOpenFind(true);
    }

    const handleCloseFind = () => {
        setOpenFind(false);
    }

    const handleExpand = () => {
        setExpand(prev => !prev);
    }

    console.log(day.exercises);

    return (
        <div className='day_wrapper'>
            <div className='day_header'>
                <h2>{day.dayName}</h2>
                <div className='day_header_buttons'>
                    {!openFind && <UtilityButton onClick={handleOpenFind} icon={<FaPlus className='day_header_button_icon'/>} styles='add_exercise_to_day_button'/>}
                    <ExpandButton onClick={handleExpand} btnStyles='expand_button' iconStyles='day_header_button_icon'/>
                </div>
            </div>
            {openFind && <ChooseWorkoutExercise handleExpand={handleExpand} handleCloseFind={handleCloseFind} handleAddExercise={handleAddExercise} dayIndex={dayIndex}/>}
            {expand && (
                <>
                    <ExerciseDayTitle text={watch('title')} id='title' register={register}/>
                    {day.exercises.length !== 0 && day.exercises.map((exercise, index) => {
                        console.log(exercise);
                        return <WorkoutExercise handleEditExercise={(exercise) => handleEditExercise(dayIndex, exercise)} handleRemoveExercise={() => handleRemoveExercise(dayIndex, index)} exercise={exercise} key={index}/>
                    })}
                </>
            )}
        </div>
    )
}

export default CreateWorkoutDay;