import { Navigate, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
const LogOutBtn = ()=>{

     const navigate = useNavigate();
    const logHandleClick =() =>{
        localStorage.removeItem("isLogIn");
        navigate('/');
    }
    return (
        <div>
            <Button onClick={logHandleClick}>
                LOG OUT
            </Button>
        </div>
    );

}
export default LogOutBtn;