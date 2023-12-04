import '../../Styles/fitness.css';
import '../../Styles/inputs.css';

const CalculatorInput = ({title, id, register, inputStyle}) => {
    return (
        <div className='calculator_input_wrapper'>
            <p>{title}</p>
            <input id={id} {...register(id)} className={inputStyle} type='number'/>
        </div>
    )
}

export default CalculatorInput;