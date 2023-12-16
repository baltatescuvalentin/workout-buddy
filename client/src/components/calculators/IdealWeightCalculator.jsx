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
import IdentityInput from '../inputs/IdentityInput';

const IdealWeightCalculator = () => {

    const [details, setDetails] = useState(false);
    const [idealWeight, setIdealWeight] = useState(0);
    const [calculateOption, setCalculateOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showCustom, setShowCustom] = useState(false);
    const [inputsReady, setInputsReady] = useState(false);
    const user = useSelector(state => state.user);
    console.log(user);
    console.log(user?.sex);
    console.log(user?.height);

    const {
        register,
        watch,
        getValues,
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            sex: '',
            height: 0,
        }
    })

    const checkForInfo = () => {
        return user?.sex && user?.height && (user?.height >= 130 && user?.height <= 230) && (user?.sex === 'male' || user?.sex === 'female');
    }

    const handleDetails = () => {
        setDetails(prev => !prev);
    }

    const accountOption = () => {
        setCalculateOption('account');
        calculateIdealWeight(user?.height, user?.sex);
        setShowCustom(false);
        reset();
        console.log(idealWeight);
    }

    const customOption = () => {
        setCalculateOption('custom');
    }

    const calculateCustom = () => {
        setShowCustom(true);
        calculateIdealWeight(getValues('height'), getValues('sex'));
        console.log(idealWeight);
    }

    useEffect(() => {
        const inputsReady = () => {
            if(watch('sex') === "") {
                return false;
            }
            if(watch('height') === "") {
                return false;
            }
            if(parseInt(watch('height')) < 130 || parseInt(watch('height')) > 230) {
                return false;
            }

            return true;
        }

        setInputsReady(inputsReady());
        console.log(watch('height'));
        console.log(watch('sex'));
    }, [watch]);

    const calculateIdealWeight = async (height, gender) => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://fitness-calculator.p.rapidapi.com/idealweight',
            params: {
              gender: gender,
              height: height
            },
            headers: {
                'X-RapidAPI-Key': 'f5b195d257msh77ce462a18d0527p16570ajsn40652ebe82e7',
                'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }
          };

          await axios.request(options)
            .then((response) => {
                setIdealWeight(response.data);
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
                <p className='calculator_title'>Ideal Weight Calculator</p>
                <ExpandButton btnStyles='calculator_expand' iconStyles='calculator_expand_icon' onClick={handleDetails}/>
            </div>
            {
                details && (
                    <div className='calculator_content_wrapper'>
                        <p>Find your ideal weight score. There are two parameters which are age and height(cm) values.</p>
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
                                        <h3>Your ideal weight should be {`${idealWeight.data.Devine}`} kgs !</h3>
                                        </div>)
                            )
                            : calculateOption === 'custom' ?
                                <>
                                    <div className='calculator_custom_wrapper'>
                                        <div className='calculator_inputs_with_gender'>
                                            <CalculatorInput id='height' inputStyle='calculator_input' title='Height' register={register}/>
                                            <IdentityInput setValue={setValue} />
                                        </div>
                                        <UtilityButton styles={`${inputsReady === true ? 'calculator_custom_calculate_button' : 'calculator_custom_calculate_button_disabled'}`} title='Calculate' onClick={calculateCustom} disabled={!inputsReady}/>
                                    </div>
                                    {loading ? <Loader divStyle='calculator_loader' size={36} color={'#488eff'} loaderStyle='calculator_loader_icon'/> 
                                        : (
                                            
                                            (showCustom && 
                                                <div className='calculator_result'>
                                                    <h3>Your ideal weight should be {`${idealWeight.data.Devine}`} kgs !</h3>
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

export default IdealWeightCalculator;