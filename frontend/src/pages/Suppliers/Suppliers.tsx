import React from "react";
import styles from "./Suppliers.module.css";
import { useNavigate } from "react-router-dom";


const Suppliers: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/')}>BUTTON</button>
      <h1>Suppliers</h1>
      <p>This is the Suppliers page.</p>
    </div>
  );
};

export default Suppliers;
