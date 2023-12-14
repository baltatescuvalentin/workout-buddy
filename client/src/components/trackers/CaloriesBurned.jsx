import '../../Styles/fitness.css';
import '../../Styles/buttons.css';
import '../../Styles/inputs.css';
import '../../Styles/styles.css';
import UtilityButton from '../buttons/UtilityButton';
import { FaSave, FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../Loader';
import { useForm } from 'react-hook-form';
import CaloriesTrackerActivity from '../CaloriesTrackerActivity';

const CaloriesBurned = ({saveToTracker, calsArray}) => {

    const [addActivity, setAddActivity] = useState(false);
    const mode = useSelector(state => state.mode);
    const [searchInput, setSearchInput] = useState("");
    const [searchLoader, setSearchLoader] = useState(false);
    const [foodResults, setFoodResults] = useState([]);
    const [addOption, setAddOption] = useState("");
    const [chosenActivity, setChosenActivity] = useState("");
    const [caloriesArray, setCaloriesArray] = useState(calsArray || []);
    const [validCustomInputs, setValidCustomInputs] = useState(false);
    const [showCustom, setShowCustom] = useState(false);

    const {
        register,
        watch,
        getValues,
        reset
    } = useForm({
        defaultValues: {
            activity: '',
            time: 0,
            calories: 0,
        }
    })

    const handleOpenAdd = () => {
        setAddActivity(true);
    }
    
    const customAddActivity = () => {
        setAddOption('custom');
        reset();
        setChosenActivity("");
        setShowCustom(true);
    }

    const searchAddActivity = () => {
        setAddOption('search');
        setFoodResults([]);
        reset();
    }

    const handleCloseAdd = () => {
        setAddActivity(false);
        setAddOption("");
        setFoodResults([]);
        setChosenActivity("");
        reset();
    }

    const closeAddOptions = () => {
        setAddOption("");
        setFoodResults([]);
    }

    const handleActivitySearch = (event) => {
        if(event.key === 'Enter') {
            findFood();
        }
    }

    // const addToCaloriesArray = (activity, time, calories) => {
    //     setCaloriesArray([...caloriesArray, {
    //         activity: activity,
    //         time: time,
    //         calories: calories,
    //     }])
    // }

    const addToCaloriesArray = (activity, time, calories) => {
        setCaloriesArray(prevArray => {
            let newArray = [...prevArray, {
                activity: activity,
                time: parseFloat(time),
                calories: parseFloat(calories),
            }];
            saveToTracker(newArray);
            return newArray;
        })
    }

    const addNewActivity = (activity, time, calories) => {
        addToCaloriesArray(activity, time, calories);
        setChosenActivity("");
        setShowCustom(false);
        reset();
        //saveToTracker(caloriesArray);
    }

    const removeFromCaloriesArray = (index) => {
        setCaloriesArray(prevArray => {
            let updatedArray = [...prevArray];
            updatedArray = updatedArray.filter((_, arrayIndex) => index !== arrayIndex);
            saveToTracker(updatedArray);
            return updatedArray;
        })
    }

    const editToCaloriesArray = (index, newData) => {
        setCaloriesArray(prevArray => {
            let updatedArray = [...prevArray];
            updatedArray[index] = newData;
            saveToTracker(updatedArray);
            return updatedArray;
        })
    }

    useEffect(() => {
        const customValidInputs = () => {
            return watch('activity') && (watch('calories') > 0) && (watch('time') > 0);
        }

        setValidCustomInputs(customValidInputs());
    }, [watch('activity'), watch('calories'), watch('time')]);

    const searchCalories = useMemo(() => {
        if(watch('time') === 0) {
            return 0;
        }
        
        const currentCalories = ((watch('time') * parseFloat(chosenActivity.calories_per_hour)) / 60).toFixed(2);
        return parseFloat(currentCalories);
    }, [watch('time'), chosenActivity.calories_per_hour, watch]);

    console.log(`burned:`);
    console.log(caloriesArray);

    const findFood = async () => {
        setSearchLoader(true);

        const options = {
            method: 'GET',
            url: 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned',
            params: {
                activity: searchInput
            },
            headers: {
              'X-RapidAPI-Key': 'f5b195d257msh77ce462a18d0527p16570ajsn40652ebe82e7',
              'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
            }
          };
          

          await axios.request(options)
            .then((response) => {
                setFoodResults([...response.data]);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setSearchLoader(false);
            })
    }

    const calorieBurnedValue = useMemo(() => {
        let value = caloriesArray.reduce((acc, curr) => {
            return acc + parseFloat(curr.calories);
        }, 0);
        value = value.toFixed(2);
        console.log(`memo ${value}`)
        return value;
    }, [caloriesArray]);

    return (
        <div>
            <div className='calories_intake_header'>
                <p>{calorieBurnedValue > 0 ? calorieBurnedValue : '0'} Calories Burned</p>
                <div className='tracker_buttons'>
                    {
                        addActivity ? 
                            <UtilityButton styles='tracker_button' onClick={handleCloseAdd} icon={<FaTimes className='tracker_button_icon'/>}/> 
                        : <UtilityButton styles='tracker_button' onClick={handleOpenAdd} icon={<FaEdit className='tracker_button_icon'/>}/>
                    }
                </div>
            </div>
            {
                addActivity && (
                    <>
                        <div className='calories_intake_add_option'>
                            <UtilityButton onClick={customAddActivity} styles='tracker_calculate_button' title='Add custom data' />
                            <UtilityButton onClick={searchAddActivity} styles='tracker_calculate_button' title='Search activity' />
                        </div>
                        {
                            addOption === 'search' ? (
                                <>
                                    <div className='calories_intake_input_wrapper'>
                                        <input placeholder='&#128269; Search' onKeyDown={handleActivitySearch} onChange={(e) => setSearchInput(e.target.value)} className={`calories_intake_food_search ${mode === 'light' ? 'light input' : 'dark_input'}`}/>
                                        <div className='tracker_buttons'>
                                            <UtilityButton onClick={closeAddOptions} styles='tracker_button' icon={<FaTimes className='tracker_button_icon'/>}/>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            searchLoader ? <Loader divStyle='calculator_loader' size={36} color={'#488eff'} loaderStyle='calculator_loader_icon'/>  :
                                            (foodResults.length > 0 && (
                                                <div className='calories_intake_search_result_list'>
                                                    {
                                                        foodResults.map((activity) => 
                                                            <p onClick={() => setChosenActivity(activity)} key={activity.name} className='calories_intake_result'>{activity.name} - {activity.calories_per_hour} cals per hour</p>)
                                                    }
                                                </div>
                                            ))
                                        }
                                        {
                                            chosenActivity && (
                                                <div className='calories_tracker_food_wrapper'>
                                                    <div className='calories_tracker_food_elements_wrapper'>
                                                        <div className='calories_tracker_food_element'>
                                                            <p>Activity</p>
                                                            <p>{chosenActivity.name}</p>
                                                        </div>
                                                        <div className='calories_tracker_food_element'>
                                                            <p>Time </p>
                                                            <input className='calories_intake_input_quantity' type='number' {...register('time')}/>
                                                        </div>
                                                        <div className='calories_tracker_food_element'>
                                                            <p>Calories </p>
                                                            <p>{searchCalories}</p>
                                                        </div>
                                                    </div>
                                                    <div className='tracker_buttons'>
                                                        <UtilityButton disabled={watch('time') > 0 ? false : true}
                                                            onClick={() => addNewActivity(chosenActivity.name, parseFloat(getValues('time')), parseFloat(searchCalories))} 
                                                            styles='tracker_button' icon={<FaPlus className={`${watch('time') > 0 ? 'tracker_button_icon' : 'tracker_button_icon_disabled'}`} />}/>
                                                    </div>
                                                    
                                                </div>
                                            )
                                        }
                                    </div>
                                </>
                            ) : addOption === 'custom' ? (
                                showCustom && 
                                    <div className='calories_tracker_food_wrapper'>
                                        <div className='calories_tracker_food_elements_wrapper'>
                                            <div className='calories_tracker_food_element'>
                                                <p>Activity</p>
                                                <input type='text' className='calories_intake_input_foodname' {...register('activity')} placeholder='Activity' />
                                            </div>
                                            <div className='calories_tracker_food_element'>
                                                <p>Time </p>
                                                <input className='calories_intake_input_quantity' type='number' {...register('time')} />
                                            </div>
                                            <div className='calories_tracker_food_element'>
                                                <p>Calories </p>
                                                <input className='calories_intake_input_quantity' type='number' {...register('calories')} />
                                            </div>
                                        </div>
                                        <div className='tracker_buttons'>
                                            <UtilityButton disabled={!validCustomInputs}
                                                onClick={() => addNewActivity(getValues('activity'), getValues('time'), getValues('calories'))} 
                                                styles='tracker_button' icon={<FaPlus className={`${validCustomInputs ? 'tracker_button_icon' : 'tracker_button_icon_disabled'}`} />}/>
                                        </div>
                                    </div>
                            ) : <></>
                        }
                    </>
                )
            }
            <div className='calories_tracker_foods_wrapper'>
                {
                    caloriesArray.length > 0 && (
                        caloriesArray.map((track, index) => <CaloriesTrackerActivity key={index} saveToTracker={() => saveToTracker(caloriesArray)} index={index} trackerItem={track} removeFromCaloriesArray={removeFromCaloriesArray} editToCaloriesArray={editToCaloriesArray}/>)
                    )
                }  
            </div>
        </div>
    )
}

export default CaloriesBurned;