import { useEffect, useState } from 'react';
import '../../Styles/fitness.css';
import ExpandButton from '../buttons/ExpandButton';
import CalculatorOptionButton from '../buttons/CalculatorOptionButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../Loader';
import { useForm } from 'react-hook-form';
import CalculatorInput from '../inputs/CalculatorInput';
import UtilityButton from '../buttons/UtilityButton';

const BMICalculator = () => {

    const [details, setDetails] = useState(false);
    const [bmiValue, setBmiValue] = useState(0);
    const [calculateOption, setCalculateOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showCustom, setShowCustom] = useState(false);
    const [inputsReady, setInputsReady] = useState(false);
    const user = useSelector(state => state.user);

    const {
        register,
        watch,
        getValues,
        reset,
    } = useForm({
        defaultValues: {
            age: 0,
            weight: 0,
            height: 0,
        }
    })

    const checkForInfo = () => {
        return user?.age && user?.weight && user?.height;
    }

    const handleDetails = () => {
        setDetails(prev => !prev);
    }

    const accountOption = () => {
        setCalculateOption('account');
        calculateBMI(user.age, user.weight, user.height);
        setShowCustom(false);
        reset();
    }

    const customOption = () => {
        setCalculateOption('custom');
    }

    const calculateCustom = () => {
        setShowCustom(true);
        calculateBMI(getValues('age'), getValues('weight'), getValues('height'))

    }

    console.log(typeof getValues('age'));

    // const inputsReady = () => {
    //     if(parseInt(watch('age')) < 1) {
    //         return false;
    //     }
    //     if(parseInt(watch('height')) < 130 || parseInt(watch('height')) > 230) {
    //         return false;
    //     }
    //     if(parseInt(watch('weight')) < 40 || parseInt(watch('weight')) > 160) {
    //         return false;
    //     }

    //     return true;
    // }

    useEffect(() => {
        const ready = () => {
            if(watch('age') === "" || watch('height') === "" || watch('weight') === "") {
                return false;
            }
            if(parseInt(watch('age')) < 1) {
                return false;
            }
            if(parseInt(watch('height')) < 130 || parseInt(watch('height')) > 230) {
                return false;
            }
            if(parseInt(watch('weight')) < 40 || parseInt(watch('weight')) > 160) {
                return false;
            }
    
            return true;
        }

        setInputsReady(ready());
    }, [watch]);

    console.log(inputsReady);

    const calculateBMI = async (age, weight, height) => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://fitness-calculator.p.rapidapi.com/bmi',
            params: {
              age: age,
              weight: weight,
              height: height,
            },
            headers: {
              'X-RapidAPI-Key': 'f5b195d257msh77ce462a18d0527p16570ajsn40652ebe82e7',
              'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };

          await axios.request(options)
            .then((response) => {
                setBmiValue(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className='calculator_wrapper'>
            <div className='calculator_header'>
                <p className='calculator_title'>BMI Calculator</p>
                <ExpandButton btnStyles='calculator_expand' iconStyles='calculator_expand_icon' onClick={handleDetails}/>
            </div>
            {
                details && (
                    <div className='calculator_content_wrapper'>
                        <p>Find body mass index value (BMI) with this endpoint. You just need to enter three parameters which are age, weight (kg), and height(cm) information.</p>
                        <div className='calculator_buttons_wrapper'>
                            {
                                checkForInfo() && (<CalculatorOptionButton onClick={accountOption} title='Calculate with account info'/>)
                            }
                            <CalculatorOptionButton onClick={customOption} title='Calculate with custom data'/>
                        </div>
                        {
                            calculateOption === 'account' ? (
                                loading ? <Loader divStyle='calculator_loader' size={36} color={'#488eff'} loaderStyle='calculator_loader_icon'/> 
                                    : (<div className='calculator_result'>
                                        <h3>Your BMI value is {`${bmiValue.data.bmi}`} and your health is {`${bmiValue.data.health}`} !</h3>
                                        </div>)
                            )
                            : calculateOption === 'custom' ?
                                <>
                                    <div className='calculator_custom_wrapper'>
                                        <div className='calculator_inputs'>
                                            <CalculatorInput id='age' inputStyle='calculator_input' title='Age' register={register}/>
                                            <CalculatorInput id='weight' inputStyle='calculator_input' title='Weight' register={register}/>
                                            <CalculatorInput id='height' inputStyle='calculator_input' title='Height' register={register}/>
                                        </div>
                                        <UtilityButton styles={`${inputsReady === true ? 'calculator_custom_calculate_button' : 'calculator_custom_calculate_button_disabled'}`} title='Calculate' onClick={calculateCustom} disabled={!inputsReady}/>
                                    </div>
                                    {loading ? <Loader divStyle='calculator_loader' size={36} color={'#488eff'} loaderStyle='calculator_loader_icon'/>
                                        : (
                                            
                                            (showCustom && 
                                                <div className='calculator_result'>
                                                    <h3>Your BMI value is {`${bmiValue.data.bmi}`} and your health is {`${bmiValue.data.health}`} !</h3>
                                                </div>)
                                        )
                                    }
                                </>
                                : <></>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default BMICalculator;