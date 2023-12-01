import { useState } from 'react';
import '../Styles/workouts.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaRegTrashAlt, FaEdit } from "react-icons/fa";


const WorkoutRoutineDay = ({day, workoutId}) => {

    const [details, setDetails] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const goToDay = () => {
        navigate(`${location.pathname}/${workoutId}/${day.dayName}`);
    }

    return (
        <div className='day_wrapper'>
            <div className='day_header'>
                <p className='day_title'>{day.dayName} {day.name && `(${day.name})`}</p>
                <div className='day_header_buttons'>

                </div>
            </div>
            
        </div>
    )
}

export default WorkoutRoutineDay;