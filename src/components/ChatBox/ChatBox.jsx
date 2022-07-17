import React, { useEffect, useRef, useState } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMassages] = useState([]);
  const [newMessages, setNewMassages] = useState("");
  const scroll = useRef();

  const handleChange = (newMessages) => {
    setNewMassages(newMessages);
  };

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
      console.log("Data Recieve Message: ", receiveMessage);
      setMassages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMassages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessages,
      chatId: chat._id,
    };

    try {
      const { data } = await addMessage(message);
      setMassages([...messages, data]);
      setNewMassages("");
    } catch (error) {
      console.log(error);
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                    {/* <span>{userData ? "Online" : ""}</span> */}
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "85%",
                  border: "0.1px solid #ececec",
                  marginTop: "1rem",
                }}
              />
            </div>
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.updatedAt)}</span>
                  </div>
                </>
              ))}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessages} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to make conversation
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
