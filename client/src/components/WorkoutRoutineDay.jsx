import { useState } from 'react';
import '../Styles/workouts.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import ExpandButton from './buttons/ExpandButton';
import UtilityButton from './buttons/UtilityButton';
import WorkoutExercise from './WorkoutExercise';

const WorkoutRoutineDay = ({day, workoutId}) => {

    const [details, setDetails] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const showDetails = () => {
        setDetails(prev => !prev);
    }

    const goToDay = () => {
        navigate(`${location.pathname}/${workoutId}/${day.dayName}`);
    }

    return (
        <div className='day_wrapper'>
            <div className='day_header'>
                <p className='day_title'>{day.dayName} {day.name && `(${day.name})`}</p>
                <div className='day_header_buttons'>
                    <UtilityButton onClick={goToDay} icon={<FaEye className='day_header_button_icon'/>} styles='add_exercise_to_day_button'/>
                    <ExpandButton onClick={showDetails} btnStyles='expand_button' iconStyles='day_header_button_icon'/>
                </div>
            </div>
            {
                details && (
                    day.exercises.map((exercise, index) => {
                        return <WorkoutExercise exercise={exercise} key={index} shouldEdit={false}/>
                    })
                )
            }
        </div>
    )
}

export default WorkoutRoutineDay;