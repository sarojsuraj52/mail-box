import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
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
  const submitHandler = async (e) => {
    e.preventDefault();

    if (input.password !== input.cpassword) {
      alert(`Password didn't match`);
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAJx-BV21P4KyMCrbUa7lVmgoVibMomQs",
        {
          method: "POST",
          body: JSON.stringify({
            email: input.email,
            password: input.password,
            returnSecureToken:true
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        let errMsg = "SignUp failed!";
        if (data && data.error && data.error.message) {
          errMsg = data.error.message;
        }
        throw new Error(errMsg);
      } else {
        alert("Signup Successful");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={submitHandler}>
        <h1>SignUp</h1>
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
        <input
          type="password"
          id="cpassword"
          name="cpassword"
          placeholder="Confirm Password"
          value={input.cpassword}
          onChange={changeHandler}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
