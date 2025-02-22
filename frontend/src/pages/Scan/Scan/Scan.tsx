import React from 'react';
import { Link } from 'react-router-dom';
import useScanningStore from '../../../store/scanningStore';

const Scan: React.FC = () => {
    const { scanning, disableScanning, disableScanningAndClearStore, scannedCodesStore } = useScanningStore();

    return (
        <div>
            <h1>Scan Page</h1>
            <p>Scanning mode: {scanning ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Scanned Code:</strong> {scannedCodesStore || "No code scanned"}</p>
            <button onClick={disableScanningAndClearStore}>Exit Scan Mode</button>
            <Link to="/" onClick={disableScanning}>Back to Home</Link>
        </div>
    );
};

export default Scan;
