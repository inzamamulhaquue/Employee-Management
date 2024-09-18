import React from 'react';
import './Signup.css';
import HeadingComp from './HeadingComp';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {authActions} from '../../store';

const Signup = () => {
  const dispatch = useDispatch();
  const nextpage = useNavigate(); //signup to signin jump page
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) =>{
    const {name, value} = e.target;
    setInputs({...Inputs, [name]: value});
  };

  const submit = async (e) =>{
    e.preventDefault();
    await axios
    .post("http://localhost:4004/api/users/login", Inputs)
    .then((response) =>{
      // sessionStorage.setItem('id', response.data.others._id);
      sessionStorage.setItem('id', response.data.userId); //////////////
      toast.success('Login successful');////////////////
      dispatch(authActions.login());
      nextpage('/employee')
    });
  }

  return (
    <div className='signup'>
        <div className="container">
            <div className="row">
            <div className="col-lg-4 column d-flex justify-content-center align-items-center">
                <HeadingComp first='Sign' second='In'/>
                </div>
                <div className="col-lg-8 column d-none d-lg-flex justify-content-center align-items-center">
                    <div className='d-flex flex-column w-100 p-3'>
                    
                    <input className='p-2 my-3 input-signup'
                    type='email'
                    name='email'
                    placeholder=' Enter Your Email'
                    value={Inputs.email}
                    onChange={change}
                    />

                    <input className='p-2 my-3 input-signup'
                    type='password'
                    name='password'
                    placeholder=' Enter Your Password'
                    value={Inputs.password}
                    onChange={change}
                    />
                    <button className='btn-signup p-2' onClick={submit}>SignIn</button>
                    </div>
                     </div>
            </div>
        </div>
    </div>
  );
};

export default Signup;
