import '../../Styles/auth.css';
import '../../Styles/inputs.css';

const InfoCard = ({icon, id, title, register, placeholder, value}) => {
    return (
        <div className='info_card'>
            <div className='info_header'>
                <p>{title}</p>
                {icon}
            </div>
            <input id={id} type='number' value={value} className='info_input' {...register(id)} placeholder={placeholder}/>
        </div>
    )
}

export default InfoCard;