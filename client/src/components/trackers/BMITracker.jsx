import '../../Styles/fitness.css';
import '../../Styles/inputs.css';
import '../../Styles/buttons.css';
import { useEffect, useState } from 'react';
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UtilityButton from '../buttons/UtilityButton';
import CalculatorInput from '../inputs/CalculatorInput';


const BMITracker = ({id, register, setValue, watch, getValues, value}) => {

    const [edit, setEdit] = useState(false);
    const [inputsReady, setInputsReady] = useState(false);
    const [bmiValue, setBmiValue] = useState(value);
    const [calculate, setCalculate] = useState(false);

    const {
        register: registerBMI,
        watch: watchBMI,
        getValues: getValuesBMI,
        reset,
    } = useForm({
        defaultValues: {
            age: 0,
            weight: 0,
            height: 0,
        }
    });

    const changeEdit = () => {
        setEdit(prev => !prev);
        reset();
    }

    const openEdit = () => {
        setEdit(prev => !prev);
        setCalculate(false);
        reset();
    }

    const closeEdit = () => {
        setEdit(prev => !prev);
        setCalculate(false);
        reset();
    }

    const handleCalculate = () => {
        setCalculate(prev => !prev);
    }

    const changeValue = (e) => {
        setBmiValue(e.target.value);
    }

    useEffect(() => {
        const ready = () => {
            if(watchBMI('age') === "" || watchBMI('height') === "" || watchBMI('weight') === "") {
                return false;
            }
            if(parseInt(watchBMI('age')) < 1) {
                return false;
            }
            if(parseInt(watchBMI('height')) < 130 || parseInt(watchBMI('height')) > 230) {
                return false;
            }
            if(parseInt(watchBMI('weight')) < 40 || parseInt(watchBMI('weight')) > 160) {
                return false;
            }
    
            return true;
        }

        setInputsReady(ready());
    }, [watchBMI('age'), watchBMI('height'), watchBMI('weight')]);

    const getBMI = () => {
        calculateBMI(getValuesBMI('age'), getValuesBMI('weight'), getValuesBMI('height'));
        console.log(watch('BMI'));
    }

    const calculateBMI = async (age, weight, height) => {
        
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
                setValue('BMI', response.data.data.bmi);
                setBmiValue(response.data.data.bmi);
                console.log(response.data.data.bmi);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                
            })
    }

    return (
        <div>
            {
                edit ? (
                    <>
                        <div className='tracker_header'>
                            <div className='tracker_title_input'>
                                <p>BMI</p>
                                {
                                    calculate ? <p>{bmiValue}</p> : <input className='tracker_input' type='number' value={bmiValue} onChange={changeValue}/>
                                }
                            </div>
                            <div className='tracker_buttons'>
                                <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaSave className='tracker_button_icon'/>}/>
                                <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaTimes className='tracker_button_icon_cancel'/>}/>
                            </div>
                        </div>
                        {
                            calculate ? (
                                <div className='calculator_custom_wrapper'>
                                    <div className='calculator_inputs'>
                                        <CalculatorInput id='age' inputStyle='calculator_input' title='Age' register={registerBMI}/>
                                        <CalculatorInput id='weight' inputStyle='calculator_input' title='Weight' register={registerBMI}/>
                                        <CalculatorInput id='height' inputStyle='calculator_input' title='Height' register={registerBMI}/>
                                    </div>
                                    <div className='tracker_custom_buttons'>
                                        <UtilityButton styles={`${inputsReady === true ? 'calculator_custom_calculate_button' : 'calculator_custom_calculate_button_disabled'}`} title='Calculate' onClick={getBMI} disabled={!inputsReady}/>
                                        <UtilityButton onClick={handleCalculate} styles='tracker_calculate_button' title='Your value' />
                                    </div>
                                </div>
                            ) : (
                                <UtilityButton onClick={handleCalculate} styles='tracker_calculate_button' title='Calculate value' />
                            )
                        }
                    </>
                ) : (
                    <>
                        <div className='tracker_header'>
                            <div className='tracker_title_input'>
                                <p>BMI</p>
                                <p className='tracker_value'>{value}</p>
                            </div>
                            <div className='tracker_buttons'>
                                <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaEdit className='tracker_button_icon'/>}/>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default BMITracker;