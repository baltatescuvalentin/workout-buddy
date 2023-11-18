import { PiGenderIntersexBold } from 'react-icons/pi';
import { GiBodyHeight } from 'react-icons/gi';
import { FaWeight } from 'react-icons/fa';
import { BsCalendarEventFill } from 'react-icons/bs';
import '../../Styles/auth.css';
import { useForm } from 'react-hook-form';
import InfoCard from '../../components/cards/InfoCard';

const AdditionalInfo = () => {

    const {
        register,
        setValue,
        getValues,
        reset,
    } = useForm({
        defaultValues: {
            sex: '',
            age: 0,
            height: 0,
            weight: 0, 
        }
    })

    return (
        <div className='wrapper'>
            <div className='info_wrapper'>
                <InfoCard id='age' title='Age' register={register} Icon={<BsCalendarEventFill className='icon'/>} placeholder='Age'/>
            </div>
        </div>
    )
}

export default AdditionalInfo;