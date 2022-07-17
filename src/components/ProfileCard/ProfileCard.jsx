import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../../img/home.png";
import Home2 from "../../img/home2.png";
import Setting from "../../img/setting.png";
import Setting2 from "../../img/setting2.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";

import "./ProfileCard.css";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      {location === "profilePage" && (
        <div className="navIcons">
          <Link to="../home">
            {location === "homepage" ? (
              <img src={Home} alt="" />
            ) : (
              <img src={Home2} alt="" />
            )}
          </Link>
          <Link to={`/profile/${user._id}`} className="ProfileCardLink">
            {location === "profilePage" ? (
              <img src={Setting2} alt="" />
            ) : (
              <img src={Setting} alt="" />
            )}
          </Link>
          <img src={Noti} alt="" style={{ cursor: "pointer" }} />
          <Link to="/chat">
            <img src={Comment} alt="" style={{ cursor: "pointer" }} />
          </Link>
        </div>
      )}

      <div className="ProfileCard">
        <div className="ProfileImages">
          <div
            style={
              location === "profilePage"
                ? {
                    backgroundImage: `url(${
                      user.coverPicture
                        ? serverPublic + user.coverPicture
                        : serverPublic + "defaultCover.jpg"
                    })`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "20rem",
                  }
                : {
                    backgroundImage: `url(${
                      user.coverPicture
                        ? serverPublic + user.coverPicture
                        : serverPublic + "defaultCover.jpg"
                    })`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "7.5rem",
                  }
            }
          ></div>
          <img
            src={
              user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt="profile"
          />
        </div>
        <div className="ProfileName">
          <span>
            {user.firstname} {user.lastname}
          </span>
          <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
        </div>

        <div
          className="followStatus"
          style={
            location === "profilePage"
              ? {
                  marginTop: "1.5rem",
                  marginBottom: "3rem",
                }
              : {}
          }
        >
          {location !== "profilePage" && <hr />}

          <div>
            <div className="follow">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.following.length}</span>
              <span>Following</span>
            </div>
            {location === "profilePage" && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>
                    {posts.filter((post) => post.userId === user._id).length}
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          {location !== "profilePage" && <hr />}
        </div>
        {location === "profilePage" ? (
          ""
        ) : (
          <span>
            <Link to={`/profile/${user._id}`} className="ProfileCardLink">
              My Profile
            </Link>
          </span>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
