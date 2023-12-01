import { GiBodyHeight } from 'react-icons/gi';
import { FaWeight } from 'react-icons/fa';
import { BsCalendarEventFill } from 'react-icons/bs';
import { MdOutlineCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import '../../Styles/auth.css';
import { useForm } from 'react-hook-form';
import InfoCard from '../../components/cards/InfoCard';
import UtilityButton from '../../components/buttons/UtilityButton';
import IdentityCard from '../../components/cards/IdentityCard';

const AdditionalInfo = () => {

    const {
        register,
        setValue,
        getValues,
        reset,
    } = useForm({
        defaultValues: {
            sex: '',
            age: '',
            height: '',
            weight: '', 
        }
    })

    return (
        <div className='wrapper'>
            <div className='info_wrapper'>
                <p className='info_title'>Additional Info</p>
                <div className='info_cards_wrapper'>
                    <InfoCard id='age' title='Age' register={register} icon={<BsCalendarEventFill className='icon'/>} placeholder='Age'/>
                    <InfoCard id='height' title='Height' register={register} icon={<GiBodyHeight className='icon'/>} placeholder='Height'/>
                    <InfoCard id='weight' title='Weight' register={register} icon={<FaWeight className='icon'/>} placeholder='Weight'/>
                    <IdentityCard setValue={setValue}/>
                </div>
                <div className='info_buttons'>
                    <UtilityButton title='Cancel' icon={<MdOutlineCancel className='info_cancel_button_icon'/>} styles='info_cancel_button'/>
                    <UtilityButton title='Save' icon={<FaSave className='info_cancel_button_icon' />} styles='info_save_button'/>
                </div>
            </div>
        </div>
    )
}

export default AdditionalInfo;