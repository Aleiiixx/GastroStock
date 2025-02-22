import { create } from "zustand";

interface DatabaseState {
  data: Record<string, any>;
  setData: (newData: Record<string, any>) => void;
  ws: WebSocket | null;
  connectWebSocket: (channel: string) => void;
  disconnectWebSocket: () => void;
}

const WS_URL = import.meta.env.VITE_BACKEND_URL;;

const useDatabaseStore = create<DatabaseState>((set, get) => ({
  data: {},
  setData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  ws: null,

  connectWebSocket: (channel) => {
    if (get().ws) return; // Evita abrir múltiples conexiones

    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log(`✅ Conectado al WebSocket en canal: ${channel}`);
      ws.send(JSON.stringify({ type: "subscribe", channels: [channel] }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Mensaje recibido:", message);
        if (message.model) {
          get().setData({ [message.model]: message.data });
        }
      } catch (error) {
        console.error("❌ Error procesando mensaje WebSocket:", error);
      }
    };

    ws.onclose = () => {
      console.log(`❌ WebSocket cerrado para canal: ${channel}`);
      set({ ws: null });
    };

    set({ ws });
  },

  disconnectWebSocket: () => {
    const ws = get().ws;
    if (ws) {
      ws.close();
      set({ ws: null });
    }
  },
}));

export default useDatabaseStore;
