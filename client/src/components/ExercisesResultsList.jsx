import '../Styles/workouts.css';

const ExercisesResultsList = ({exercises, setChosenExercise, styling}) => {

    console.log(exercises);
    
    return (
        <div className={`${styling}`}>
            {exercises.map((exercise) => {
                return <p key={exercise._id} onClick={() => setChosenExercise(exercise)}>{exercise.name}</p>
            })}
        </div>
    )
}

export default ExercisesResultsList;