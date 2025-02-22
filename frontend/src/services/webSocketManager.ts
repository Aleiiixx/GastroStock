import { useEffect } from "react";
import useDatabaseStore from "../store/databaseStore"
import { useAuth } from "../context/useAuth"; // Importamos la autenticación

const WebSocketManager = () => {
  const { connectWebSocket, disconnectWebSocket } = useDatabaseStore();
  const { isAuthenticated } = useAuth(); // Revisamos si el usuario está autenticado

  useEffect(() => {
    if (isAuthenticated === undefined) return; // Evita correr el efecto si aún no sabemos si el usuario está autenticado
  
    if (isAuthenticated) {
      console.log("✅ Usuario autenticado, conectando WebSocket...");
      connectWebSocket("PRODUCTS_AND_STOCK");
    } else {
      console.log("🔌 Usuario no autenticado, desconectando WebSocket...");
      disconnectWebSocket();
    }
  
    return () => {
      disconnectWebSocket();
    };
  }, [isAuthenticated]); // Solo ejecuta este efecto cuando cambia isAuthenticated
  

  return null;
};

export default WebSocketManager;
