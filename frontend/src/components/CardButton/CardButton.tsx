import React, { ReactNode } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import styles from './cardButton.module.css';

interface CardButtonProps {
  title: string;
  iconName?: string;
  backgroundColorCode: string;
  textColorCode?: string;
  icon?: ReactNode;
}

const CardButton: React.FC<CardButtonProps> = ({
  title,
  iconName,
  backgroundColorCode,
  textColorCode,
  icon
}) => {
  return (
    <div
        onClick={() => {console.log('clicked')}}
        className={styles.CardButtonContainer}
        style={{
            backgroundColor: backgroundColorCode,
            color: textColorCode,
        }}
    >
      {iconName ? 
        <Icon icon={iconName} width="80" height="80" color={textColorCode} /> :
        icon}
      <h1>{title}</h1>
    </div>
  );
};

export default CardButton;
