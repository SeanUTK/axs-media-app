import React from "react";

import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";
import "./PostSide.css";

const PostSide = ({ location }) => {
  return (
    <div className="PostSide">
      <PostShare location={location} />
      <Posts />
    </div>
  );
};

export default PostSide;
