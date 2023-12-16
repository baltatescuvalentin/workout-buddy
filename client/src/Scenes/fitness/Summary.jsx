import { useSelector } from 'react-redux';
import '../../Styles/fitness.css';
import '../../Styles/workouts.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loader from '../../components/Loader';
import TableTracker from '../../components/TableTracker';
import NotLogged from '../../components/NotLogged';

const CustomTooltip = ({ active, payload, type }) => {

    const upperType = type[0].toUpperCase() + type.slice(1);

    if (active && payload && payload.length) {
      return (
        <div className='custom_tooltip'>
          <p><span>{`Date : ${payload[0].payload.date}`}</span></p>
          <p><span>{`${upperType}: ${payload[0].payload[type]}`}</span></p>
        </div>
      );
    }
  
    return null;
  };

const Summary = () => {

    const [loading, setLoading] = useState(false);
    const [bmi, setBmi] = useState([]);
    const [bodyFat, setBodyFat] = useState([]);
    const [waist, setWaist] = useState([]);
    const [weight, setWeight] = useState([]);
    const [caloriesIntake, setCaloriesIntake] = useState([]);
    const [caloriesBurned, setCaloriesBurned] = useState([]);
    const [tableValues, setTableValues] = useState(null);
    
    const user = useSelector(state => state.user);
    const jwt = useSelector(state => state.token);

    console.log(bmi);
    console.log(caloriesIntake);
    console.log(caloriesBurned);
    console.log(waist);
    console.log(waist.length);

    function hasKeys(input) {
        const result = input.some((element) => {
            const keys = Object.keys(element);
            return keys.length > 1;
        })

        return result;
    }

    const anyValidInput = () => {
        return hasKeys(bmi) === true || hasKeys(caloriesIntake) === true || hasKeys(caloriesBurned) === true
            || hasKeys(weight) === true || hasKeys(bodyFat) === true || hasKeys(waist);
    }

    

    console.log(tableValues);

    useEffect(() => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }

        const getTableData = async () => {

            if(!user) {
                return;
            }

            setLoading(true);

            await axios.get(`http://localhost:3001/tracker/getTrackerMetrics/${user._id}`, options) 
                .then((response) => {
                    setTableValues(response.data.metrics)
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        const fetchData = async () => {

            if(!user) {
                return;
            }

            setLoading(true);

            let BMIData = [];
            let bodyFatData = [];
            let waistData = [];
            let weightData = [];
            let neckData = [];
            let hipsData = [];
            let caloriesIntakeData = [];
            let caloriesBurnedData = [];

            await axios.get(`http://localhost:3001/tracker/getUserTrackers/${user._id}`, options)
                .then((response) => {
                    console.log(response.data);
                    const data = response.data.trackers;
                    data.forEach((element) => {
                        BMIData.push({
                            date: element.date,
                            ...(element?.BMI && {BMI: element.BMI})
                        })
                        weightData.push({
                            date: element.date,
                            ...(element?.weight && {weight: element.weight})
                        })
                        waistData.push({
                            date: element.date,
                            ...(element?.waist && {waist: element.waist})
                        })
                        hipsData.push({
                            date: element.date,
                            ...(element?.hips && {hips: element.hips})
                        })
                        neckData.push({
                            date: element.date,
                            ...(element?.neck && {neck: element.neck})
                        })
                        bodyFatData.push({
                            date: element.date,
                            ...(element?.bodyFat && {bodyFat: element.bodyFat})
                        })
                        caloriesBurnedData.push({
                            date: element.date,
                            ...(element.caloriesBurned.length > 0 && {
                                caloriesBurned: element.caloriesBurned.reduce((acc, cal) => {
                                    return acc + parseFloat(cal.calories);
                                }, 0)
                            })
                        })
                        caloriesIntakeData.push({
                            date: element.date,
                            ...(element.caloriesIntake.length > 0 && {
                                caloriesIntake: element.caloriesIntake.reduce((acc, cal) => {
                                    return acc + parseFloat(cal.calories);
                                }, 0)
                            })
                        })
                    })
                    setBmi(BMIData);
                    setBodyFat(bodyFatData);
                    setWaist(waistData);
                    setWeight(weightData);
                    setCaloriesBurned(caloriesBurnedData);
                    setCaloriesIntake(caloriesIntakeData);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        getTableData();
        fetchData();
    }, [jwt, user]);

    return (
        <div className='workout_wrapper'>
            <div className='workouts_create_wrapper'>
                <h1>Summary</h1>
                <p>
                    Here you can see a detailed way of your progress over time. The data you tracked we used it to show
                    in an easy way to understand your evolution though-out all your journey. We give you charts and a table
                    so based on them you can draw a conclusion.
                </p>
                <p>
                    0 values in the table mean you did not track that metrics at all.
                </p>
                {
                    !user ? <NotLogged /> :
                        loading ? <Loader divStyle='pages_loader' size={42} color='#488eff'/> : (
                            <>
                                { anyValidInput() === false ? 
                                    <div>
                                        <p>If you do not see any charts that means you have not tacked a day yet.
                                            Start tracking and later check for some data.
                                        </p>
                                    </div> : (
                                    <>
                                        <TableTracker tableValues={tableValues}/> 
                                        {
                                            hasKeys(weight) === true && (
                                                <div className='summary_charts_wrapper'>
                                                    <h2>Weight</h2>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <LineChart 
                                                            fill='#FFB948'
                                                            width="100%"
                                                            height={300}
                                                            data={weight}
                                                            margin={{
                                                                top: 0,
                                                                right: 0,
                                                                left: -25,
                                                                bottom: 0,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="none" stroke='red' />
                                                            <XAxis dataKey="date" hide={true}/>
                                                            <YAxis />
                                                            <Tooltip content={<CustomTooltip type='weight'/>}/>
                                                            <Line connectNulls type="monotone" dataKey="weight" stroke="#488eff" fill="#488eff"/>
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            )
                                        }
                                        {
                                            hasKeys(bmi) === true && (
                                                <div className='summary_charts_wrapper'>
                                                    <h2>BMI</h2>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <LineChart 
                                                            fill='#FFB948'
                                                            width="100%"
                                                            height={300}
                                                            data={bmi}
                                                            margin={{
                                                                top: 0,
                                                                right: 0,
                                                                left: -25,
                                                                bottom: 0,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="none" stroke='red' />
                                                            <XAxis dataKey="date" hide={true}/>
                                                            <YAxis />
                                                            <Tooltip content={<CustomTooltip type='BMI'/>}/>
                                                            <Line connectNulls type="monotone" dataKey="BMI" stroke="#488eff" fill="#488eff"/>
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            )
                                        }
                                        {
                                            hasKeys(bodyFat) === true && (
                                                <div className='summary_charts_wrapper'>
                                                    <h2>Body Fat %</h2>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <LineChart 
                                                            fill='#FFB948'
                                                            width="100%"
                                                            height={300}
                                                            data={bodyFat}
                                                            margin={{
                                                                top: 0,
                                                                right: 0,
                                                                left: -25,
                                                                bottom: 0,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="none" stroke='red' />
                                                            <XAxis dataKey="date" hide={true}/>
                                                            <YAxis />
                                                            <Tooltip content={<CustomTooltip type='bodyFat'/>}/>
                                                            <Line connectNulls type="monotone" dataKey="bodyFat" stroke="#488eff" fill="#488eff"/>
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            )
                                        }
                                        {
                                            hasKeys(caloriesIntake) === true && (
                                                <div className='summary_charts_wrapper'>
                                                    <h2>Calories Intake</h2>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <LineChart 
                                                            fill='#FFB948'
                                                            width="100%"
                                                            height={300}
                                                            data={caloriesIntake}
                                                            margin={{
                                                                top: 0,
                                                                right: 0,
                                                                left: -10,
                                                                bottom: 0,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="none" stroke='red' />
                                                            <XAxis dataKey="date" hide={true}/>
                                                            <YAxis />
                                                            <Tooltip content={<CustomTooltip type='caloriesIntake'/>}/>
                                                            <Line connectNulls type="monotone" dataKey="caloriesIntake" stroke="#488eff" fill="#488eff"/>
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            )
                                        }
                                        {
                                            hasKeys(caloriesBurned) === true && (
                                                <div className='summary_charts_wrapper'>
                                                    <h2>Calories Burned</h2>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <LineChart 
                                                            fill='#FFB948'
                                                            width="100%"
                                                            height={300}
                                                            data={caloriesBurned}
                                                            margin={{
                                                                top: 0,
                                                                right: 0,
                                                                left: -10,
                                                                bottom: 0,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="none" stroke='red' />
                                                            <XAxis dataKey="date" hide={true}/>
                                                            <YAxis />
                                                            <Tooltip content={<CustomTooltip type='caloriesBurned'/>}/>
                                                            <Line connectNulls type="monotone" dataKey="caloriesBurned" stroke="#488eff" fill="#488eff"/>
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            )
                                        }
                                        {
                                            hasKeys(waist) === true && (
                                                <div className='summary_charts_wrapper'>
                                                    <h2>Waist</h2>
                                                    <ResponsiveContainer width="100%" height={300}>
                                                        <LineChart 
                                                            fill='#FFB948'
                                                            width="100%"
                                                            height={300}
                                                            data={waist}
                                                            margin={{
                                                                top: 0,
                                                                right: 0,
                                                                left: -25,
                                                                bottom: 0,
                                                            }}
                                                        >
                                                            <CartesianGrid strokeDasharray="none" stroke='red' />
                                                            <XAxis dataKey="date" hide={true}/>
                                                            <YAxis />
                                                            <Tooltip content={<CustomTooltip type='waist'/>}/>
                                                            <Line connectNulls type="monotone" dataKey="waist" stroke="#488eff" fill="#488eff"/>
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            )
                                        }
                                    </>
                                )}
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Summary;