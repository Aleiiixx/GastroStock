import { useEffect } from 'react';
import useDatabaseStore from '../store/databaseStore';

// 📡 Definir a qué canales nos queremos suscribir
const SUBSCRIPTION_CHANNELS = ['PRODUCTS_AND_STOCK'];

interface WebSocketMessage {
  type: string;
  collection?: string;
  data?: any;
}

const useWebSocket = () => {
  const setData = useDatabaseStore((state) => state.setData);

  useEffect(() => {
    let ws: WebSocket;

    const connectWebSocket = () => {
      ws = new WebSocket('ws://localhost:3000');

      ws.onopen = () => {
        console.log('✅ WebSocket conectado');

        // 🔥 Enviar suscripción a los canales
        ws.send(JSON.stringify({ type: 'subscribe', channels: SUBSCRIPTION_CHANNELS }));
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
