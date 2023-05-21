
import { type } from "@testing-library/user-event/dist/type";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Btn =({id})=>{
   
    // var d = JSON.parse(s)[0].props;
    const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/bookView/${id}`);
    //  var s = JSON.stringify(props.props); 
    //     console.log(typeof(s));
    //     var id = Number(s);

      };
      //modal boostrap
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const deleteClick = (id) => {
        console.log("succesfull");
        // console.log(book);
        // Send data to the backend via POST
        fetch(`http://localhost:8080/book/delete/${id}`)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        setShow(false);
        //navigate(`/ListView/1`);
        // <Redirect to="/ListView/1" />    
        window.location.reload();
      };
    return (
        <div>
             <button
                      className="btn btn-primary"
                      onClick={() => handleClick(id)}
                    >
                      View
                    </button>
                    <button className="btn btn-danger"
                     onClick={handleShow}
                     >
                      Delete
                    </button>
                    <Modal 
                    show={show} onHide={handleClose}
                    >
                      <Modal.Body>
                        Bạn có chắc muốn xóa quyển: ??
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button  
                          variant="danger"
                          onClick={() => deleteClick(id)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
        </div>
    );
}
export default Btn;