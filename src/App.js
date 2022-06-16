import { Redirect, Route, Switch } from "react-router-dom";
import Signup from "./components/UI/Signup";
import Header from "./components/UI/Header";
import "./App.css";
import { useSelector } from "react-redux/es/exports";
import Home from "./components/pages/Home";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Header />
      <div className="body">
        <Switch>
          <Route path="/auth">
            {!isLoggedIn && <Signup />}
            {isLoggedIn && <Redirect to="/home" />}
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="*">
            <Redirect to="/auth" />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
