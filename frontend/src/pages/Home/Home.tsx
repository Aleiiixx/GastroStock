import React from 'react';
import styles from './home.module.css'
import { ScannerAddIcon  } from '../../assets/icons/scannerAdd';
import { ScannerRemoveIcon } from '../../assets/icons/scannerRemove';


import CardButton from '../../components/CardButton/CardButton';

const Home: React.FC = () => {
    return (
        <div className={`${styles.homeMainContianer}`}>

            <div className={`${styles.leftContainer}`}>
                <CardButton 
                    title='ESCÁNER RAPIDO' 
                    iconName='ri:qr-scan-2-line' 
                    backgroundColorCode='#F8DF58'
                    textColorCode='#000000'/>
            </div>
            <div className={`${styles.rightContainer}`}>
                <CardButton 
                    title='AÑADIR PRODUCTOS' 
                    icon={<ScannerAddIcon/>}
                    textColorCode='#000000'
                    backgroundColorCode='#57A88C'/>
                <CardButton 
                    title='RETIRAR PRODUCTOS' 
                    icon={<ScannerRemoveIcon/>} 
                    textColorCode='#000000'
                    backgroundColorCode='#E57373'/>
                <CardButton 
                    title='ALMACEN' 
                    iconName='ri:draft-line' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
                <CardButton 
                    title='PROVEEDORES' 
                    iconName='ri:truck-line' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
            </div>
        </div>
    );
};

export default Home;