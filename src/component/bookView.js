import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";

// import Select from 'react-select'
function BookView(props) {
  const params = useParams();
  const [book, setBook] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const id = params.id;
  console.log(id);
  let stringUpdate = "http://localhost:8080/book/update/" + id;
  let stringAdd = "http://localhost:8080/book/addBook/" + book.title;

  const handleClick = () => {
    console.log(book);
  };
  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, []);
  // const options = [
  //   { value: 'cổ tích', label: 'cổ tích' },
  //   { value: 'văn học', label: 'văn học' },
  //   { value: 'nước ngoài', label: 'nước ngoài' },
  //   { value: 'ngôn tình', label: 'ngôn tình' }
  // ]

  return (
    <>
      <h6>{id < 0 ? "New Book" : `Book's name: ${book.title}`}</h6>
      <form action={id < 0 ? stringAdd : stringUpdate} method="post">
        <Row>
          <Col>
            Tiêu đề:{" "}
            <input
              id="title"
              name="title"
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
            Tác giả:{" "}
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
            <br />
            Thể loại:{" "}
            {/* <input
        type="text"
        id="category"
        name="category"
        value={book.category}
        onChange={(e) => setBook({ ...book, category: e.target.value })}
      /> */}
            <Form.Select aria-label="Default select example"
                 id="category"
                 name="category"
            >
              <option>Open this select menu</option>
              <option value={book.category}>One</option>
              <option value={book.category}>Two</option>
              <option value={book.category}>Three</option>
            </Form.Select>
            Ngày phát hành:{" "}
            <input
              type="date"
              id="date"
              name="date"
              value={book.date}
              onChange={(e) => setBook({ ...book, date: e.target.value })}
            />
            Số trang:{" "}
            <input
              type="number"
              id="page"
              name="page"
              value={book.page}
              onChange={(e) => setBook({ ...book, page: e.target.value })}
            />
            <br />
            Mô tả về sách:{" "}
            <textarea
              type="text"
              id="des"
              name="des"
              value={book.des}
              onChange={(e) => setBook({ ...book, des: e.target.value })}
            />{" "}
            <br />
          </Col>
          <Col>
            <Button type="submit">Upload</Button>

            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
            {selectedImage && (
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
            )}
          </Col>
        </Row>
        <input type="submit" onClick={handleClick} value="save" />
      </form>
    </>
  );
}

export default BookView;
