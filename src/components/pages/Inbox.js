import "./Inbox.css";
import { Link } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { mailActions } from "../../store/mail-slice";

let initialrender = true

const Sent = () => {
  const senderEmail = useSelector((state) => state.auth.email);
  const mails = useSelector((state) => state.mail.mails);
  const dispatch = useDispatch();

  const getMail = useCallback(async () => {
    try {
      setInterval(async()=>{
        const res = await fetch(
          `https://mail-box-1af88-default-rtdb.firebaseio.com/mails.json`
          );
          const data = await res.json();
          if (res.ok) {
            let MailArr = [];
            MailArr = Object.entries(data);
            dispatch(mailActions.setMails(MailArr));
            dispatch(mailActions.updateUnread())
            initialrender = false
          } else {
            let errMsg = `Couldn't retrieve sent mails`;
            if (data && data.error && data.error.message) {
              errMsg = data.error.message;
            }
            throw new Error(errMsg);
          }
        },2000)
        } catch (err) {
          alert(err);
        }
    }, [dispatch]);
      
  useEffect(() => {
    getMail()
  }, [getMail]);

  const deleteMailHandler = async (id) => {
    const res = await fetch(
      `https://mail-box-1af88-default-rtdb.firebaseio.com/mails/${id}.json`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      alert("Mail deleted");
    } else {
      alert(`Try again`);
    }
  };

  const sent = mails.filter(
    (item) => senderEmail !== item[1].sender && senderEmail === item[1].receiver
  );
  let content = sent.map((item) => (
    <li key={item[0]} className="sent-list">
      <Link className="paramsLink" to={`/inbox/${item[0]}`}>
        <div className="sent-to">
          <span>
            <i className="fa-solid fa-circle-arrow-right"></i> <b>From</b> :  {' '}
            {item[1].sender}
          </span>
        </div>
        <div className="sent-subject">
          <span>
            <b>Subject</b> : {item[1].subject}
          </span>
        </div>
      </Link>
      <button
        onClick={() => deleteMailHandler(item[0])}
        className="deleteMailBtn"
      >
        <i className="fa fa-trash" aria-hidden="true"></i> Delete
      </button>
    </li>
  ));

   if (initialrender ===true){
    content = <p className="err-msg">Loading...</p>
  }

  return <div className="sent">
    <span className="page-heading">Inbox</span>
    <span className="mail-h2">Get your received mails here</span>
    {content}
    </div>;
};
export default Sent;
