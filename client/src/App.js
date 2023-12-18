import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './Scenes/homepage/HomePage';
import './Styles/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { setExercices, setLogout, setMNavbar } from './state';
import { useEffect } from 'react';
import Register from './Scenes/auth/Register';
import Login from './Scenes/auth/Login';
import ResetPassword from './Scenes/auth/ResetPassword';
import ToastProvider from './providers/ToastProvider';
import AdditionalInfo from './Scenes/auth/AdditionalInfo';
import SharedLayout from './components/SharedLayout';
import MobileWrapper from './components/MobileWrapper';
import FindExercise from './Scenes/workouts/FindExercise';
import axios from 'axios';
import WorkoutsMain from './Scenes/workouts/WorkoutsMain';
import CreateWorkout from './Scenes/workouts/CreateWorkout';
import MyWorkouts from './Scenes/workouts/MyWorkouts';
import WorkoutRoutineView from './components/WorkoutRoutineView';
import FitnessCalculator from './Scenes/fitness/FitnessCalculator';
import FitnessMain from './Scenes/fitness/FitnessMain';
import WorkoutRoutineEdit from './components/WorkoutRoutineEdit';
import Tracker from './Scenes/fitness/Tracker';
import Summary from './Scenes/fitness/Summary';
import Error from './Scenes/Error';
import AlreadyLogged from './components/AlreadyLogged';
import Profile from './Scenes/Profile';
import CheckNotLogged from './components/CheckNotLogged';
import ScrollToTop from './utils/utilityComponents/ScrollToTop';

function App() {

  const mode = useSelector(state => state.mode);
  const token = useSelector(state => state.token);
  const exercices = useSelector(state => state.exercices);
  const dispatch = useDispatch();

  const isTokenValid = (token) => {
    if(!token) {
      return false;
    }

    try { 
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      return decodedToken.exp >= currentTime;
    }
    catch(error) {
      console.log(error);
    }
  }


  useEffect(() => {

    const getExercicesFromDB = async () => {
      const response = await axios.get('http://localhost:3001/exercises/getExercises');
  
      response.then((response) => {
        const exercicesFromDB = response.data.exercises;
        dispatch(setExercices({
          exercices: exercicesFromDB,
        }));
      })
        .catch((error) => {
          if(error.response) {
            console.log(error.response.data);
          }
          else if(error.request) {
            console.log(error.request);
          }
          else {
            console.log(error.message);
          }
        })
    }

    const tokenValid = isTokenValid(token);
    if(tokenValid === false) {
      dispatch(setLogout());
    }

    if(exercices.length === 0) {
      getExercicesFromDB();
    }


    return () => {
      dispatch(setMNavbar({mNavbar: false}));
    }
  }, [token, exercices, dispatch]);

  return (
    <div className={`app ${mode === 'light' ? 'light' : 'dark'}`}>
      <ToastProvider />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='' element={<MobileWrapper />}>
            <Route index element={<HomePage />} />
            <Route path='/workouts' element={<SharedLayout />} >
              <Route index element={<WorkoutsMain />} />
              <Route path='findexercise' element={<FindExercise />}/>
              <Route path='create_workout' element={<CreateWorkout />} />
              <Route path='myworkouts' element={<MyWorkouts />} />
              <Route path='myworkouts/:id/:day' element={<WorkoutRoutineView />} />
              <Route path='myworkouts/:id/edit' element={<WorkoutRoutineEdit />} />
            </Route>
            <Route path='/fitness' element={<SharedLayout />} >
              <Route index element={<FitnessMain />} />
              <Route path='calculator' element={<FitnessCalculator />} />
              <Route path='tracker' element={<Tracker />} />
              <Route path='summary' element={<Summary />} />
            </Route>
            <Route path='/profile' element={<SharedLayout />}>
              <Route index element={
                <CheckNotLogged>
                  <Profile />
                </CheckNotLogged>
              } />
            </Route>
          </Route>
          <Route path='/register' element={
            <AlreadyLogged>
              <Register />
            </AlreadyLogged>
            } />
          <Route path='/login' element={
            <AlreadyLogged>
              <Login />
            </AlreadyLogged>
            } />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/additionalinfo' element={
            <CheckNotLogged pathTo='register'>
              <AdditionalInfo />
            </CheckNotLogged>
          } />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
