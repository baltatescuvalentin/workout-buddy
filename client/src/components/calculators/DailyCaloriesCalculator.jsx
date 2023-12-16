import { useEffect, useState } from 'react';
import '../../Styles/fitness.css';
import ExpandButton from '../buttons/ExpandButton';
import CalculatorOptionButton from '../buttons/CalculatorOptionButton';
import axios from 'axios';
import Loader from '../Loader';
import { useForm } from 'react-hook-form';
import CalculatorInput from '../inputs/CalculatorInput';
import UtilityButton from '../buttons/UtilityButton';
import IdentityInput from '../inputs/IdentityInput';
import ActivityLevelDropdown from '../inputs/ActivityLevelDropdown';

const DailyCaloriesCalculator = () => {

    const [details, setDetails] = useState(false);
    const [dailyCalories, setDailyCalories] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showCustom, setShowCustom] = useState(false);
    const [calculateOption, setCalculateOption] = useState(null);
    const [inputsReady, setInputsReady] = useState(false);

    const {
        register,
        watch,
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            sex: '',
            height: 0,
            age: 0,
            weight: 0,
            activityLevel: '',
        }
    });

    const showCalculateOption = () => {
        setCalculateOption(true);
    }


    const handleDetails = () => {
        setDetails(prev => !prev);
    }

    const calculateCustom = () => {
        setShowCustom(true);
        calculateDailyCalories(getValues('age'), getValues('sex'), getValues('height'), getValues('weight'), getValues('activityLevel'));
        console.log(dailyCalories);
    }

    let ageEffect = watch('age');
    let heightEffect =  watch('height');
    let weightEffect = watch('weight');
    let sexEffect = watch('sex');
    let activityEffect = watch('activityLevel');

    useEffect(() => {
        const inputsReady = () => {
            if(sexEffect === "") {
                return false;
            }
            if(ageEffect === "" || heightEffect === "" || weightEffect === "" || activityEffect === "") {
                return false;
            }
            if(parseInt(ageEffect) < 2) {
                return false;
            }
            if(parseInt(heightEffect) < 130 || parseInt(heightEffect) > 230) {
                return false;
            }
            if(parseInt(weightEffect) < 40  || parseInt(weightEffect) > 160) {
                return false;
            }
            return true;
        }

        setInputsReady(inputsReady());
        console.log(activityEffect);
    }, [heightEffect, ageEffect, weightEffect, sexEffect, activityEffect]);

    const calculateDailyCalories = async (age, gender, height, weight, activityLevel) => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://fitness-calculator.p.rapidapi.com/dailycalorie',
            params: {
              age: age,
              gender: gender,
              height: height,
              weight: weight,
              activitylevel: activityLevel
            },
            headers: {
              'X-RapidAPI-Key': 'f5b195d257msh77ce462a18d0527p16570ajsn40652ebe82e7',
              'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };

          await axios.request(options)
            .then((response) => {
                setDailyCalories(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    /* <select className='activity_dropdown' {...register(id)}>
                <option value="" disabled>Select an activity</option>
                <option value="level_1">Sedentary: little or no exercise</option>
                <option value="level_2">Exercise 1-3 times/week</option>
                <option value="level_3">Exercise 4-5 times/week</option>
                <option value="level_4">Daily exercise or intense exercise 3-4 times/week</option>
                <option value="level_5">Intense exercise 6-7 times/week</option>
                <option value="level_6">Very intense exercise daily, or physical job</option>
            </select> */

    const activityOptions = [
        {
            value: "", disabled: true, title: 'Select an activity'
        },
        {
            value: "level_1", disabled: false, title: 'Sedentary: little or no exercise'
        },
        {
            value: "level_2", disabled: false, title: 'Exercise 1-3 times/week'
        },
        {
            value: "level_3", disabled: false, title: 'Exercise 4-5 times/week'
        },
        {
            value: "level_4", disabled: false, title: 'Daily exercise or intense exercise 3-4 times/week'
        },
        {
            value: "level_5", disabled: false, title: 'Intense exercise 6-7 times/week'
        },
        {
            value: "level_6", disabled: false, title: 'Very intense exercise daily, or physical job'
        },
    ]

    return (
        <div className='calculator_wrapper'>
            <div className='calculator_header'>
                <p className='calculator_title'>Daily Calories Calculator</p>
                <ExpandButton btnStyles='calculator_expand' iconStyles='calculator_expand_icon' onClick={handleDetails}/>
            </div>
            {
                details && (
                    <div className='calculator_content_wrapper'>
                        <p>Our body is burning calories every day with respect to activity level. Knowing your daily calorie requirements is important to achieve your final goal. You can calculate your daily calorie req. for 7 different goals. These goals are maintain, mild-lose, normal-lose, extreme loss, mild-gain, normal-gain, extreme gain weight.</p>
                        <div className='calculator_buttons_wrapper'>
                            <CalculatorOptionButton onClick={showCalculateOption} title='Calculate with custom data'/>
                        </div>
                        {calculateOption && 
                            <div className='calculator_custom_wrapper'>
                                <div className='calculator_inputs_with_gender'>
                                    <CalculatorInput id='age' inputStyle='calculator_input' title='Age' register={register}/>
                                    <IdentityInput setValue={setValue} />
                                    <CalculatorInput id='weight' inputStyle='calculator_input' title='Weight' register={register}/>
                                    <CalculatorInput id='height' inputStyle='calculator_input' title='Height' register={register}/>
                                    <ActivityLevelDropdown id='activityLevel' register={register} options={activityOptions}/>
                                </div>
                                <UtilityButton styles={`${inputsReady === true ? 'calculator_custom_calculate_button' : 'calculator_custom_calculate_button_disabled'}`} title='Calculate' onClick={calculateCustom} disabled={!inputsReady}/>
                            </div>}
                        {loading ? <Loader divStyle='calculator_loader' size={36} color={'#488eff'} loaderStyle='calculator_loader_icon'/> 
                            : (
                                
                                (showCustom && 
                                    <div className='calculator_result'>
                                        <h3>The average number of calories you need is {`${dailyCalories.data.goals['maintain weight']}`} calories to maintain your weight.</h3>
                                        <h4>For a mild weight loss you need {`${dailyCalories.data.goals['Mild weight loss']['calory']}`} calories to lose {`${dailyCalories.data.goals['Mild weight loss']['loss weight']}`} kgs.</h4>
                                        <h4>For a weight loss you need {`${dailyCalories.data.goals['Weight loss']['calory']}`} calories to lose {`${dailyCalories.data.goals['Weight loss']['loss weight']}`} kgs.</h4>
                                        <h4>For am extreme weight loss you need {`${dailyCalories.data.goals['Extreme weight loss']['calory']}`} calories to lose {`${dailyCalories.data.goals['Extreme weight loss']['loss weight']}`} kgs.</h4>
                                        <h4>For a mild weight gain you need {`${dailyCalories.data.goals['Mild weight gain']['calory']}`} calories to gain {`${dailyCalories.data.goals['Mild weight gain']['gain weight']}`} kgs.</h4>
                                        <h4>For a weight gain you need {`${dailyCalories.data.goals['Weight gain']['calory']}`} calories to gain {`${dailyCalories.data.goals['Weight gain']['gain weight']}`} kgs.</h4>
                                        <h4>For a mild weight loss you need {`${dailyCalories.data.goals['Extreme weight gain']['calory']}`} calories to gain {`${dailyCalories.data.goals['Extreme weight gain']['gain weight']}`} kgs.</h4>
                                    </div>)
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default DailyCaloriesCalculator;