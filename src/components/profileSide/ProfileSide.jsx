import React from "react";

import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";
import FollowersCard from "../FollowersCard/FollowersCard";
import "./ProfileSide.css";

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location="homePage" />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
