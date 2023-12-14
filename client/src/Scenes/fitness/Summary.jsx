import { useSelector } from 'react-redux';
import '../../Styles/fitness.css';
import '../../Styles/workouts.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../components/Loader';
import TableTracker from '../../components/TableTracker';

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
    const [neck, setNeck] = useState([]);
    const [hips, setHips] = useState([]);
    const [caloriesIntake, setCaloriesIntake] = useState([]);
    const [caloriesBurned, setCaloriesBurned] = useState([]);
    const [tableValues, setTableValues] = useState({});
    
    const user = useSelector(state => state.user);
    const jwt = useSelector(state => state.token);
    const mode = useSelector(state => state.mode);

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

    const getTableValues = (input, type) => {
        let array = [];
        input.forEach((element) => {
            if(element[type]) {
                array.push(element[type]);
            }
        });

        const max = Math.max(array);
        const min = Math.min(array);
        const avg = (array.reduce((acc, el) => acc + el), 0) / array.length;

        return [min, avg, max];
    }

    console.log(tableValues);

    useEffect(() => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }

        const fetchData = async () => {
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
                    setNeck(neckData);
                    setHips(hipsData);
                    setCaloriesBurned(caloriesBurnedData);
                    setCaloriesIntake(caloriesIntakeData);
                    // setTableValues({
                    //     ...tableValues,
                    //     bmi: getTableValues(bmi, "BMI"),
                    // })
                    // setTableValues({
                    //     ...tableValues,
                    //     weight: getTableValues(weight, "weight"),
                    // })
                    // setTableValues({
                    //     ...tableValues,
                    //     caloriesIntake: getTableValues(caloriesIntake, "caloriesIntake"),
                    // })
                    // setTableValues({
                    //     ...tableValues,
                    //     caloriesBurned: getTableValues(caloriesBurned, "caloriesBurned"),
                    // })
                    // setTableValues({
                    //     ...tableValues,
                    //     waist: getTableValues(waist, "waist"),
                    // })
                    // setTableValues({
                    //     ...tableValues,
                    //     hips: getTableValues(hips, "hips"),
                    // })
                    // setTableValues({
                    //     ...tableValues,
                    //     neck: getTableValues(neck, "neck"),
                    // })
                    // setTableValues({
                    //     ...tableValues,
                    //     bodyFat: getTableValues(bodyFat, "bodyFat"),
                    // });

                    // // test();
                    // // console.log(tableValues);
                    // // console.log(getTableValues(caloriesIntake, "caloriesIntake"));
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        const trackerMetrics = async () => {
            
            await axios.get(`http://localhost:3001/tracker/getTrackerMetrics/${user._id}`, options)
                .then((response) => {
                    console.log(response.data);
                    setTableValues(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        fetchData();
        trackerMetrics();
    }, [jwt, user._id]);

    return (
        <div className='workout_wrapper'>
            <div className='workouts_create_wrapper'>
                <h1>Summary</h1>
                <p>
                    Here you can see a detailed way of your progress over time. The data you tracked we used it to show
                    in an easy way to understand your evolution though-out all your journey. We give you charts and a table
                    so based on them you can draw a conclusion.
                </p>
                {
                    loading ? <Loader divStyle='pages_loader' size={42} color='#488eff'/> : (
                        <>
                            {/* <TableTracker tableValues={tableValues}/> */}
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
                                                    left: -30,
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
                                                    left: -30,
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
                                                    left: -30,
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
                                                    left: -30,
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
                    )
                }
            </div>
        </div>
    )
}

export default Summary;