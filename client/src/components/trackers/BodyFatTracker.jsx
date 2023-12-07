import '../../Styles/fitness.css';
import '../../Styles/inputs.css';
import '../../Styles/buttons.css';
import { useEffect, useState } from 'react';
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import UtilityButton from '../buttons/UtilityButton';
import CalculatorInput from '../inputs/CalculatorInput';
import IdentityInput from '../inputs/IdentityInput';

const BodyFatTracker = ({id, register, setValue, watch, getValues, value}) => {

    const [edit, setEdit] = useState(false);
    const [inputsReady, setInputsReady] = useState(false);
    const [bodyFatValue, setBodyFatValue] = useState(value);

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


    const changeEdit = () => {
        setEdit(prev => !prev);
        reset();
    }

    useEffect(() => {
        const inputsReady = () => {
            if(watchBF('sex') === "") {
                return false;
            }
            if(watchBF('age') === "" || watchBF('height') === "" || watchBF('weight') === "" || watchBF('neck') === "" || watchBF('waist') === "") {
                return false;
            }
            if(parseInt(watchBF('age')) < 2) {
                return false;
            }
            if(parseInt(watchBF('height')) < 130 || parseInt(watchBF('height')) > 230) {
                return false;
            }
            if(parseInt(watchBF('weight')) < 40  || parseInt(watchBF('weight')) > 160) {
                return false;
            }
            if(parseInt(watchBF('neck')) < 20 || parseInt(watchBF('neck')) > 80) {
                return false;
            }
            if(parseInt(watchBF('waist')) < 40 || parseInt(watchBF('waist')) > 130) {
                return false;
            }
            if(parseInt(watchBF('hip')) < 40 || parseInt(watchBF('hip')) > 130) {
                return false;
            }
            return true;
        }

        setInputsReady(inputsReady());
    }, [watchBF('height'), watchBF('sex'), watchBF('age'), watchBF('weight'), watchBF('hip'), watchBF('waist'), watchBF('neck')]);

    const getBopdyFat = () => {
        calculateBodyFat(getValuesBF('age'), getValuesBF('sex'), getValuesBF('weight'), getValuesBF('height'),
            getValuesBF('neck'), getValuesBF('waist'), getValuesBF('hip'));
        console.log(watch('bodyFat'));
        
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
                setBodyFatValue(response.data.data['Body Fat (BMI method)']);
                setValue('bodyFat', response.data.data['Body Fat (BMI method)']);
                console.log(response.data.data['Body Fat (BMI method)']);
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
                                <p>Body Fat %</p>
                                <input className='tracker_input' type='number' id={id} value={bodyFatValue} {...register(id)}/>
                            </div>
                            <div className='tracker_buttons'>
                                <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaSave className='tracker_button_icon'/>}/>
                                <UtilityButton styles='tracker_button' onClick={changeEdit} icon={<FaTimes className='tracker_button_icon_cancel'/>}/>
                            </div>
                        </div>
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
                            <UtilityButton styles={`${inputsReady === true ? 'calculator_custom_calculate_button' : 'calculator_custom_calculate_button_disabled'}`} title='Calculate' onClick={getBopdyFat} disabled={!inputsReady}/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='tracker_header'>
                            <div className='tracker_title_input'>
                                <p>Body Fat %</p>
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

export default BodyFatTracker;