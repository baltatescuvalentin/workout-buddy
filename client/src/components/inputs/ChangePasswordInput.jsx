import '../../Styles/inputs.css';
import AuthInput from './AuthInput';

const ChangePasswordInput = ({id, placeholder, register, type, errorMessage, errors}) => {
    return (
        <div className='auth_wrapper'>
            <input type={type} placeholder={placeholder} {...register(id, errorMessage)} className={errors[id] ? 'auth_error' : 'auth_idle'}/>
            {errors[id] && <p className='error_text'>{errors[id].message}</p>}
        </div>
    )
}

export default ChangePasswordInput;