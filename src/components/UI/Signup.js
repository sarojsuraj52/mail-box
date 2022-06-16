import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import "./Signup.css";

const Signup = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const authModeChangeHandler = () => {
    dispatch(authActions.changeAuthMode());
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if(!isLogin){
        if (input.password !== input.cpassword) {
          alert(`Password didn't match`);
          return;
        }
    }

    try {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAJx-BV21P4KyMCrbUa7lVmgoVibMomQs";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAJx-BV21P4KyMCrbUa7lVmgoVibMomQs";
      }

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: input.email,
          password: input.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        let errMsg = `${isLogin?'Login failed':'SignUp failed'}!` 
        if (data && data.error && data.error.message) {
          errMsg = data.error.message;
        }
        throw new Error(errMsg);
      } else {
        if(isLogin){
            dispatch(authActions.loggingIn(data.idToken))
        }
        alert(`${isLogin?'Login Successful':"Signup Successful"}`);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={submitHandler}>
        <h1>{!isLogin ? "SignUp" : "Login"}</h1>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="SomeOne@gmail.com"
          value={input.name}
          onChange={changeHandler}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={changeHandler}
        />
        {!isLogin && (
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            value={input.cpassword}
            onChange={changeHandler}
          />
        )}
        <button type="submit">{!isLogin ? "Signup" : "Login"}</button>
        <span>
          {!isLogin ? "Already have an account" : "Create an account"}?
          <span id="authswitch" onClick={authModeChangeHandler}>
            {" "}
            {!isLogin ? "Login" : "Signup"}
          </span>
        </span>
      </form>
    </div>
  );
};

export default Signup;
