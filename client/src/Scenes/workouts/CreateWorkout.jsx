import { useFieldArray, useForm } from 'react-hook-form';
import '../../Styles/workouts.css';

const CreateWorkout = () => {

    const { register, handleSubmit, setValue, getValues, control} = useForm({
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
    })

    return (
        <div className='workout_wrapper'>

        </div>
    )
}

export default CreateWorkout;