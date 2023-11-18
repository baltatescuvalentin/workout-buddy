import '../../Styles/auth.css';
import '../../Styles/inputs.css';

const InfoCard = ({icon, id, title, register, placeholder}) => {
    return (
        <div className='info_card'>
            <div>{icon}</div>
            {title}
            <input id={id} type='number' className='info_input' {...register(id)} placeholder={placeholder}/>
        </div>
    )
}

export default InfoCard;