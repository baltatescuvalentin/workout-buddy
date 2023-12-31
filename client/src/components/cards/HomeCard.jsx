import '../../Styles/styles.css';

const HomeCard = ({icon, text, title}) => {
    return (
        <div className='homepage_card'>
            <h2>{title}</h2>
            {icon}
            <p>{text}</p>
        </div>
    )
}

export default HomeCard;