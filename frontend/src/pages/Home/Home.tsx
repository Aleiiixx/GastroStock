import React from 'react';
import styles from './home.module.css'
import CardButton from '../../components/CardButton/CardButton';
import useScanningStore from '../../store/scanningStore';

const Home: React.FC = () => {

    const { enableScanning } = useScanningStore();
    
    return (
        <div className={`${styles.homeMainContianer}`}>

            <div className={`${styles.leftContainer}`}>
                <CardButton 
                    title='ESCANEAR PRODUCTOS' 
                    navigateUrl={() => enableScanning()}
                    iconName='ri:qr-scan-2-line' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
            </div>
            <div className={`${styles.rightContainer}`}>
                <CardButton 
                    title='ALMACEN' 
                    navigateUrl='/storage'
                    iconName='ri:draft-line' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
                <CardButton 
                    title='PERFIL' 
                    navigateUrl='/profile'
                    iconName='mdi:account'
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
                <CardButton 
                    title='PROVEEDORES' 
                    navigateUrl='/suppliers'
                    iconName='ri:truck-line' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
                <CardButton 
                    title='ESTADISTICAS' 
                    navigateUrl='/statistics'
                    iconName='mdi:chart-bar' 
                    backgroundColorCode='#C2C2C2'
                    textColorCode='#012A4A'/>
            </div>
        </div>
    );
};

export default Home;