import { useEffect, useState } from 'react';
import '../../Styles/workouts.css';
import '../../Styles/styles.css';
import { useSelector } from 'react-redux';
import WorkoutRoutine from '../../components/WorkoutRoutine';
import axios from 'axios';
import NotLogged from '../../components/NotLogged';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

const MyWorkouts = () => {

    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useSelector(state => state.user);
    const jwt = useSelector(state => state.token);

    useEffect(() => {

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }

        const fetchData = async () => {

            if(!user) {
                return;
            }

            setLoading(true);

            await axios.get(`http://localhost:3001/workoutroutine/getWorkouts/${user._id}`, options)
                .then((response) => {
                    setWorkouts([...response.data.workouts]);
                    setLoading(false);
                })
                .catch((error) => {
                    if(error.response.data.message) {
                        toast.error(error.response.data.message, { duration: 3000});
                    }
                    else {
                        toast.error(error.error , { duration: 3000 });
                    }
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        fetchData();
    }, [jwt, user]);

    return (
        <div className='workout_wrapper'>
            <div className='workouts_create_wrapper'>
                <h1>
                    My Workouts
                </h1>
                <p>
                   Here you will have all your workouts that you created where you can see, edit and use them in your workout
                   routines!
                </p>
                {
                    !user ? <NotLogged /> : 
                    loading ? <Loader divStyle='pages_loader' size={42} color='#488eff'/> : 
                    (
                        <div className='myworkouts_workouts'>
                            {workouts.length > 0 && (
                                workouts.map((workout, index) => {
                                    return <WorkoutRoutine key={index} workout={workout}/>
                                })
                            )}
                        </div> 
                    )
                }
                
            </div>
            
        </div>  
    )
}

export default MyWorkouts;