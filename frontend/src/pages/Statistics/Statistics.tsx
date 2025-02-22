import React from "react";
import styles from "./Statistics.module.css";
import { useNavigate } from "react-router-dom";


const Statistics: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')}>BUTTON</button>
      <h1>Statistics</h1>
      <p>This is the Statistics page.</p>
    </div>
  );
};

export default Statistics;
