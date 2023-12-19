import '../../Styles/auth.css';
import AuthInput from '../../components/inputs/AuthInput';
import registerImage from '../../utils/images/register.jpg';
import { useForm } from 'react-hook-form';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { BiSolidLockAlt } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import AuthSubmitButton from '../../components/buttons/AuthSubmitButton';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Register = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            email: '',
            fullName: '',
            userName: '',
            password: '',
        }
    });

    useEffect(() => {
        reset();

        return () => reset();
    }, [reset]);

    let fullnameForm = {
        required: 'Firstname is required'
    }

    let usernameForm = {
        required: 'Username is required',
        minLength: {
            message: 'Username should be at least 5 characters',
            value: 5,
        }
    }

    let passwordForm = {
        required: 'Password is required',
        minLength: {
            message: 'Password should be at least 8 characters',
            value: 8,
        }
    }

    let emailForm = {
        required: 'Email is required',
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
            
        await axios.post('http://localhost:3001/auth/register', data)
            .then(() => {
                navigate('/additionalinfo', { state: { from: location }});
                toast.success('Account successfully created');
            })
            .catch((error) => {
                setError('This email is already used!');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="wrapper">
            <div className='container'>
                <img src={registerImage} alt='Register' className='image' loading='lazy'/>
                <div className='auth_wrapper'>
                    <h1>Register</h1>
                    {error && <p className='error_text_server'>{error}</p>}
                    <form className='form_wrapper'>
                        <AuthInput id="fullName" type="text" placeholder="Fullname" label="Fullname" Icon={BsFillPersonFill} register={register} errors={errors} errorMessage={fullnameForm} />
                        <AuthInput id="userName" type="text" placeholder="Username" label="Username" Icon={BsFillPersonFill} register={register} errors={errors} errorMessage={usernameForm} />
                        <AuthInput id="email" type="email" placeholder="Email" label="Email" Icon={MdEmail} register={register} errors={errors} errorMessage={emailForm} />
                        <AuthInput id="password" type="password" placeholder="Password" label="Password" Icon={BiSolidLockAlt} register={register} errors={errors} errorMessage={passwordForm} />
                    </form>
                    <AuthSubmitButton loading={loading} text='Submit' onSubmit={handleSubmit(onSubmit)}/>
                    <hr />
                    <p className='extra_text'>
                        Already have an account? <span onClick={() => navigate('/login')}>Log in!</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;