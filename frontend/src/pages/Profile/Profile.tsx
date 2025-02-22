import React from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')}>BUTTON</button>
      <h1>Profile</h1>
      <p>This is the Profile page.</p>
    </div>
  );
};

export default Profile;
