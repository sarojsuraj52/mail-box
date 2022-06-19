import "./Header.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const logoutHandler = () =>{
    dispatch(authActions.loggingout())
    history.replace('/')
    window.location.reload()
  }
  return (
    <>
      <header className="search-bar">
        <div className="text-div">
        <h1>yahoo!mail</h1>
        </div>
        <div className="search-div">
          <div className="search-container">
            <input type='text' id='search' name='search' />
            <span><i className="fa-solid fa-magnifying-glass"></i></span>
          </div>
          <div>
            <button onClick={logoutHandler}>Logout</button>
          </div>
        </div>
      </header>
      
    </>
  );
};

export default Header