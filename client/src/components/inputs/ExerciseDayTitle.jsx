import '../../Styles/inputs.css';

const ExerciseDayTitle = ({id, register}) => {
    return (
        <input className='create_exercise_day_title' id={id} {...register(id)} placeholder='What are you working today?...'/>
    )
}

export default ExerciseDayTitle;