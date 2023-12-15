import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
//import 'react-calendar/dist/Calendar.css';
import '../../Styles/fitness.css';
import '../../Styles/workouts.css';
import '../../Styles/styles.css';
import '../../Styles/MyCalendar.css';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import BodyMeasurementTracker from '../../components/trackers/BodyMeasurementTracker';
import WHRTracker from '../../components/trackers/WHRTracker';
import BMITracker from '../../components/trackers/BMITracker';
import BodyFatTracker from '../../components/trackers/BodyFatTracker';
import CaloriesIntake from '../../components/trackers/CaloriesIntake';
import CaloriesBurned from '../../components/trackers/CaloriesBurned';
import UtilityButton from '../../components/buttons/UtilityButton';
import axios from 'axios';
import Loader from '../../components/Loader';
import NotLogged from '../../components/NotLogged';

const Tracker = () => {

    const [chosenDate, setChosenDate] = useState(null);
    const [trackedDates, setTrackedDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tracker, setTracker] = useState(null);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(0);
    const user = useSelector(state => state.user);
    const mode = useSelector(state => state.mode);
    const jwt = useSelector(state => state.token);

    console.log('dates');
    console.log(trackedDates);

    const {
        register,
        setValue,
        getValues,
        watch,
    } = useForm({
        defaultValues: {
            weight: 0,
            hips: 0,
            neck: 0,
            waist: 0,
            bodyFat: 0,
            BMI: 0,
            WHR: 0,
        }
    });

    //const dates = ['2023-12-23', '2023-12-18'];

    console.log(chosenDate);
    console.log(tracker);

    const onChange = (nextValue) => {
        const formatted = format(nextValue, 'yyyy-MM-dd');
        setChosenDate(formatted);
        getDateTracker(formatted);
        setTracker(null);
    }

    // const formattedSpecialDates = dates.map(dateString => {
    //     const date = new Date(dateString);
    //     return format(date, 'yyyy-MM-dd');
    //   });

    const tileClassName = ({date}) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
    
        if(trackedDates.includes(formattedDate)) {
            return 'tileclass_test';
        }
        return '';
    }

    const getDateTracker = async (date) => {
        setLoading(true);
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }

        await axios.get(`http://localhost:3001/tracker/getTrackerByDay/${date}`, options)
            .then((response) => {
                setTracker(response.data.tracker);
                console.log(response.data.tracker?.BMI);
                setValue('BMI', response.data.tracker?.BMI || 0);
                setValue('bodyFat', response.data.tracker?.bodyFat || 0);
                setValue('WHR', response.data.tracker?.WHR || 0);
                setValue('hips', response.data.tracker?.hips || 0);
                setValue('neck', response.data.tracker?.neck || 0);
                setValue('waist', response.data.tracker?.waist || 0);
                setValue('weight', response.data.tracker?.weight || 0);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const deleteDay = async (dayId) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }

        await axios.delete(`http://localhost:3001/tracker/deleteTracker/${dayId}`, options)
            .then(() => {
                setTracker(null);
                setRefresh(prev => prev + 1);
            }) 
            .catch((error) => {
                console.log(error);
            })
    }

    const createTracker = async () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }

        const data = {
            date: chosenDate,
            userId: user._id,
        }

        await axios.post(`http://localhost:3001/tracker/createTracker`, data, options)
            .then((response) => {
                setTracker(response.data.tracker);
                setRefresh(prev => prev + 1);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const editTracker = async (id, field, data) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }

        const content = {
            field: field,
            data: data,
        }

        await axios.patch(`http://localhost:3001/tracker/updateTracker/${id}`, content, options)
            .then((response) => {
                setTracker(response.data.tracker);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deleteFromTracker = async (userId, field) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }
        
        const data = {
            userId: userId,
            field: field,
        }

        await axios.patch(`http://localhost:3001/tracker/removeFieldFromTracker`, data, options)
            .then((response) => {
                console.log(response.data.updated);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }

        const fetchData = async () => {

            if(!user) {
                return;
            }

            await axios.get(`http://localhost:3001/tracker/getTrackedDates/${user._id}`, options)
                .then((resposne) => {
                    const dates = [...resposne.data.dates];
                    const actualDates = dates.map((date) => date.date);
                    setTrackedDates([...actualDates]);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        fetchData();
    }, [refresh, jwt, user]);

    return (
        <div className='workout_wrapper'>
            <div className='workouts_create_wrapper'>
                <h1>Fitness Tracker</h1>
                <p>
                    This tool is perfect for your workout journey. <span>Workout Buddy</span> helps you to track your daily
                    changes and activities. You can check your past logs at any moment and the more you add the Summary
                    will give you better charts and statistics so you can be proud of yourself for all the effort you
                    made!
                </p>
                <p>
                    Keep in mind that you need to use the metric system cause this is the way the tools use the data to give
                    you feedback. That means centimeters, kilograms etc.
                </p>
                <p>
                    To start tracking all you need to do is select a date from the <span>Calendar</span> and 
                    press the button to make the day being tracked in the database. Dates tracked are colored green in
                     the calendar.
                </p>
                <div className='mycalendar_wrapper'>
                    <div className={`${mode === 'light' ? 'light_calendar' : 'dark_calendar'}`}>
                        <Calendar 
                            value={chosenDate}
                            onChange={onChange}
                            tileClassName={tileClassName}
                        />
                    </div>
                </div>
                
                {
                    !user ? <NotLogged /> :
                        loading ? <Loader divStyle='pages_loader' size={42} color='#488eff'/>
                            : (!tracker && chosenDate) ? (
                                <div className='tracker_track_message_wrapper'>
                                    <UtilityButton onClick={createTracker} title='Start Tracking' styles='tracker_track_button '/>
                                </div>
                            )
                            : tracker ? (
                                <div className='tracker_content_wrapper'>
                                    <h1>{format(new Date(chosenDate), 'EEEE, do MMM yyyy')}</h1>
                                    <h3>{error}</h3>
                                    <div className='trackers_wrapper'>
                                        <h2>Body measurements</h2>
                                        <div className='trackers_body_measurements'>
                                            <BodyMeasurementTracker deleteFromTracker={(field) => deleteFromTracker(user._id, field)} saveToTracker={() => editTracker(tracker._id, 'weight', getValues('weight'))} setValue={setValue} title='Weight' metric='kgs' id='weight' register={register} value={watch('weight')}/>
                                            <BMITracker id='BMI' deleteFromTracker={(field) => deleteFromTracker(user._id, field)} saveToTracker={() => editTracker(tracker._id, 'BMI', getValues('BMI'))} register={register} getValues={getValues} setValue={setValue} value={watch('BMI')} watch={watch}/>
                                            <BodyFatTracker id='bodyFat' deleteFromTracker={(field) => deleteFromTracker(user._id, field)} saveToTracker={() => editTracker(tracker._id, 'bodyFat', getValues('bodyFat'))} register={register} getValues={getValues} setValue={setValue} value={watch('bodyFat')} watch={watch}/>
                                            <BodyMeasurementTracker deleteFromTracker={(field) => deleteFromTracker(user._id, field)} saveToTracker={() => editTracker(tracker._id, 'hips', getValues('hips'))} setValue={setValue} title='Hips' metric='cm' id='hips' register={register} value={watch('hips')}/>
                                            <BodyMeasurementTracker deleteFromTracker={(field) => deleteFromTracker(user._id, field)} saveToTracker={() => editTracker(tracker._id, 'waist', getValues('waist'))} setValue={setValue} title='Waist' metric='cm' id='waist' register={register} value={watch('waist')}/>
                                            <WHRTracker id='WHR' deleteFromTracker={(field) => deleteFromTracker(user._id, field)} saveToTracker={() => editTracker(tracker._id, 'WHR', getValues('WHR'))} register={register} getValues={getValues} setValue={setValue} value={watch('WHR')} watch={watch}/>
                                            <BodyMeasurementTracker deleteFromTracker={(field) => deleteFromTracker(user._id, field)} saveToTracker={() => editTracker(tracker._id, 'neck', getValues('neck'))} setValue={setValue} title='Neck' metric='cm' id='neck' register={register} value={watch('neck')}/>
                                        </div>
                                        <h2>Calories</h2>
                                        <div className='trackers_calories'>
                                            <CaloriesIntake saveToTracker={(data) => editTracker(tracker._id, 'caloriesIntake', data)} calsArray={tracker?.caloriesIntake}/>
                                            <CaloriesBurned saveToTracker={(data) => editTracker(tracker._id, 'caloriesBurned', data)} calsArray={tracker?.caloriesBurned}/>
                                        </div>
                                    </div>
                                    <div className='tracker_delete_wrapper'>
                                        <UtilityButton onClick={() => deleteDay(tracker._id)} title='Delete' styles='create_workout_form_header_cancel_button'/>
                                    </div>
                                </div>) : <></>
                }
            </div>
        </div>
    )
}

export default Tracker;