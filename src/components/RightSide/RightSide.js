import React, { useState } from "react";

import TrendCard from "../TrendCard/TrendCard";
import { logOut } from "../../actions/AuthAction.js";
import SignOut from "../../img/sign-out.png";
import ShareModal from "../ShareModal/ShareModal";
import "./RightSide.css";
import { useDispatch } from "react-redux";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="RightSide">
      <div className="navIcons log-out-icon">
        <h4 onClick={handleLogOut}>Log out </h4>
        <img src={SignOut} alt="" onClick={handleLogOut} />
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
