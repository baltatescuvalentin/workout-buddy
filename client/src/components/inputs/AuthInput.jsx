import '../../Styles/inputs.css';

const AuthInput = ({id, label, type, placeholder, register, errorMessage, errors, Icon}) => {
    return (
        <div className='auth_wrapper'>
            <label htmlFor={id} className='auth_label'>
                <Icon className='auth_label_icon' />
                {label}
            </label>
            <input id={id} type={type} placeholder={placeholder} {...register(id, errorMessage)} className={errors[id] ? 'auth_error' : 'auth_idle'} />
            {errors[id] && <p className='error_text'>{errors[id].message}</p>}
        </div>
    )
}

export default AuthInput;