import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./assets/logIn.css";
import { Navigate, useNavigate } from "react-router-dom";

function Log() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    fetch("http://localhost:8080/user/" + user.fullname)
      .then((response) => response.json())
      .then((data) => {
        if (data.pass === user.pass) {
          localStorage.setItem("isLogIn", true);
          navigate('/');
        }
        else {
          if (user.fullname === null && user.password === null) setValidated(true);
          else {
            alert("ban da sai tai khoan hoac mat khau");
          }
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const [bool, setShowBool] = useState(" ");
  const [user, setUser] = useState({});
  // const navigate = useNavigate();
  const handleSignUp = () => {
    console.log(user);
    //  Send data to the backend via POST
    // fetch("http://localhost:8080/user/" + user.fullname)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.pass === user.pass) navigate(`/ListView`);
    //     else {
    //       alert("ban da sai tai khoan hoac mat khau");
    //     }
    //     console.log(data);
    //   })
    //   .catch((err) => console.log(err));

    // console.log(bool);
  };

  // const string = "http://localhost:8080/user/" + user.fullname;
  return (
    <Form
      className="block-log-in"
      noValidate
      validated={validated}
      // onSubmit ={handleSignUp}
      // action={stringAdd} 
      // method="post"
    >
      <h3>Log In Now Into Your Account</h3>
      <Form className="mb-8 block-log-in ">
        <Form.Group controlId="validationCustom03" className="">
          <Form.Control
            className="form-input"
            type="text"
            placeholder="Full name*"
            id="fullname"
            name="fullname"
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom04" className="">
          <Form.Control
            className="form-input"
            type="password"
            placeholder="Password"
            id="pass"
            name="pass"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
      <div className="">
        <Form.Check
          className="check-input"
          label="save account"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </div>
      <Button
        // onClick={showClick}
        onClick={handleSubmit}
      >
        LOG IN
      </Button>
    </Form>
  );
}

export default Log;
