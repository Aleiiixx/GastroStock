import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'; // ✅ Importa BrowserRouter
import AppWrapper from './AppRouter';
import { AuthProvider } from './context/AuthContext'; // ✅ Importamos AuthProvider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer />
                <AppWrapper />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
