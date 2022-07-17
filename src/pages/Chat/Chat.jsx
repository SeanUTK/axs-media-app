import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import Home2 from "../../img/home2.png";
import Setting from "../../img/setting.png";
import Noti from "../../img/noti.png";
import Comment2 from "../../img/comment2.png";
import SignOut from "../../img/sign-out.png";
import "./Chat.css";
import { logOut } from "../../actions/AuthAction";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("Data Recieve Message Chat: ", data);
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chat</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="Right-side-chat">
        <div
          className="navIcons"
          style={{
            height: "2.6rem",
            marginLeft: "8.05rem",
            background: "transparent",
          }}
        >
          <Link to="../home">
            <img src={Home2} alt="" />
          </Link>
          <Link to={`/profile/${user._id}`} className="ProfileCardLink">
            <img src={Setting} alt="" style={{ marginTop: "2px" }} />
          </Link>
          <img src={Noti} alt="" style={{ cursor: "pointer" }} />
          <Link to="../chat">
            <img src={Comment2} alt="" style={{ cursor: "pointer" }} />
          </Link>
          <div
            className="navIcons log-out-icon"
            style={{
              position: "relative",
              top: "-16px",
              marginLeft: "11.9rem",
              background: "transparent",
              right: "-24px",
            }}
          >
            <h4 onClick={handleLogOut}>Log out </h4>
            <img src={SignOut} alt="" onClick={handleLogOut} />
          </div>
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
