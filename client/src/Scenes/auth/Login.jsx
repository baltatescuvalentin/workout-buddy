import { useNavigate } from 'react-router-dom';
import '../../Styles/auth.css';
import loginImage from '../../utils/images/login.jpg';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiSolidLockAlt } from 'react-icons/bi';
import AuthSubmitButton from '../../components/buttons/AuthSubmitButton';
import axios from 'axios';
import AuthInput from '../../components/inputs/AuthInput';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import { toast } from 'react-hot-toast';


const Login = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            userName: '',
            password: '',
        }
    });

    useEffect(() => {
        reset();

        return () => reset();
    }, []);

    let usernameForm = {
        required: 'Username is required'
    }

    let passwordForm = {
        required: 'Password is required'
    }

    const onSubmit = (data) => {
        setLoading(true);

        const response = axios.post('http://localhost:3001/auth/login', data);
            
        response.then((response) => {
                toast.success('Logged in')
                navigate('/');
                dispatch(setLogin({
                    user: response.data.user,
                    token: response.data.token
                }));
            })
            .catch((error) => {
                setError(error.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="wrapper">
            <div className='container'>
                <img src={loginImage} alt='Register' className='image' loading='lazy'/>
                <div className='auth_wrapper'>
                    <h1>Login</h1>
                    {error && <p className='error_text_server'>{error}</p>}
                    <form className='form_wrapper small_container'>
                        <AuthInput id="userName" type="text" placeholder="Username" label="Username" Icon={BsFillPersonFill} register={register} errors={errors} errorMessage={usernameForm} />
                        <AuthInput id="password" type="password" placeholder="Password" label="Password" Icon={BiSolidLockAlt} register={register} errors={errors} errorMessage={passwordForm} />
                    </form>
                    <AuthSubmitButton loading={loading} text='Submit' onSubmit={handleSubmit(onSubmit)}/>
                    <hr />
                    <p className='extra_text'>
                        <span onClick={() => navigate('/resetpassword')}>Forgot password?</span>
                    </p>
                    <p className='extra_text'>
                        Don't have an account? <span onClick={() => navigate('/register')}>Register!</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;