import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./assets/logIn.css";
import { Navigate, useNavigate } from "react-router-dom";
function Sign() {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});
  const [checkPass, setCheckPass]=useState({});
  let stringAdd = "http://localhost:8080/user/addUser/" + user.fullname;
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    event.preventDefault();
  };
  
  const show = () => {
    console.log(user);
    console.log(stringAdd);
  };
  const navigate = useNavigate();

  const submitForm = (event) => {
      
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    event.preventDefault();
    if(validated ) {
       if(user.pass === checkPass.pass){
      fetch(stringAdd, {
      method: "post",
      mode: "cors",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then((res)=> res.json())
    // .then((res) => console.log(res))
    .then((data)=> {
      if(data.response === "success" ) {
        localStorage.setItem("isLogIn", true);
        navigate('/');
      }
      else {
        alert("tai khoan da ton tai");
        
      }
    })
    ;
    }
    else alert("Confirm password is Not Matched");
    }

  };
  return (
    <Form
      className="block-log-in"
      noValidate
      validated={validated}
      // onSubmit={handleSubmit}
      // action={stringAdd} 
      // method="post"
    >
      <h3>Sign Up For Free</h3>
      <div className="mb-8 block-log-in " >
        <Form.Group controlId="validationCustom03" className="">
          <Form.Control
            className="form-input"
            type="text"
            id="email"
            name="email"
            placeholder="Email*"
             onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom04" className="">
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Full Name"
            id="fullname"
            name="fullname"
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide fullname.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom04" className="">
          <Form.Control
            className="form-input"
            type="password"
            id="pass"
            name="pass"
            placeholder="Password*"
           onChange={(e) => setUser({ ...user, pass: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide pass.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom04" className="">
          <Form.Control
            className="form-input"
            type="password"
            placeholder="Password*"
            onChange={(e) => setCheckPass({ ...checkPass, pass: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a confirm pass.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="">
          <Form.Check
            className="check-input"
            label="save account"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </div>
      </div>  <Button  onClick={submitForm}>GET STARTED</Button>
    </Form>
  );
}

export default Sign;
