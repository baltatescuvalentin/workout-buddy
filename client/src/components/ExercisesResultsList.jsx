import '../Styles/workouts.css';

const ExercisesResultsList = ({exercises, setChosenExercise}) => {

    console.log(exercises);
    
    return (
        <div className="exercises_results_list">
            {exercises.map((exercise) => {
                return <p onClick={() => setChosenExercise(exercise)} key={exercise.id}>{exercise.name}</p>
            })}
        </div>
    )
}

export default ExercisesResultsList;