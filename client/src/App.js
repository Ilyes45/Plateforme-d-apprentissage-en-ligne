
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Error from './Pages/Error';
import Register from './Pages/Register/Register';
import Cours from './Pages/Cours/Cours';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { current } from './JS/Actions/user';
import Addcourse from './Pages/AddCourse/Addcourse';
import EditCourse from './Pages/Home/EditCourse/EditCourse';
import LessonList from './Components/LessonList/LessonList';
import AddLesson from './Pages/AddLesson/AddLesson';
import EditLesson from './Pages/EditLesson/EditLesson';

function App() {
  const dispatch=useDispatch();
useEffect(()=>{
  if(localStorage.getItem('token')){
    dispatch(current())
      }
  },[dispatch]);

  return (
    <div className="App">
      <NavBar />
      <h1>Plateforme d'apprentissage en ligne</h1>
       <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/cours' element={<Cours />}></Route>
        <Route path='/add-course' element={<Addcourse />}></Route>
        <Route path='/edit/:id' element={<EditCourse/>}></Route>
        <Route path="/lesson/:courseId" element={<LessonList />} />
        <Route path="/add-lesson/:courseId" element={<AddLesson />} />
        <Route path="/edit-lesson/:lessonId" element={<EditLesson />} />
        <Route path='/*' element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
