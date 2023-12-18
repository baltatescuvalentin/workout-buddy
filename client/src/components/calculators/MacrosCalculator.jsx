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
import toast from 'react-hot-toast';

const MacrosCalculator = () => {

    const [details, setDetails] = useState(false);
    const [macros, setMacros] = useState(0);
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
            goal: '',
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
        calculateMacros(getValues('age'), getValues('sex'), getValues('height'), getValues('weight'), getValues('activityLevel'), getValues('goal'));
    }

    let ageEffect = watch('age');
    let heightEffect =  watch('height');
    let weightEffect = watch('weight');
    let sexEffect = watch('sex');
    let activityEffect = watch('activityLevel');
    let goalEffect = watch('goal');

    useEffect(() => {
        const inputsReady = () => {
            if(sexEffect === "") {
                return false;
            }
            if(ageEffect === "" || heightEffect === "" || weightEffect === "" || goalEffect === "" || activityEffect === "" || goalEffect === "") {
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
    }, [heightEffect, ageEffect, weightEffect, sexEffect, activityEffect, goalEffect]);

    const calculateMacros = async (age, gender, height, weight, activityLevel, goal) => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://fitness-calculator.p.rapidapi.com/macrocalculator',
            params: {
              age: age,
              gender: gender,
              height: height,
              weight: weight,
              activitylevel: activityLevel,
              goal: goal
            },
            headers: {
              'X-RapidAPI-Key': 'f5b195d257msh77ce462a18d0527p16570ajsn40652ebe82e7',
              'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };

          await axios.request(options)
            .then((response) => {
                setMacros(response.data);
            })
            .catch((error) => {
                if(error.response.data.message) {
                    toast.error(error.response.data.message, { duration: 3000});
                }
                else {
                    toast.error(error.error , { duration: 3000});
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const activityOptions = [
        {
            value: "", disabled: true, title: 'Select an activity'
        },
        {
            value: "1", disabled: false, title: 'Basal Metabolic Rate(BMR)'
        },
        {
            value: "2", disabled: false, title: 'Sedentary: little or no exercise'
        },
        {
            value: "3", disabled: false, title: 'Exercise 1-3 times/week'
        },
        {
            value: "4", disabled: false, title: 'Exercise 4-5 times/week'
        },
        {
            value: "5", disabled: false, title: 'Daily exercise or intense exercise 3-4 times/week'
        },
        {
            value: "6", disabled: false, title: 'Intense exercise 6-7 times/week'
        },
        {
            value: "7", disabled: false, title: 'Very intense exercise daily, or physical job'
        },
    ]

    const goalsOptions = [
        {
            value: "", disabled: true, title: 'Select an goal'
        },
        {
            value: "maintain", disabled: false, title: "Maintain weight"
        },
        {
            value: "mildlose", disabled: false, title: 'Mild weight loss'
        },
        {
            value: "weightlose", disabled: false, title: 'Weight loss'
        },
        {
            value: "extremelose", disabled: false, title: 'Extreme weight loss'
        },
        {
            value: "mildgain", disabled: false, title: 'Mild weight gain'
        },
        {
            value: "weightgain", disabled: false, title: 'Weight gain'
        },
        {
            value: "extremegain", disabled: false, title: 'Extreme weight gain'
        },
    ]

    return (
        <div className='calculator_wrapper'>
            <div className='calculator_header'>
                <p className='calculator_title'>Macros Calculator</p>
                <ExpandButton btnStyles='calculator_expand' iconStyles='calculator_expand_icon' onClick={handleDetails}/>
            </div>
            {
                details && (
                    <div className='calculator_content_wrapper'>
                        <p>Find the amount of macronutrients in four different categories which are balanced, low-fat, low-carbs, and high-protein for a specific calorie burned.</p>
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
                                    <ActivityLevelDropdown id='goal' register={register} options={goalsOptions}/>
                                    <ActivityLevelDropdown id='activityLevel' register={register} options={activityOptions}/>
                                </div>
                                <UtilityButton styles={`${inputsReady === true ? 'calculator_custom_calculate_button' : 'calculator_custom_calculate_button_disabled'}`} title='Calculate' onClick={calculateCustom} disabled={!inputsReady}/>
                            </div>}
                        {loading ? <Loader divStyle='calculator_loader' size={36} color={'#488eff'} loaderStyle='calculator_loader_icon'/> 
                            : (
                                
                                (showCustom && 
                                    <div className='calculator_result'>
                                        <h3>For your daily routine and your {`${watch('goal')}`} you need {`${macros.data.calorie.toFixed(2)}`} calories.</h3>
                                        <h4>A balanced diet needs {`${macros.data.balanced.protein.toFixed(2)}`} proteins, {`${macros.data.balanced.fat.toFixed(2)}`} fat and {`${macros.data.balanced.carbs.toFixed(2)}`} carbs.</h4>
                                        <h4>A low fat diet needs {`${macros.data.lowfat.protein.toFixed(2)}`} proteins, {`${macros.data.lowfat.fat.toFixed(2)}`} fat and {`${macros.data.lowfat.carbs.toFixed(2)}`} carbs.</h4>
                                        <h4>A low carbs diet needs {`${macros.data.lowcarbs.protein.toFixed(2)}`} proteins, {`${macros.data.lowcarbs.fat.toFixed(2)}`} fat and {`${macros.data.lowcarbs.carbs.toFixed(2)}`} carbs.</h4>
                                        <h4>A high protein diet needs {`${macros.data.highprotein.protein.toFixed(2)}`} proteins, {`${macros.data.highprotein.fat.toFixed(2)}`} fat and {`${macros.data.highprotein.carbs.toFixed(2)}`} carbs.</h4>
                                    </div>)
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MacrosCalculator;