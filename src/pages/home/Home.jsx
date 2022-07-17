import React from "react";

import ProfileSide from "../../components/profileSide/ProfileSide";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <ProfileSide />
      <PostSide location="homepage" />
      <RightSide />
    </div>
  );
};

export default Home;
