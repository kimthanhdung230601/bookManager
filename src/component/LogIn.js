import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import   './assets/logIn.css'
import Log from './LogC';
import Sign from './SignUp';
function LogIn() {
  const [validated, setValidated] = useState(false);

  const [showLogIn, setShowLogIn] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const handleShowLogIn=()=>{
    setShowLogIn(false)
    setShowSignUp( true)
    console.log(typeof(validated))
  }
  const handleShowSignUp =() =>{
    setShowSignUp(false)
    setShowLogIn(true)
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    
    <div className='block-in-put'  >
    <Button className='input-btn' onClick={handleShowLogIn}>SIGN UP</Button>
    <Button className='input-btn' onClick={handleShowSignUp}>LOG IN</Button>
    
    <a href='/'><p>or start for free</p> </a>
       {showLogIn && <Log/>}
       {showSignUp && <Sign/>}
     
    </div>
  );
}

export default LogIn