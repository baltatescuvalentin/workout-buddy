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
import IdentityInput from '../inputs/IdentityInput';
import toast from 'react-hot-toast';

const BodyFatTracker = ({id, register, setValue, watch, getValues, value, saveToTracker, deleteFromTracker}) => {

    const [edit, setEdit] = useState(false);
    const [inputsReady, setInputsReady] = useState(false);
    const [calculate, setCalculate] = useState(false);

    const {
        register: registerBF,
        watch: watchBF,
        getValues: getValuesBF,
        setValue: setValueBF,
        reset,
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

    const saveToDB = () => {
        setEdit(prev => !prev);
        setCalculate(false);
        reset();
        saveToTracker();
    }

    const deleteAction = () => {
        setEdit(prev => !prev);
        deleteFromTracker(id);
        setValue(id, 0);
    }

    const handleCalculate = () => {
        setCalculate(prev => !prev);
    }

    let ageEffect = watchBF('age');
    let heightEffect =  watchBF('height');
    let weightEffect = watchBF('weight');
    let neckEffect = watchBF('neck');
    let waistEffect = watchBF('waist');
    let hipEffect = watchBF('hip');
    let sexEffect = watchBF('sex');

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

    const getBodyFat = () => {
        setCalculate(false);
        calculateBodyFat(getValuesBF('age'), getValuesBF('sex'), getValuesBF('weight'), getValuesBF('height'),
            getValuesBF('neck'), getValuesBF('waist'), getValuesBF('hip'));
        
    }
    
    const calculateBodyFat = async (age, gender, weight, height, neck, waist, hip) => {
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
                setValue('bodyFat', response.data.data['Body Fat (BMI method)']);
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
                                <p>Body Fat %</p>
                                {
                                    calculate ? <p>{getValues(id)}</p> : <input className='tracker_input' type='number' value={watch(id)} {...register(id)}/>
                                }
                            </div>
                            <div className='tracker_buttons'>
                                <UtilityButton styles='tracker_button' onClick={saveToDB} icon={<FaSave className='tracker_button_icon'/>}/>
                                <UtilityButton styles='tracker_button' onClick={deleteAction} icon={<FaTrashCan className='tracker_button_icon_cancel'/>}/>
                                <UtilityButton styles='tracker_button' onClick={closeEdit} icon={<FaTimes className='tracker_button_icon_cancel'/>}/>
                            </div>
                        </div>
                        {
                            calculate ? (
                                <div className='calculator_custom_wrapper'>
                                    <div className='calculator_inputs_with_gender'>
                                        <CalculatorInput id='age' inputStyle='calculator_input' title='Age' register={registerBF}/>
                                        <IdentityInput setValue={setValueBF} />
                                        <CalculatorInput id='weight' inputStyle='calculator_input' title='Weight' register={registerBF}/>
                                        <CalculatorInput id='height' inputStyle='calculator_input' title='Height' register={registerBF}/>
                                        <CalculatorInput id='neck' inputStyle='calculator_input' title='Neck' register={registerBF}/>
                                        <CalculatorInput id='waist' inputStyle='calculator_input' title='Waist' register={registerBF}/>
                                        <CalculatorInput id='hip' inputStyle='calculator_input' title='Hip' register={registerBF}/>
                                    </div>
                                    <div className='tracker_custom_buttons'>
                                        <UtilityButton styles={`${inputsReady === true ? 'calculator_custom_calculate_button' : 'calculator_custom_calculate_button_disabled'}`} title='Calculate' onClick={getBodyFat} disabled={!inputsReady}/>
                                        <UtilityButton onClick={handleCalculate} styles='tracker_calculate_button' title='Your value' />
                                    </div>
                                    
                                </div>
                            ) : <UtilityButton onClick={handleCalculate} styles='tracker_calculate_button' title='Calculate value' />
                        }
                    </>
                ) : (
                    <>
                        <div className='tracker_header'>
                            <div className='tracker_title_input'>
                                <p>Body Fat %</p>
                                <p className='tracker_value'>{value}</p>
                            </div>
                            <div className='tracker_buttons'>
                                <UtilityButton styles='tracker_button' onClick={openEdit} icon={<FaEdit className='tracker_button_icon'/>}/>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default BodyFatTracker;