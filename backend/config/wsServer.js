const { getInitialData } = require("../services/getInitialWsData"); // Función que obtiene datos iniciales
const WebSocket = require('ws');

const clients = new Map(); // Guarda clientes y sus canales de suscripción

// 🔥 Ahora cada canal tiene asociado directamente el modelo de MongoDB
const CHANNELS = {
  PRODUCTS_AND_STOCK: ["Product", "Storage"], // Nombres de los modelos en Mongoose
};

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws) => {
    console.log('Nuevo cliente conectado');
  
    clients.set(ws, new Set());
  
    ws.send(JSON.stringify({ type: 'welcome', message: 'Conexión establecida' }));
  
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
  
        if (data.type === 'subscribe' && data.channels) {
          const subscribedModels = new Set();

          data.channels.forEach((channel) => {
            if (CHANNELS[channel]) {
              CHANNELS[channel].forEach((model) => subscribedModels.add(model));
            }
          });

          console.log(`🔔 Cliente suscrito a modelos: ${[...subscribedModels].join(', ')}`);
          clients.set(ws, subscribedModels);

          // 🔥 Enviar datos iniciales al cliente directamente con los modelos
          for (const model of subscribedModels) {
            const initialData = await getInitialData(model);
            if (initialData) {
              ws.send(JSON.stringify({ model, data: initialData }));
            }
          }
        }
      } catch (error) {
        console.error('❌ Error procesando mensaje WebSocket:', error);
      }
    });
  
    ws.on('close', () => {
      console.log('Cliente desconectado');
      clients.delete(ws);
    });
  });
  
  return wss;
};

// 📡 Enviar datos solo a clientes suscritos al modelo correcto
const broadcast = (data) => {
  clients.forEach((models, client) => {
    if (client.readyState === WebSocket.OPEN && models.has(data.model)) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = { setupWebSocket, broadcast };
