import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from 'axios';
import {Image} from 'cloudinary-react';

// import Select from 'react-select'
function BookView_copy(props) {
  const params = useParams();
  const [validated, setValidated] = useState(false);
  const [book, setBook] = useState({});
  //image upload
  const [selectedImage, setSelectedImage] = useState("");
  const id = params.id;
  const navigate = useNavigate();
  // console.log(id);
  let stringUpdate = "http://localhost:8080/book/update/" + id;
  let stringAdd = "http://localhost:8080/book/addBook/" + book.title;
  const [numClick, setNumClick] = useState(0);
  //chuyen ve btn save
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true)
  }
  //update book
  const handleClick = (event) => {
    event.preventDefault();
    const element = document.getElementsByClassName("ip");
    // console.log(book);
    for (let i = 0; i < element.length; i++) {
      document.getElementsByClassName("ip")[i].disabled = false;
    }  
    document.getElementById("btn").innerHTML = "Save";
    setNumClick(numClick+1);
  };
useEffect(()=>{
  if(numClick>1) {
      fetch(`http://localhost:8080/book/update/${id}`,{
      method:"post",
      mode:'cors',
      body: JSON.stringify(book),
      headers:{
        'Content-Type':'application/json;chaset=ISP-8859-1',
      }
    })
    .then((res) => res.json())
    .then((data)=> {
    if(data.response === 'success') navigate("/")
    });
  }
},[numClick]
)
  //event add new id "submit"
  const addBook =()=>{
 fetch(stringAdd, {
      method: "post",
      mode: "cors",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then((res)=> res.json())
    .then((data)=> {
      if(data.response === "err"){
        alert("quyen sach nay da ton tai");
        window.location.reload();
      } 
      else {
        navigate('/')
      }
    })
    ;
  }

  const upLoadImage =()=>{
      const formData = new FormData();
      formData.append("file",selectedImage);
      formData.append("upload_preset", "ty80gzur");
      Axios.post(
        "https://api.cloudinary.com/v1_1/dd8wxnt9s/image/upload",
        formData
      ).then((response) =>setBook({...book,image: response.data.secure_url}));
    }

  const deleteImage = () => {
    setBook({...book, image: null})
  }
  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
      
    if (id > 0) {
        const element = document.getElementsByClassName("ip");
        for (let i = 0; i < element.length; i++) {
          document.getElementsByClassName("ip")[i].disabled = true;
        }  
  }
}, []);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  //upload image
  return (
    <>
      <h4>{id < 0 ? "New Book" : `Book's name: ${book.title}`}</h4>
      <div 
        id="submit"
        className=" "
        noValidate
        validated={validated}

      >
        <Row>
          <Col>
            <Form.Group controlId="validationCustom03" className="">
              Tiêu đề*{" "}
              <Form.Control 
                className="form-input ip"
                type="text"
                id="title"
                name="title"
                placeholder="Title*"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide title.
              </Form.Control.Feedback>
            </Form.Group>
            Tác giả*{" "}
            <Form.Group controlId="validationCustom03" className="">
              <Form.Control
                className="form-input ip"
                type="text"
                id="author"
                name="author"
                placeholder="Author*"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
                // onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide author.
              </Form.Control.Feedback>
            </Form.Group>
            Thể loại:{" "}
            <Form.Select
            className="ip"
              aria-label="Default select example"
              id="category "
              name="category"
              onChange={(e) => setBook({ ...book, category: e.target.value })}
            >
              <option>{book.category}</option>
              <option value={book.category}>Comics</option>
              <option value={book.category}>Truyện ngắn</option>
              <option value={book.category}>Tiểu thuyết</option>
              <option value={book.category}>Văn học dân gian</option>
              <option value={book.category}>Nước ngoài</option>
            </Form.Select>
            Ngày phát hành*{}
            <Form.Group controlId="validationCustom03" className="">
              <Form.Control
                className="form-input ip"
                type="date"
                id="date"
                name="date"
                placeholder="Date*"
                value={book.date}
                onChange={(e) => setBook({ ...book, date: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide email.
              </Form.Control.Feedback>
            </Form.Group>
            Số trang:{" "}
            <Form.Group controlId="validationCustom03" className="">
              <Form.Control
                className="form-input ip"
                type="number"
                id="page"
                name="page"
                placeholder="Page"
                value={book.page}
                onChange={(e) => setBook({ ...book, page: e.target.value })}
                required
              />
            </Form.Group>
            Mô tả về sách:{" "}
            <textarea
            className="ip"
              type="text"
              id="des"
              name="des"
              value={book.des}
              onChange={(e) => setBook({ ...book, des: e.target.value })}
            />{" "}
            <br />
          </Col>
          <Col>
            {/* <Button type="submit">Upload</Button> */}

            <input
              type="file"
              name="myImage"
              className="ip"
              onChange={(event) => {
                // console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
                
              }}
            />
            <button onClick={upLoadImage} className= "ip" >Upload</button>
            <button onClick={deleteImage}  className= "ip">Delete</button>
            <Image cloudName="dd8wxnt9s" publicId={book.image} width="100%" />
            {/* {selectedImage && (
              <div>
                <img
                  alt="not fount"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button
                  variant="secondary"
                  onClick={() => setSelectedImage(null)}
                >
                  Remove
                </button>
              </div>
            )} */}
          </Col>
        </Row>
       
          < Button 
           className="btn btn-primary"
          id="btn"
          onClick={id<0? addBook : handleClick} 
          >
            {id<0 ? "ADD": "EDIT"} 
          </Button>
      
       
      </div>
    </>
  );
}

export default BookView_copy;
