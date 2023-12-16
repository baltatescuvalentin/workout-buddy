import { useEffect, useState } from 'react';
import '../../Styles/workouts.css';
import '../../Styles/styles.css';
import { useSelector } from 'react-redux';
import WorkoutRoutine from '../../components/WorkoutRoutine';
import axios from 'axios';
import NotLogged from '../../components/NotLogged';
import Loader from '../../components/Loader';

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
                    if(error.error) {
                        console.log(error.error)
                    }
                    else if(error.response.message) {
                        console.log(error.response.message);
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
                                    console.log(index, workout);
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