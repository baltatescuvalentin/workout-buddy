import '../Styles/workouts.css';

const ExercisesResultsList = ({exercises, setChosenExercise, styling}) => {

    console.log(exercises);
    
    return (
        <div className={`${styling}`}>
            {exercises.map((exercise) => {
                return <p onClick={() => setChosenExercise(exercise)} key={exercise._id}>{exercise.name}</p>
            })}
        </div>
    )
}

export default ExercisesResultsList;