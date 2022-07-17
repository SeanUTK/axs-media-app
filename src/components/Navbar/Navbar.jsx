import React from "react";
import Home2 from "../../img/home2.png";
import Setting from "../../img/setting.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Comment2 from "../../img/comment2.png";
import SignOut from "../../img/sign-out.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/AuthAction";

const Navbar = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="navIcons-chat">
      <Link to="../home">
        <img src={Home2} alt="" />
      </Link>
      <Link to={`/profile/${user._id}`}>
        <img src={Setting} alt="" />
      </Link>
      <img src={Noti} alt="" style={{ cursor: "pointer" }} />
      <Link to="../chat">
        <img src={location === "chat" ? Comment2 : Comment} alt="" />
      </Link>
      <div className="navIcons-chat log-out-icon-chat">
        <h4 onClick={handleLogOut}>Log out </h4>
        <img src={SignOut} alt="" onClick={handleLogOut} />
      </div>
    </div>
  );
};

export default Navbar;
