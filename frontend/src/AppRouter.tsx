import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoutes";
import Home from "./pages/Home/Home";
import Scan from "./pages/Scan/Scan/Scan";
import useScanningStore from "./store/scanningStore";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import ModalComponent from "./components/Modal/Modal";
import Suppliers from "./pages/Suppliers/Suppliers";
import Statistics from "./pages/Statistics/Statistics";
import Profile from "./pages/Profile/Profile";
import Storage from "./pages/Storage/Storage";

const AppRouter: React.FC = () => {
    const { scanning, enableScanning } = useScanningStore();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 🔥 Evitar redirigir a login si estamos en rutas públicas como /signup
        if (!isAuthenticated && location.pathname !== "/signup") {
            console.warn("❌ Usuario no autenticado, redirigiendo a login...");
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate, location.pathname]);

    return (
        <>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/storage" element={<Storage />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
            
            {/* Modal para escaneo */}
            <ModalComponent open={scanning} onClose={() => enableScanning()} adaptToScreen>
                <Scan />
            </ModalComponent>
        </>
    );
};

export default AppRouter;
