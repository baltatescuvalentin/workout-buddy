import { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
//import 'react-calendar/dist/Calendar.css';
import '../../Styles/fitness.css';
import '../../Styles/workouts.css';
import '../../Styles/MyCalendar.css';
import { useSelector } from 'react-redux';
import { get, useForm } from 'react-hook-form';
import BodyMeasurementTracker from '../../components/trackers/BodyMeasurementTracker';
import WHRTracker from '../../components/trackers/WHRTracker';
import BMITracker from '../../components/trackers/BMITracker';
import BodyFatTracker from '../../components/trackers/BodyFatTracker';
import CaloriesIntake from '../../components/trackers/CaloriesIntake';
import CaloriesBurned from '../../components/trackers/CaloriesBurned';

const Tracker = () => {

    const [value, setValues] = useState(null);
    const mode = useSelector(state => state.mode);
    const stats = null;

    const {
        register,
        setValue,
        getValues,
        watch,
    } = useForm({
        defaultValues: {
            weight: stats?.weight || 0,
            hips: stats?.hips || 0,
            waist: stats?.waist || 0,
            bodyFat: stats?.bodyFat || 0,
            BMI: stats?.BMI || 0,
            WHR: stats?.WHR || 0,

        }
    })

    const dates = ['2023-12-23', '2023-12-18'];

    console.log(value);

    const onChange = (nextValue) => {
        const formatted = format(nextValue, 'yyyy-MM-dd');
        setValues(formatted);
    }

    // const formattedSpecialDates = dates.map(dateString => {
    //     const date = new Date(dateString);
    //     return format(date, 'yyyy-MM-dd');
    //   });

    const tileClassName = ({date}) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
    
        if(dates.includes(formattedDate)) {
            return 'tileclass_test';
        }
        return '';
    }

    return (
        <div className='workout_wrapper'>
            <div className='workouts_create_wrapper'>
                <h1>Fitness Tracker</h1>
                <p>
                    This tool is perct for your workout journey. <span>Workout Buddy</span> helps you to track your daily
                    changes and activities. You can check your past logs at any moment and the more you add the Summary
                    will give you better charts and statistics so you can be proud of yourself for all the effort you
                    made!
                </p>
                <p>
                    Keep in mind that you need to use the metric system cause this is the way the tools use the data to give
                    you feedback. That means centimiters, kilograms etc.
                </p>
                <div className='mycalendar_wrapper'>
                    <div className={`${mode === 'light' ? 'light_calendar' : 'dark_calendar'}`}>
                        <Calendar 
                            value={value}
                            onChange={onChange}
                            tileClassName={tileClassName}
                        />
                    </div>
                </div>
                <div className='trackers_wrapper'>
                    <div className='trackers_wrapper'>
                        <h2>Body measurements</h2>
                        <div className='trackers_body_measurements'>
                            <BodyMeasurementTracker title='Weight' metric='kgs' id='weight' register={register} value={watch('weight')}/>
                            <BodyMeasurementTracker title='Hips' metric='cm' id='hips' register={register} value={watch('hips')}/>
                            <BodyMeasurementTracker title='Waist' metric='cm' id='waist' register={register} value={watch('waist')}/>
                            <WHRTracker id='WHR' register={register} getValues={getValues} setValue={setValue} value={watch('WHR')} watch={watch}/>
                            <BMITracker id='BMI' register={register} getValues={getValues} setValue={setValue} value={watch('BMI')} watch={watch}/>
                            <BodyFatTracker id='bodyFat' register={register} getValues={getValues} setValue={setValue} value={watch('bodyFat')} watch={watch}/>
                        </div>
                        <h2>Calories</h2>
                        <div className='trackers_calories'>
                            <CaloriesIntake />
                            <CaloriesBurned />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tracker;