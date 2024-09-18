import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className='text-center'>
            Organise Your <br /> Work and Life Now.
        </h1>
        <p>Become Focused, Organised and Calm with <br />todo app. The World to Employee manager app. </p>
        <button className='home-btn p-2'> Employee List</button>
        </div>
    </div>
  );
};

export default Home;
