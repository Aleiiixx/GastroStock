import React, { ReactNode } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./cardButton.module.css";
import { useNavigate } from "react-router-dom";

interface CardButtonProps {
  title: string;
  iconName?: string;
  navigateUrl: string | (() => void); // Puede ser una URL o una función
  backgroundColorCode: string;
  textColorCode?: string;
  icon?: ReactNode;
}

const CardButton: React.FC<CardButtonProps> = ({
  title,
  iconName,
  navigateUrl,
  backgroundColorCode,
  textColorCode,
  icon,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof navigateUrl === "string") {
      navigate(navigateUrl);
    } else if (typeof navigateUrl === "function") {
      navigateUrl();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={styles.CardButtonContainer}
      style={{
        backgroundColor: backgroundColorCode,
        color: textColorCode,
      }}
    >
      {iconName ? (
        <Icon icon={iconName} width="150" height="150" color={textColorCode} />
      ) : (
        icon
      )}
      <h1>{title}</h1>
    </div>
  );
};

export default CardButton;
