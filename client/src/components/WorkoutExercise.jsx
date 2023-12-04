import { useState } from 'react';
import '../Styles/workouts.css';
import WorkoutExerciseEdit from './WorkoutExerciseEdit';
import WorkoutExerciseDetails from './WorkoutExerciseDetails';

const WorkoutExercise = ({exercise, handleEditExercise, handleRemoveExercise, shouldEdit}) => {

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(prev => !prev);
    }

    console.log(exercise);

    if(shouldEdit === false) {
        return <WorkoutExerciseDetails exercise={exercise} handleRemoveExercise={handleRemoveExercise} handleEdit={handleEdit} shouldEdit={shouldEdit}/>
    }

    return (
        <div>
            {edit ? <WorkoutExerciseEdit handleEditExercise={handleEditExercise} exercise={exercise} handleRemoveExercise={handleRemoveExercise} handleEdit={handleEdit}/> : <WorkoutExerciseDetails exercise={exercise} handleRemoveExercise={handleRemoveExercise} handleEdit={handleEdit}/>}
        </div>
    )
}

export default WorkoutExercise;