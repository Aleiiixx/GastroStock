import { useEffect } from 'react';
import useDatabaseStore from '../src/store/databaseStore';

// Definimos el tipo de los mensajes que recibimos del WebSocket
interface WebSocketMessage {
  type: string;
  collection?: string;
  data?: any;
}

const useWebSocket = () => {
  const setData = useDatabaseStore((state) => state.setData);

  useEffect(() => {
    let ws: WebSocket;

    const fetchInitialData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/initial-data'); // Ajusta la URL según tu backend
        const initialData = await response.json();
        console.log('📦 Datos iniciales:', initialData);

        // Guardamos los datos iniciales en Zustand
        setData(initialData);
      } catch (error) {
        console.error('❌ Error obteniendo datos iniciales:', error);
      }
    };

    const connectWebSocket = () => {
      ws = new WebSocket('ws://localhost:3000');

      ws.onopen = async () => {
        console.log('✅ WebSocket conectado');
        await fetchInitialData();
      };

      ws.onmessage = (event: MessageEvent) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          console.log('📡 Datos recibidos:', data);

          if (data.type === 'dbUpdate' && data.collection && data.data) {
            setData({ [data.collection]: data.data });
          }
        } catch (error) {
          console.error('❌ Error al procesar mensaje WebSocket:', error);
        }
      };

      ws.onclose = () => {
        console.log('❌ WebSocket desconectado. Reintentando en 3s...');
        setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();
    return () => ws?.close();
  }, [setData]);
};

export default useWebSocket;
