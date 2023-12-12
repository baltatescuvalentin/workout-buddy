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
import CaloriesTrackerFood from '../CaloriesTrackerFood';

const CaloriesIntake = ({saveToTracker, calsArray}) => {

    const [addFood, setAddFood] = useState(false);
    const mode = useSelector(state => state.mode);
    const [searchInput, setSearchInput] = useState("");
    const [searchLoader, setSearchLoader] = useState(false);
    const [foodResults, setFoodResults] = useState([]);
    const [addOption, setAddOption] = useState("");
    const [chosenFood, setChosenFood] = useState("");
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
            foodName: '',
            quantity: 0,
            calories: 0,
        }
    })

    const handleOpenAdd = () => {
        setAddFood(true);
    }
    
    const customAddFood = () => {
        setAddOption('custom');
        reset();
        setChosenFood("");
        setShowCustom(true);
    }

    const searchAddFood = () => {
        setAddOption('search');
        setFoodResults([]);
        reset();
    }

    const handleCloseAdd = () => {
        setAddFood(false);
        setAddOption("");
        setFoodResults([]);
        setChosenFood("");
        reset();
    }

    const closeAddOptions = () => {
        setAddOption("");
        setFoodResults([]);
    }

    const handleFoodSearch = (event) => {
        if(event.key === 'Enter') {
            findFood();
        }
    }

    // const addToCaloriesArray = (foodName, quantity, calories) => {
    //     setCaloriesArray([...caloriesArray, {
    //         foodName: foodName,
    //         quantity: quantity,
    //         calories: calories,
    //     }])
    // }

    const addToCaloriesArray = (foodName, quantity, calories) => {
        setCaloriesArray(prevArray => {
            let newArray = [...prevArray, {
                foodName: foodName,
                quantity: quantity,
                calories: calories,
            }];
            saveToTracker(newArray);
            return newArray;
        })
    }

    const addNewFood = (foodName, quantity, calories) => {
        addToCaloriesArray(foodName, quantity, calories);
        setChosenFood("");
        setShowCustom(false);
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
            return watch('foodName') && (watch('calories') > 0) && (watch('quantity') > 0);
        }

        setValidCustomInputs(customValidInputs());
    }, [watch('foodName'), watch('calories'), watch('quantity')]);

    const searchCalories = useMemo(() => {
        if(watch('quantity') === 0) {
            return 0;
        }
        
        const currentCalories = ((watch('quantity') * chosenFood.calories) / 100).toFixed(2);
        return currentCalories;
    }, [watch('quantity'), chosenFood.calories, watch]);

    console.log(caloriesArray);
    console.log(validCustomInputs);

    const findFood = async () => {
        setSearchLoader(true);

        const options = {
            method: 'GET',
            url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
            params: {
              query: searchInput
            },
            headers: {
              'X-RapidAPI-Key': 'f5b195d257msh77ce462a18d0527p16570ajsn40652ebe82e7',
              'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
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

    const calorieIntakeValue = useMemo(() => {
        let value = caloriesArray.reduce((acc, curr) => {
            return acc + parseFloat(curr.calories);
        }, 0);
        value = value.toFixed(2);
        return value;
    }, [caloriesArray]);

    return (
        <div>
            <div className='calories_intake_header'>
                <p>{calorieIntakeValue > 0 ? calorieIntakeValue : '0'} Calories intake</p>
                <div className='tracker_buttons'>
                    {
                        addFood ? 
                            <UtilityButton styles='tracker_button' onClick={handleCloseAdd} icon={<FaTimes className='tracker_button_icon'/>}/> 
                        : <UtilityButton styles='tracker_button' onClick={handleOpenAdd} icon={<FaEdit className='tracker_button_icon'/>}/>
                    }
                </div>
            </div>
            {
                addFood && (
                    <>
                        <div className='calories_intake_add_option'>
                            <UtilityButton onClick={customAddFood} styles='tracker_calculate_button' title='Add custom data' />
                            <UtilityButton onClick={searchAddFood} styles='tracker_calculate_button' title='Search food' />
                        </div>
                        {
                            addOption === 'search' ? (
                                <>
                                    <div className='calories_intake_input_wrapper'>
                                        <input placeholder='&#128269; Search' onKeyDown={handleFoodSearch} onChange={(e) => setSearchInput(e.target.value)} className={`calories_intake_food_search ${mode === 'light' ? 'light input' : 'dark_input'}`}/>
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
                                                        foodResults.map((food) => <p onClick={() => setChosenFood(food)} key={food.name} className='calories_intake_result'>{food.name} - {food.calories} cals per 100g</p>)
                                                    }
                                                </div>
                                            ))
                                        }
                                        {
                                            chosenFood && (
                                                <div className='calories_tracker_food_wrapper'>
                                                    <div className='calories_tracker_food_elements_wrapper'>
                                                        <div className='calories_tracker_food_element'>
                                                            <p>Food</p>
                                                            <p>{chosenFood.name}</p>
                                                        </div>
                                                        <div className='calories_tracker_food_element'>
                                                            <p>Quantity </p>
                                                            <input className='calories_intake_input_quantity' type='number' {...register('quantity')}/>
                                                        </div>
                                                        <div className='calories_tracker_food_element'>
                                                            <p>Calories </p>
                                                            <p>{searchCalories}</p>
                                                        </div>
                                                    </div>
                                                    <div className='tracker_buttons'>
                                                        <UtilityButton disabled={watch('quantity') > 0 ? false : true}
                                                            onClick={() => addNewFood(chosenFood.name, getValues('quantity'), searchCalories)} 
                                                            styles='tracker_button' icon={<FaPlus className={`${watch('quantity') > 0 ? 'tracker_button_icon' : 'tracker_button_icon_disabled'}`} />}/>
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
                                                <p>Food</p>
                                                <input type='text' className='calories_intake_input_foodname' {...register('foodName')} placeholder='Food name' />
                                            </div>
                                            <div className='calories_tracker_food_element'>
                                                <p>Quantity </p>
                                                <input className='calories_intake_input_quantity' type='number' {...register('quantity')} />
                                            </div>
                                            <div className='calories_tracker_food_element'>
                                                <p>Calories </p>
                                                <input className='calories_intake_input_quantity' type='number' {...register('calories')} />
                                            </div>
                                        </div>
                                        <div className='tracker_buttons'>
                                            <UtilityButton disabled={!validCustomInputs}
                                                onClick={() => addNewFood(getValues('foodName'), getValues('quantity'), getValues('calories'))} 
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
                        caloriesArray.map((track, index) => <CaloriesTrackerFood key={index} index={index} saveToTracker={() => saveToTracker(caloriesArray)} trackerItem={track} removeFromCaloriesArray={removeFromCaloriesArray} editToCaloriesArray={editToCaloriesArray}/>)
                    )
                }  
            </div>
        </div>
    )
}

export default CaloriesIntake;