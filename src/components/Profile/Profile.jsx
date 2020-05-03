import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import "./Profile.scss";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="ProfileComponent">
      <section className="user_info">
        <span className="user_info --country_flag">{user.country}</span>
        <span className="user_info --display_name">{user.displayName}</span>
      </section>
    </div>
  );
}

export default Profile;
