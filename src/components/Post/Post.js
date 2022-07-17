import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import { likePost } from "../../api/PostRequest";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { getAllUser } from "../../api/UserRequest";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [people, setPeople] = useState([]);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPeople(data);
    };
    fetchPersons();
  }, []);
  // console.log(data);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  return (
    <div className="Post">
      {people.map((person, id) => {
        if (person._id !== user._id) {
          if (data.userId === person._id) {
            return (
              <>
                <div className="PostInfo">
                  <img
                    src={
                      person.profilePicture
                        ? serverPublic + person.profilePicture
                        : serverPublic + "defaultProfile.png"
                    }
                    alt=""
                    className="followerImg"
                  />
                  <div className="postUserInfo">
                    <h3 key={id}>
                      {person.firstname} {person.lastname}
                    </h3>
                    <p>{format(data.createdAt)}</p>
                  </div>
                </div>
                <img
                  src={
                    data.image
                      ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
                      : ""
                  }
                  alt=""
                />

                <div className="postReact">
                  <img
                    src={liked ? Heart : NotLike}
                    alt=""
                    style={{ cursor: "pointer", width: "1.8rem" }}
                    onClick={handleLike}
                  />
                  <img
                    src={Comment}
                    alt=""
                    style={{ cursor: "pointer", width: "1.8rem" }}
                  />
                  <img
                    src={Share}
                    alt=""
                    style={{ cursor: "pointer", width: "1.8rem" }}
                  />
                </div>

                <span style={{ color: "var(--gray)", fontSize: "16px" }}>
                  {likes} likes
                </span>
                <div className="detail" style={{ fontSize: "20px" }}>
                  <span>
                    <b>{data.name} </b>
                  </span>
                  <span>{data.desc}</span>
                </div>
              </>
            );
          }
        } else {
          if (data.userId === person._id) {
            return (
              <>
                <div className="PostInfo">
                  <img
                    src={
                      person.profilePicture
                        ? serverPublic + person.profilePicture
                        : serverPublic + "defaultProfile.png"
                    }
                    alt=""
                    className="followerImg"
                  />
                  <div className="postUserInfo">
                    <h3 key={id}>
                      {person.firstname} {person.lastname}
                    </h3>
                    <p>{format(data.createdAt)}</p>
                  </div>
                </div>
                <img
                  src={
                    data.image
                      ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
                      : ""
                  }
                  alt=""
                />

                <div className="postReact">
                  <img
                    src={liked ? Heart : NotLike}
                    alt=""
                    style={{ cursor: "pointer", width: "1.8rem" }}
                    onClick={handleLike}
                  />
                  <img
                    src={Comment}
                    alt=""
                    style={{ cursor: "pointer", width: "1.8rem" }}
                  />
                  <img
                    src={Share}
                    alt=""
                    style={{ cursor: "pointer", width: "1.8rem" }}
                  />
                </div>

                <span style={{ color: "var(--gray)", fontSize: "16px" }}>
                  {likes} likes
                </span>
                <div className="detail" style={{ fontSize: "20px" }}>
                  <span>
                    <b>{data.name} </b>
                  </span>
                  <span>{data.desc}</span>
                </div>
              </>
            );
          }
        }
      })}
    </div>
  );
};

export default Post;
