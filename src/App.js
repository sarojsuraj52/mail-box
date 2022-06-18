import { Redirect, Route, Switch } from "react-router-dom";
import Signup from "./components/UI/Signup";
import Sidebar from "./components/pages/Sidebar";
import "./App.css";
import { useSelector } from "react-redux/es/exports";
import Compose  from './components/pages/Compose'
import Sent from "./components/pages/Sent";
import Inbox from './components/pages/Inbox'
import ViewReceivedMessage from "./components/pages/ViewReceivedMessage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
    
      <Route exact path="/">
        {!isLoggedIn && <Signup />}
        {isLoggedIn && <Redirect to="/compose" />}
      </Route>


       {isLoggedIn && <Sidebar>
          <Route path="/compose">
            <Compose />
          </Route>
          <Route path="/sent">
            <Sent />
          </Route>
        <Switch>
          <Route exact path="/inbox">
            <Inbox />
          </Route>
          <Route path="/inbox/:messageId">
            <ViewReceivedMessage />
          </Route>
          </Switch>
      {/* <Route path='*'>
      {!isLoggedIn && <Redirect to='/' />}
      {isLoggedIn && <Redirect to='/compose' />}
      </Route> */}
        </Sidebar>}

    </>
  );
}

export default App;
