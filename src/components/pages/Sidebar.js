import "./Sidebar.css";
import { NavLink,  } from "react-router-dom";
import Header from './Header'
import { useSelector } from "react-redux";
const Sidebar = (props) => {
  const unreadLength = useSelector(state=>state.mail.unread);
  return (
    <>
    <Header />
    <section className="body">
      <aside className="sidebar">
        <ul>
          <li>
            <NavLink activeClassName="active" to="/compose">
              Compose
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/inbox">
              Inbox
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/sent">
              Sent
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/unread">
              Unread <span id='unread-mails-count'>{unreadLength}</span>
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="pages">
       {props.children}
      </div>
    </section>
    </>
  );
};

export default Sidebar;
