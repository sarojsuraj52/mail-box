import "./Header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/home">
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink activeClassName="active" to="home">
            Home
          </NavLink>
        </li> */}
      </ul>
    </header>
  );
};

export default Header;
