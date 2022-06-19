import { Redirect, Route } from "react-router-dom";
import Signup from "./components/UI/Signup";
import Sidebar from "./components/pages/Sidebar";
import "./App.css";
import { useSelector } from "react-redux/es/exports";
import Compose from "./components/pages/Compose";
import Sent from "./components/pages/Sent";
import Inbox from "./components/pages/Inbox";
import ViewReceivedMessage from "./components/pages/ViewReceivedMessage";
import Unread from "./components/pages/Unread";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {!isLoggedIn && (
        <Route path="/">
          <Signup />
        </Route>
      )}
      {isLoggedIn && (
        <Sidebar>
          <Route path="/compose">
            <Compose />
          </Route>
          <Route path="/sent">
            <Sent />
          </Route>
          <Route exact path="/inbox">
            <Inbox />
          </Route>
          <Route exact path="/unread">
            <Unread />
          </Route>
          <Route path="/inbox/:messageId">
            <ViewReceivedMessage />
          </Route>
        </Sidebar>
      )}
      {!isLoggedIn && <Route path='*'>
        <Redirect to='/'/>
        </Route>}
        {isLoggedIn && <Route path='*'>
          <Redirect to='inbox' />
        </Route>

        }
    </>
  );
}

export default App;
