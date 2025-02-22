import React from 'react';
import styles from './Scan.module.css';
import { Link } from 'react-router-dom';
import useScanningStore from '../../../store/scanningStore';
import useDatabaseStore from "../../../store/databaseStore";

const Scan: React.FC = () => {
    const { scanning, disableScanning, disableScanningAndClearStore, scannedCodesStore } = useScanningStore();
    const data = useDatabaseStore((state: any) => state.data);

    return (
        <div>
            <p className={`${styles.text}`}>{JSON.stringify(data.Product, null, 2)}</p>
            <h1>Scan Page</h1>
            <p>Scanning mode: {scanning ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Scanned Code:</strong> {scannedCodesStore || "No code scanned"}</p>
            <button onClick={disableScanningAndClearStore}>Exit Scan Mode</button>
            <Link to="/" onClick={disableScanning}>Back to Home</Link>
        </div>
    );
};

export default Scan;
