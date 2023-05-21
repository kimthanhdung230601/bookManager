import { Navigate, useNavigate } from "react-router-dom";
const Add =()=>{
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/bookView/-1`);
      };
    return(
        <>
        <button className="btn btn-primary" onClick={() => handleClick()}>
          Add book
        </button> 
        </>
    )
    ;
}
export default Add;