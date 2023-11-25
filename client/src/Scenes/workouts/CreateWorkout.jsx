import '../../Styles/workouts.css';
import { useState } from 'react';
import CreateWorkoutButton from '../../components/buttons/CreateWorkoutButton';
import CreateWorkoutForm from '../../components/CreateWorkoutForm';

const CreateWorkout = () => {

    const [activeCreate, setActiveCreate] = useState(false);

    const handleActiveForm = () => {
        setActiveCreate(prev => !prev);
    }

    return (
        <div className='workout_wrapper'>
            <div className='workouts_create_wrapper'>
                <h1>
                    Create a workout
                </h1>
                <p>
                    Your journey becoming a better you started when you thought about it, now it's time to put that in practice.
                    Now let <span>Workout Buddy</span> help you in creating the workout routine you like.
                </p>
                <p>
                    Choose from the
                    vast variety of exercises the platform makes available to you and organize your week however you like,
                    we give you the freedom!
                </p>
                <CreateWorkoutButton activeCreate={activeCreate} handleActiveForm={handleActiveForm}/>

                {activeCreate && <CreateWorkoutForm handleActiveForm={handleActiveForm}/>}
            </div>
        </div>  
    )
}

export default CreateWorkout;