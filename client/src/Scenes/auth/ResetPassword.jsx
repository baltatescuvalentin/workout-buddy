import { useEffect, useState } from 'react';
import '../../Styles/auth.css';
import resetImage from '../../utils/images/reset.jpg';
import ChangePasswordInput from '../../components/inputs/ChangePasswordInput';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state';
import { useNavigate } from 'react-router-dom';
import AuthSubmitButton from '../../components/buttons/AuthSubmitButton';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {

    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        reset();
        setStep(1);
        return () => {
            reset();
            setStep(1);
        }
    }, [reset])

    let emailForm = {
        required: 'Email is required',
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
        }
    };

    let passwordForm = {
        required: 'Password is required',
        minLength: {
            message: 'Password should be at least 8 characters',
            value: 8,
        }
    };

    const findUser = async () => {
        setLoading(true);
        const email = getValues('email');

        await axios.post(`https://workout-buddy-3j5n.onrender.com/auth/user`, {
            email,
        }).then((response) => {
            if(response.status === 200) {
                setStep(2);
            }
            setErrorMessage("");
        })
            .catch((error) => {
                setErrorMessage(error.response.data.message)
            })
            .finally(() => {
                setLoading(false);
            })
    };

    const onSubmit = async (data) => {
        setLoading(true);

        await axios.patch('https://workout-buddy-3j5n.onrender.com/auth/changepassword', data)
            .then(() => {
                dispatch(setLogout());
                toast.success('Password changed')
                setStep(1);
                navigator('/login');
            })
            .catch((error) => {
                setErrorMessage(error.reponse.data.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className="wrapper">
            <div className='container'>
                <img src={resetImage} alt='Register' className='image' loading='lazy'/>
                <div className='auth_wrapper'>
                    <h1>Change Password</h1>
                    <div className='changepassword_wrapper'>
                        <h3>{step === 1 ? 'Your email address' : 'New password'}</h3>
                        {errorMessage && <p className='error_text_server'>{errorMessage}</p>}
                        {
                            step === 1 ? 
                                <ChangePasswordInput id="email" type="email" placeholder='Email' register={register} errors={errors} errorMessage={emailForm}/>
                            : <ChangePasswordInput id="password" type="password" placeholder='Password' register={register} errors={errors} errorMessage={passwordForm} />
                        }
                        {
                            step === 1 ? <AuthSubmitButton loading={loading} text='Next' onSubmit={handleSubmit(findUser)}/>
                                : <AuthSubmitButton loading={loading} text='Submit' onSubmit={handleSubmit(onSubmit)}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;