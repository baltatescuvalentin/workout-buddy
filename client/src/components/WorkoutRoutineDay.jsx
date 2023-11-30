import { useState } from 'react';
import '../Styles/workouts.css';
import { useLocation, useNavigate } from 'react-router-dom';

const WorkoutRoutineDay = ({day, workoutId}) => {

    const [details, setDetails] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const click = () => {
        navigate(`${location.pathname}/${workoutId}/${day.dayName}`);
    }

    return (
        <div className='day_wrapper'>
            <h2>{day.name}</h2>
            <button onClick={click}>
                go
            </button>
        </div>
    )
}

export default WorkoutRoutineDay;