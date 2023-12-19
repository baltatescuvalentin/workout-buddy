import '../../Styles/fitness.css';
import '../../Styles/inputs.css';
import '../../Styles/buttons.css';
import { useEffect, useState } from 'react';
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UtilityButton from '../buttons/UtilityButton';
import CalculatorInput from '../inputs/CalculatorInput';
import toast from 'react-hot-toast';

const BMITracker = ({id, register, setValue, watch, getValues, value, saveToTracker, deleteFromTracker}) => {

    const [edit, setEdit] = useState(false);
    const [inputsReady, setInputsReady] = useState(false);
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

    const saveToDB = () => {
        setEdit(prev => !prev);
        reset();
        saveToTracker();
    }

    const handleCalculate = () => {
        setCalculate(prev => !prev);
    }

    const deleteAction = () => {
        setEdit(prev => !prev);
        deleteFromTracker(id);
        setValue(id, 0);
    }

    let ageEffect = watchBMI('age');
    let heightEffect =  watchBMI('height');
    let weightEffect = watchBMI('weight');

    useEffect(() => {
        const ready = () => {
            if(ageEffect === "" || heightEffect === "" || weightEffect === "") {
                return false;
            }
            if(parseInt(ageEffect) < 1) {
                return false;
            }
            if(parseInt(heightEffect) < 130 || parseInt(heightEffect) > 230) {
                return false;
            }
            if(parseInt(weightEffect) < 40 || parseInt(weightEffect) > 160) {
                return false;
            }
    
            return true;
        }

        setInputsReady(ready());
    }, [weightEffect, ageEffect, heightEffect]);

    const getBMI = () => {
        setCalculate(false);
        calculateBMI(getValuesBMI('age'), getValuesBMI('weight'), getValuesBMI('height'));
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
                                    calculate ? <p>{getValues(id)}</p> : <input className='tracker_input' type='number' value={watch(id)} {...register(id)}/>
                                }
                            </div>
                            <div className='tracker_buttons'>
                                <UtilityButton styles='tracker_button' onClick={saveToDB} icon={<FaSave className='tracker_button_icon'/>}/>
                                <UtilityButton styles='tracker_button' onClick={deleteAction} icon={<FaTrashCan className='tracker_button_icon_cancel'/>}/>
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