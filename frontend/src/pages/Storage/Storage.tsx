import React from "react";
import styles from "./Storage.module.css";
import { useNavigate } from "react-router-dom";

const Storage: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')}>BUTTON</button>
      <h1>Storage</h1>
      <p>This is the Storage page.</p>
    </div>
  );
};

export default Storage;
