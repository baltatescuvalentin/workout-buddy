import { useFieldArray, useForm } from 'react-hook-form';
import '../Styles/workouts.css';
import CreateWorkoutTitle from './inputs/CreateWorkoutTitle';
import CreateWorkoutDescription from './inputs/CreateWorkoutDescription';
import CreateWorkoutHeaderButton from './buttons/UtilityButton';
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import CreateWorkoutDay from './CreateWorkoutDay';


const CreateWorkoutForm = ({handleActiveForm}) => {

    const {
        handleSubmit: handleSubmitInfo,
        register: registerInfo,
        reset: resetInfo,

    } = useForm({
        defaultValues: {
            name: '',
            description: ''
        }
    })

    const {
        register: registerDays,
        handleSubmit: handleSubmitDays,
        setValue: setValueDays,
        getValues: getValuesDays,
        control,
        reset: resetDays,
    } = useForm({
        defaultValues: {
            days: [
                { dayName: 'Monday', items: [] },
                { dayName: 'Tuesday', items: [] },
                { dayName: 'Wednesday', items: [] },
                { dayName: 'Thursday', items: [] },
                { dayName: 'Friday', items: [] },
                { dayName: 'Saturday', items: [] },
                { dayName: 'Sunday', items: [] },
              ],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'days',
    });

    const handleAddExercise = (dayIndex, exercise) => {
        const currentDays = getValuesDays('days');
        currentDays[dayIndex].items.push(exercise);
        setValueDays('days', currentDays);
    }

    const handleRemoveExercise = (dayIndex, exerciseIndex) => {
        const currentDays = getValuesDays('days');
        const filteredDays = currentDays[dayIndex].items.filter((exercise, index) => index !== exerciseIndex);
        setValueDays('days', filteredDays);
    }

    return (
        <div className='create_workout_form_wrapper'>
            <CreateWorkoutTitle id='name' name='Name...' register={registerInfo}/>
            <CreateWorkoutDescription id='description' name='Description...' register={registerInfo} />
            <div className='days_wrapper'>
                {fields.map((day, dayIndex) => (
                    <CreateWorkoutDay day={day} dayIndex={dayIndex} key={dayIndex}/>
                ))}
            </div>
            <div className='create_workout_buttons_header'>
                <div className='create_workout_form_header_buttons'>
                    <CreateWorkoutHeaderButton title='Save' icon={<FaSave className='workout_header_button_icon'/>} styles='create_workout_form_header_save_button'/>
                    <CreateWorkoutHeaderButton onClick={handleActiveForm} title='Cancel'  styles='create_workout_form_header_cancel_button'/>
                </div>
            </div>
        </div>
    )
}

export default CreateWorkoutForm;