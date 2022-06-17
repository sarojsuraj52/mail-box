import "./Home.css";
import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "../../../node_modules/react-quill/dist/quill.snow.css";

const Home = () => {
  const [input, setInput] = useState({
    email: "",
    subject: "",
  });
  const [message, setMessage] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://mail-box-1af88-default-rtdb.firebaseio.com/mails.json",
        {
          method: "POST",
          body: JSON.stringify({
            email: input.email,
            subject: input.subject,
            message: message,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Mail sent");
        setInput({
            email:'',
            subject:''
        })
        setMessage('')
      } else {
        let errMsg = "sending mail failed!";
        if (data && data.error && data.error.message) {
          errMsg = data.error.message;
        }
        throw new Error(errMsg);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section className="home-container">
      <h1>Welcome to Mail box</h1>
      <div className="mail-box">
        <form onSubmit={submitHandler}>
          <div className="to">
            <label>To</label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeHandler}
            />
          </div>
          <div className="to subject">
            <label>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={input.subject}
              onChange={changeHandler}
            />
          </div>
          <div className="subject">
            {/* <ReactQuill
           theme="snow"
           placeholder="write something here..."
           onChange={messageHandler}
           value={message}
           /> */}
            <textarea
              value={message}
              className="messageInput"
              placeholder="Enter your message here..."
              onChange={messageHandler}
            />
          </div>
          <button type="submit" className="sendMail">
            Send ▶
          </button>
        </form>
      </div>
    </section>
  );
};
export default Home;
