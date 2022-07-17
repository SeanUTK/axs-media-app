import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";

const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
            alt=""
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            {online ? <span>Online</span> : <span>Offline</span>}
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
    </>
  );
};

export default Conversation;