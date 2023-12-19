//User can set goals and get a message how far is he that changes dinamically with the data from tracker,
// reset password and change account info, a table with lowest, average and highest stats from tracker
import { useEffect, useState } from 'react';
import '../Styles/styles.css';
import '../Styles/buttons.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader';
import UtilityButton from '../components/buttons/UtilityButton';
import { useLocation, useNavigate } from 'react-router-dom';
import TableTracker from '../components/TableTracker';
import toast from 'react-hot-toast';

const Profile = () => {

    const [info, setInfo] = useState(null);
    const [tableValues, setTableValues] = useState([]);
    const [loading, setLoading] = useState(null);
    const user = useSelector(state => state.user);
    const jwt = useSelector(state => state.token);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }

        const fetchData = async () => {
            setLoading(true);

            await axios.get(`https://workout-buddy-3j5n.onrender.com/auth/getProfileInfo/${user._id}`, options)
                .then((response) => {
                    setInfo(response.data.user);
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

        const getTableData = async () => {

            if(!user) {
                return;
            }

            setLoading(true);

            await axios.get(`https://workout-buddy-3j5n.onrender.com/tracker/getTrackerMetrics/${user._id}`, options) 
                .then((response) => {
                    setTableValues(response.data.metrics)
                })
                .catch((error) => {
                    
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        fetchData();
        getTableData();
    }, [user, jwt])

    return (
        <div className='workout_wrapper'>
            <div className='workouts_create_wrapper'>
                {
                    loading ? <Loader divStyle='pages_loader' size={42} color='#488eff'/> 
                        : (
                            <>
                                <h1>Profile</h1>
                                <div className='profile_info_wrapper'>
                                    {
                                        info?.fullName && (
                                            <div className='profile_info'>
                                                <p className='profile_info_label'>Fullname</p>
                                                <p className='profile_info_value'>{info?.fullName}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        info?.userName && (
                                            <div className='profile_info'>
                                                <p className='profile_info_label'>Username</p>
                                                <p className='profile_info_value'>{info?.userName}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        info?.email && (
                                            <div className='profile_info'>
                                                <p className='profile_info_label'>Email</p>
                                                <p className='profile_info_value'>{info?.email}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        info?.age && (
                                            <div className='profile_info'>
                                                <p className='profile_info_label'>Age</p>
                                                <p className='profile_info_value'>{info?.age}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        info?.sex && (
                                            <div className='profile_info'>
                                                <p className='profile_info_label'>Sex</p>
                                                <p className='profile_info_value'>{info?.sex}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        info?.weight && (
                                            <div className='profile_info'>
                                                <p className='profile_info_label'>Weight</p>
                                                <p className='profile_info_value'>{info?.weight} kgs</p>
                                            </div>
                                        )
                                    }
                                    {
                                        info?.height && (
                                            <div className='profile_info'>
                                                <p className='profile_info_label'>Height</p>
                                                <p className='profile_info_value'>{info?.height} cm</p>
                                            </div>
                                        )
                                    }

                                </div>

                                <div className='profile_buttons'>
                                    <UtilityButton onClick={() => navigate('/resetpassword')} styles='profile_button' title='Reset Password'/>
                                    <UtilityButton onClick={() => navigate('/additionalinfo', { state: { from: location }})} styles='profile_button' title='Change Info'/>
                                </div>
                                <div className='profile_table_wrapper'>
                                    <h2>Tracker Table</h2>
                                    <TableTracker tableValues={tableValues}/>
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    )
}

export default Profile;