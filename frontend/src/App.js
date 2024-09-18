import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import SignUp from './components/signup/Signup';
import SignIn from './components/signup/Signin';
import Employee from './components/employee/Employee';
import { useDispatch } from 'react-redux';
import {authActions} from './store';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if(id) {dispatch(authActions.login());
    }
  }, [])

  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/employee' element={<Employee/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
        </Routes>
      </Router> 
      <Footer/> 
      </div>
  )
};

export default App
