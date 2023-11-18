import '../../Styles/buttons.css';
import { ClipLoader } from "react-spinners";

const AuthSubmitButton = ({loading, text, onSubmit}) => {
    return (
        <button onClick={onSubmit} className={loading ? 'auth_loading_button' : 'auth_submit_button'}>
            {loading ? <ClipLoader size={20} color="white"/> : text}
        </button>
    )
}

export default AuthSubmitButton;