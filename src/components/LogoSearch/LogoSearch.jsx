import React from "react";
import { UilSearch } from "@iconscout/react-unicons";

import Logo from "../../img/logo.png";
import "./LogoSearch.css";

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Webname">
        <h1 style={{ fontSize: "2rem", position: "relative", top: "5px" }}>
          AXS Media
        </h1>
      </div>
    </div>
  );
};

export default LogoSearch;
