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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLogin } from '../../state';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners";

const AdditionalInfo = () => {

    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname;

    const {
        register,
        setValue,
        getValues,
        watch,
    } = useForm({
        defaultValues: {
            sex: user?.sex || '',
            age: user?.age || "",
            height: user?.height || "",
            weight: user?.weight || "", 
        }
    })

    const cancel = () => {
        if(from.includes('register')) {
            navigate('/login');
        }
        else {
            navigate(-1);
        }
    }

    const saveToDB = async () => {
        setLoading(true);

        const data = {
            id: user._id,
            age: parseInt(getValues('age')),
            height: parseInt(getValues('height')),
            weight: parseInt(getValues('weight')),
            sex: getValues('sex'),
        }

        await axios.patch('http://localhost:3001/auth/update', data)
            .then((response) => {
                dispatch(setLogin({
                    user: response.data.user,
                    token: token,
                }));
                if(from.includes('register')) {
                    navigate('/login');
                }
                else {
                    navigate('/');
                }
                toast.success('Information changed!');
            })
            .catch((error) => {
                if(error.response.data.message) {
                    toast.error(error.response.data.message, { duration: 3000});
                }
                else {
                    toast.error(error.error , { duration: 3000});
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className='wrapper'>
            <div className='info_wrapper'>
                <p className='info_title'>Additional Info</p>
                <p className='info_subtitle'>Please use metric system (kgs, cms)</p>
                <div className='info_cards_wrapper'>
                    <InfoCard id='age' value={watch('age')} title='Age' register={register} icon={<BsCalendarEventFill className='icon'/>} placeholder='Age'/>
                    <InfoCard id='height' value={watch('height')} title='Height' register={register} icon={<GiBodyHeight className='icon'/>} placeholder='Height'/>
                    <InfoCard id='weight' value={watch('weight')} title='Weight' register={register} icon={<FaWeight className='icon'/>} placeholder='Weight'/>
                    <IdentityCard value={watch('sex')} setValue={setValue}/>
                </div>
                <div className='info_buttons'>
                    <UtilityButton title='Cancel' onClick={cancel} icon={<MdOutlineCancel className='info_cancel_button_icon'/>} styles='info_cancel_button'/>
                    <UtilityButton title={!loading && 'Save'} onClick={saveToDB} icon={loading ? <ClipLoader size={19}/> : <FaSave className='info_cancel_button_icon'/>} styles='info_save_button'/>
                </div>
            </div>
        </div>
    )
}

export default AdditionalInfo;