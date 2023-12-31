import '../../Styles/inputs.css';

const ExerciseDayTitle = ({id, register, text}) => {
    return (
        <input defaultValue={text} className='create_exercise_day_title' id={id} {...register(id)} placeholder='What are you working today?...'/>
    )
}

export default ExerciseDayTitle;