import '../../Styles/buttons.css';

const UtilityButton = ({styles, title, icon, onClick, disabled}) => {
    return (
        <button onClick={onClick} className={`${styles}`} disabled={disabled}>
            <p>{title}</p>
            {icon}
        </button>
    )
}

export default UtilityButton;