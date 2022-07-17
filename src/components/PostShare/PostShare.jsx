import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
import Home from "../../img/home.png";
import Home2 from "../../img/home2.png";
import Setting from "../../img/setting.png";
import Setting2 from "../../img/setting2.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { Link } from "react-router-dom";
import "./PostShare.css";

const PostShare = ({ location }) => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const loading = useSelector((state) => state.postReducer.uploading);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <>
      {location === "homepage" && (
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
          <Link to="../chat">
            <img src={Comment} alt="" style={{ cursor: "pointer" }} />
          </Link>
        </div>
      )}

      <div className="PostShareMain">
        <div className="PostShare">
          <img
            src={
              user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt=""
          />
          <div>
            <input
              className="PostShare-input"
              ref={desc}
              required
              type="text"
              placeholder="What's happening"
            />
            <div className="postOptions">
              <div
                className="option"
                style={{ color: "var(--photo)" }}
                onClick={() => imageRef.current.click()}
              >
                <UilScenery />
                Photo
              </div>
              <div className="option" style={{ color: "var(--video)" }}>
                <UilPlayCircle />
                Video
              </div>
              <div className="option" style={{ color: "var(--location)" }}>
                <UilLocationPoint />
                Location
              </div>
              <button
                className="button ps-button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Share"}
              </button>
              <div style={{ display: "none" }}>
                <input
                  type="file"
                  name="myImage"
                  ref={imageRef}
                  onChange={onImageChange}
                />
              </div>
            </div>

            {image && (
              <div className="previewImage">
                <UilTimes onClick={() => setImage(null)} />
                <img src={URL.createObjectURL(image)} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostShare;
