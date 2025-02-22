import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan/Scan';
import useScanningStore from './store/scanningStore';
import { toast } from 'react-toastify';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/SignUp/SignUp';
import ModalComponent from './components/Modal/Modal';

const AppRouter: React.FC = () => {
    const { scanning, enableScanning, setScannedCode } = useScanningStore();
    const barcodeRef = useRef('');
    const lastScanTime = useRef<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let timer: ReturnType<typeof setTimeout>;

    useEffect(() => {
        if (scanning) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false)
        }
    }, [scanning]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const currentTime = Date.now();
            const timeDiff = currentTime - lastScanTime.current;

            if (timeDiff > 1000) {
                barcodeRef.current = '';
            }

            lastScanTime.current = currentTime;

            if (event.key === 'Enter' && barcodeRef.current.length >= 6) {
                console.log("Código escaneado:", barcodeRef.current);
                setScannedCode(barcodeRef.current);
                toast.success("Scanning code", {
                    autoClose: 500
                });
                enableScanning();
                barcodeRef.current = '';
            } else if (/^[a-zA-Z0-9]$/.test(event.key)) {
                barcodeRef.current += event.key;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    barcodeRef.current = '';
                }, 200);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timer);
        };
    }, [enableScanning, setScannedCode]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/suppliers" element={<SignUp />} />
                <Route path="/storage" element={<SignUp />} />
                <Route path="/statistics" element={<SignUp />} />
                <Route path="/profile" element={<SignUp />} />
            </Routes>
            <ModalComponent open={isModalOpen} onClose={() => setIsModalOpen(false)} adaptToScreen>
                <Scan />
            </ModalComponent>
        </>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <AppRouter />
    </Router>
);

export default AppWrapper;
