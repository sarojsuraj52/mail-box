import "./Sent.css";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { mailActions } from "../../store/mail-slice";
const Sent = () => {
  const senderEmail = useSelector((state) => state.auth.email);
  const mails = useSelector(state=> state.mail.mails)
  const dispatch = useDispatch()

  const deleteMailHandler = async(id)=>{
    console.log(id)
    const res = await fetch(`https://mail-box-1af88-default-rtdb.firebaseio.com/mails/${id}.json`,{
      method:'DELETE'
    })
    console.log(res)
    if(res.ok){
      alert('Mail deleted')
      dispatch(mailActions.removeMail(id))
      
    }else{
      alert(`Try again`)
    }
  }

  const sent = mails.filter((item) => senderEmail === item[1].sender);
  const content = sent.map((item) => (
    <li key={item[0]}  className="sent-list">
      <Link className="paramsLink" to={`/inbox/${item[0]}`}>
      <div className="sent-to">
        <span>
          {" "}
          <i className="fa-solid fa-circle-arrow-right"></i> <b>To</b> :{" "}
          {item[1].receiver}{" "}
        </span>
      </div>
      <div className="sent-subject">
        <span><b>Subject</b> : {item[1].subject}</span>
      </div>
    </Link>
      <button onClick={()=> deleteMailHandler(item[0])} className="deleteMailBtn"><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
    </li>
  ));
  return <div className="sent">{content}</div>;
};
export default Sent;
