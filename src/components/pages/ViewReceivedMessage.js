import "./ViewReceivedMessage.css";
import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
// import { useEffect } from "react";

const ViewReceivedMessage = (props) => {
  const params = useParams();
  const mails = useSelector((state) => state.mail.mails);
  const mailToRead = mails.find((mail) => mail[0] === params.messageId) || [];

  const read = async()=>{
    try{
      const res = await fetch(`https://mail-box-1af88-default-rtdb.firebaseio.com/mails/${params.messageId}.json`,{
        method:'PUT',
        body:JSON.stringify({
          sender:mailToRead[1].sender,
          receiver:mailToRead[1].receiver,
          message:mailToRead[1].message,
          subject:mailToRead[1].subject,
          read:true,
        }),
        headers:{
          "Content-Type":'application/json'
        }
      })
      if(!res.ok){
        let errMsg = 'Failed to update read message'
        throw new Error(errMsg)
      }

    }catch(err){
      alert(err)
    }
  }

  read()

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
