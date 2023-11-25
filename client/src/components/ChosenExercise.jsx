import '../Styles/workouts.css';

const ChosenExercise = ({exercise, wrapper_styling, instructions_styling}) => {
    return (
        <div className={`${wrapper_styling}`}>
            <h2>{exercise.name}</h2>
            <p>Target: <span>{exercise.target}</span></p>
            <p>Secondary target: {exercise.secondaryTarget.map((target) => {
                return <span key={target}>{target} </span>
            })}</p>
            <p>Equipment: <span>{exercise.equipment}</span></p>
            <div className={`${instructions_styling}`}>
                <div>
                    {exercise.instructions.map((instr, index) => {
                        return <p key={index}>{index+1}. {instr}</p>
                    })}
                </div>
                <img src={exercise.gifUrl} alt="Exercise instruction" loading='lazy'/>
            </div>
        </div>
    )
}

export default ChosenExercise;