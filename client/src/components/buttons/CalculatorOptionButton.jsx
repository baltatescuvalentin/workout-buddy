import '../../Styles/buttons.css';

const CalculatorOptionButton = ({onClick, title}) => {
    return (
        <button className='calculator_option_button' onClick={onClick}>
            {title}
        </button>
    )
}

export default CalculatorOptionButton;