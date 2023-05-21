import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./assets/listView.css";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import Btn from "../Btn";
import Add from "./AddBook";
import LogInBtn from "./LogInBtn";
import LogOutBtn from "./logOut";
import {Image} from 'cloudinary-react';
function ListView(props) {
  const [books, setbooks] = useState([]);
  const [btn, showBtn] = useState(false); 
  const params = useParams();
  const check= params.check;
  const navigate = useNavigate();
  const fetchData =() =>{
    fetch("http://localhost:8080/books")
    .then((response) => response.json())
    .then((data) => setbooks(data))
    .catch((err) => console.log(err));
  };
  useEffect(fetchData, []);

  const handleClick = (id) => {
    navigate(`/bookView/${id}`);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //su kien xoa
  // const deleteClick = (id) => {
  //   console.log("succesfull");
  //   // console.log(book);
  //   // Send data to the backend via POST
  //   fetch(`http://localhost:8080/book/delete/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  //   setShow(false);
  //   navigate(`/ListView/1`);
  // };

  return (
    <div className="block">
       {localStorage.getItem("isLogIn") ?  <LogOutBtn/>:<LogInBtn/>} 
      <h2 className="text-center">Book List</h2>
     
      
      {/* <div>
        <button className="btn btn-primary" onClick={() => handleClick(-1)}>
          Add book
        </button>
      </div> */}
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Date</th>
              <th>Page</th>
              <th>image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => {
              console.log(book);
              return (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.date}</td>
                  <td>{book.page}</td>
                  <td>
                  <Image cloudName="dd8wxnt9s" publicId={book.image} width="15%" />
                  </td>
                  <td  > 
                 {localStorage.getItem("isLogIn")  ?   <Btn id ={book.id} /> : <div></div>} 
                    {/* <button
                      className="btn btn-primary"
                      onClick={() => handleClick(book.id)}
                    >
                      View
                    </button>
                    <button className="btn btn-danger" onClick={handleShow}>
                      Delete
                    </button>
                    <Modal 
                    show={show} onHide={handleClose}
                    >
                      <Modal.Body>
                        Bạn có chắc muốn xóa quyển: {book.title}??
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button  
                          variant="danger"
                          onClick={() => deleteClick(book.id)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {localStorage.getItem("isLogIn") ?    <Add/>:null } 
      </div>
    </div>
  );
}

export default ListView;
