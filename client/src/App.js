import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './Scenes/homepage/HomePage';
import './Styles/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { setExercices, setMNavbar, setMode } from './state';
import { useEffect, useState } from 'react';
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

function App() {

  const mode = useSelector(state => state.mode);
  const user = useSelector(state => state.user);
  const exercices = useSelector(state => state.exercices);
  const mNavbar = useSelector(state => state.mNavbar);
  const dispatch = useDispatch();

  const getExercicesFromDB = () => {
    const response = axios.get('http://localhost:3001/exercises/getExercises');

    response.then((response) => {
      console.log(response);
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

  useEffect(() => {
    if(mNavbar === true) {
      dispatch(setMNavbar({mNavbar: false}));
    }

    /*if(exercices.length === 0) {
      getExercicesFromDB();
    }
    else {
      console.log(exercices);
    }*/
    getExercicesFromDB();
  }, []);

  return (
    <div className={`app ${mode === 'light' ? 'light' : 'dark'}`}>
      <ToastProvider />
      <BrowserRouter>
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
            </Route>
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/additionalinfo' element={<AdditionalInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
