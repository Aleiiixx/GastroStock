import React from 'react';
import styles from './home.module.css'
import CardButton from '../../components/CardButton/CardButton';

const Home: React.FC = () => {
    return (
        <div className={`${styles.homeMainContianer}`}>

            <div className={`${styles.leftContainer}`}>
                <CardButton 
                    title='ESCANEAR PRODUCTOS' 
                    navigateUrl='/login'
                    iconName='ri:qr-scan-2-line' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
            </div>
            <div className={`${styles.rightContainer}`}>
                <CardButton 
                    title='ALMACEN' 
                    navigateUrl='/login'
                    iconName='ri:draft-line' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
                <CardButton 
                    title='PERFIL' 
                    navigateUrl='/login'
                    iconName='mdi:account'
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
                <CardButton 
                    title='PROVEEDORES' 
                    navigateUrl='/login'
                    iconName='ri:truck-line' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
                <CardButton 
                    title='ESTADISTICAS' 
                    navigateUrl='/login'
                    iconName='mdi:chart-bar' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
            </div>
        </div>
    );
};

export default Home;