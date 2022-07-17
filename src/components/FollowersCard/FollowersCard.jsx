import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";

import User from "../User/User";
import "./FollowersCard.css";

const FollowersCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPeople(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {people.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
