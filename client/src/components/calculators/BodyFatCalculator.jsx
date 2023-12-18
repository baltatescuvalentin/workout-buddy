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
import toast from 'react-hot-toast';

const BodyFatCalculator = () => {

    const [details, setDetails] = useState(false);
    const [bodyFat, setBodyFat] = useState(0);
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
            neck: 0,
            waist: 0,
            hip: 0,
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
        calculateBodyFat(getValues('age'), getValues('sex'), getValues('weight'), getValues('height'),
            getValues('neck'), getValues('waist'), getValues('hip'));
    }

    let ageEffect = watch('age');
    let heightEffect =  watch('height');
    let weightEffect = watch('weight');
    let neckEffect = watch('neck');
    let waistEffect = watch('waist');
    let hipEffect = watch('hip');
    let sexEffect = watch('sex');

    useEffect(() => {
        const inputsReady = () => {
            if(sexEffect === "") {
                return false;
            }
            if(ageEffect === "" || heightEffect === "" || weightEffect === "" || neckEffect === "" || waistEffect === "" || hipEffect === "") {
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
            if(parseInt(neckEffect) < 20 || parseInt(neckEffect) > 80) {
                return false;
            }
            if(parseInt(waistEffect) < 40 || parseInt(waistEffect) > 130) {
                return false;
            }
            if(parseInt(hipEffect) < 40 || parseInt(hipEffect) > 130) {
                return false;
            }
            return true;
        }

        setInputsReady(inputsReady());
    }, [heightEffect, ageEffect, weightEffect, neckEffect, waistEffect, hipEffect, sexEffect]);

    const calculateBodyFat = async (age, gender, weight, height, neck, waist, hip) => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://fitness-calculator.p.rapidapi.com/bodyfat',
            params: {
                age: age,
                gender: gender,
                weight: weight,
                height: height,
                neck: neck,
                waist: waist,
                hip: hip
            },
            headers: {
                'X-RapidAPI-Key': 'f5b195d257msh77ce462a18d0527p16570ajsn40652ebe82e7',
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };

          await axios.request(options)
            .then((response) => {
                setBodyFat(response.data);
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

    return (
        <div className='calculator_wrapper'>
            <div className='calculator_header'>
                <p className='calculator_title'>Body Fat Percentage</p>
                <ExpandButton btnStyles='calculator_expand' iconStyles='calculator_expand_icon' onClick={handleDetails}/>
            </div>
            {
                details && (
                    <div className='calculator_content_wrapper'>
                        <p>Knowing the body fat percentage of the body would be helpful to make a well-prepared fitness program.</p>
                        <div className='calculator_buttons_wrapper'>
                            <CalculatorOptionButton onClick={showCalculateOption} title='Calculate with custom data'/>
                        </div>
                        { calculateOption && 
                            <div className='calculator_custom_wrapper'>
                                <div className='calculator_inputs_with_gender'>
                                    <CalculatorInput id='age' inputStyle='calculator_input' title='Age' register={register}/>
                                    <IdentityInput setValue={setValue} />
                                    <CalculatorInput id='weight' inputStyle='calculator_input' title='Weight' register={register}/>
                                    <CalculatorInput id='height' inputStyle='calculator_input' title='Height' register={register}/>
                                    <CalculatorInput id='neck' inputStyle='calculator_input' title='Neck' register={register}/>
                                    <CalculatorInput id='waist' inputStyle='calculator_input' title='Waist' register={register}/>
                                    <CalculatorInput id='hip' inputStyle='calculator_input' title='Hip' register={register}/>
                                </div>
                                <UtilityButton styles={`${inputsReady === true ? 'calculator_custom_calculate_button' : 'calculator_custom_calculate_button_disabled'}`} title='Calculate' onClick={calculateCustom} disabled={!inputsReady}/>
                            </div>}
                        {loading ? <Loader divStyle='calculator_loader' size={36} color={'#488eff'} loaderStyle='calculator_loader_icon'/>
                            : (
                                
                                (showCustom && 
                                    <div className='calculator_result'>
                                        <h3>Your body fat percentage is {`${bodyFat.data['Body Fat (BMI method)']}`}%</h3>
                                    </div>)
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default BodyFatCalculator;