import { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
//import 'react-calendar/dist/Calendar.css';
import '../../Styles/fitness.css';
import '../../Styles/workouts.css';
import '../../Styles/MyCalendar.css';
import { useSelector } from 'react-redux';

const Tracker = () => {

    const [value, setValue] = useState(null);
    const mode = useSelector(state => state.mode);

    const dates = ['2023-12-23', '2023-12-18'];

    console.log(value);

    const onChange = (nextValue) => {
        const formatted = format(nextValue, 'yyyy-MM-dd');
        setValue(formatted);
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
                <div className='mycalendar_wrapper'>
                    <div className={`${mode === 'light' ? 'light_calendar' : 'dark_calendar'}`}>
                        <Calendar 
                            value={value}
                            onChange={onChange}
                            tileClassName={tileClassName}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tracker;