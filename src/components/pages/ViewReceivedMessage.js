import "./ViewReceivedMessage.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewReceivedMessage = (props) => {
  const params = useParams();
  const mails = useSelector((state) => state.mail.mails);
  const mailToRead = mails.find((mail) => mail[0] === params.messageId) || [];

  return (
    <div className="ViewReceivedMessage">
      <div className="readBox">
        <div className="row">
          <h2>{mailToRead[1].subject}</h2>
        </div>
        <div className="row">
          <label>From : {' '}</label>
          <span>{mailToRead[1].sender}</span>
        </div>
        <div className="row">
          <label>To : </label>
          <span>{mailToRead[1].receiver}</span>
        </div>
        <div className="row">
          <label>Message :  </label>
          <span>{mailToRead[1].message}</span>
        </div>
      </div>
    </div>
  );
};
export default ViewReceivedMessage;
