import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux/es/exports";
import { mailActions } from "../../store/mail-slice";
const Unread = () => {
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

  const received = mails.filter((item) => senderEmail === item[1].receiver);
  const unread = received.filter(item=> item[1].read === false)
  const content = unread.map((item) => (
    <li key={item[0]}  className="sent-list">
      <Link className="paramsLink" to={`/inbox/${item[0]}`}>
      <div className="sent-to">
        <span>
          {" "}
          <i className="fa-solid fa-circle-arrow-right"></i> <b>From</b> :{" "}
          {item[1].sender}{" "}
        </span>
      </div>
      <div className="sent-subject">
        <span><b>Subject</b> : {item[1].subject}</span>
      </div>
    </Link>
      <button onClick={()=> deleteMailHandler(item[0])} className="deleteMailBtn"><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
    </li>
  ));
  return <div className="sent">
      <span className="page-heading">Unread</span>
    <span className="mail-h2">Get your unread mails here</span>
    {content}
    </div>;
};
export default Unread;
