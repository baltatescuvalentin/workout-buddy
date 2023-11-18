import { useNavigate } from "react-router-dom"


const WorkoutsRedirectButton = ({path, title}) => {

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(path)} className="workouts_redirect_button">
            {title}
        </button>
    )
}

export default WorkoutsRedirectButton;