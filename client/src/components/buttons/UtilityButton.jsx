import '../../Styles/buttons.css';

const UtilityButton = ({styles, title, icon, onClick}) => {
    return (
        <button onClick={onClick} className={`${styles}`}>
            <p>{title}</p>
            {icon}
        </button>
    )
}

export default UtilityButton;