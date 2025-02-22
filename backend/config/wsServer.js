const WebSocket = require('ws');

const clients = new Map(); // Guarda clientes y sus canales de suscripción

// 🔥 Definimos los canales y las colecciones que abarcan
const CHANNELS = {
  PRODUCTS_AND_STOCK: ['products', 'stock'],
  ORDERS_AND_PAYMENTS: ['orders', 'payments'],
  ALL: ['products', 'stock', 'orders', 'payments', 'users'], // Canal para recibir todo
};

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');

    // Inicializar la lista de colecciones suscritas del cliente
    clients.set(ws, new Set());

    ws.send(JSON.stringify({ type: 'welcome', message: 'Conexión establecida' }));

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);

        if (data.type === 'subscribe' && data.channels) {
          const subscribedCollections = new Set();

          data.channels.forEach((channel) => {
            if (CHANNELS[channel]) {
              CHANNELS[channel].forEach((collection) => subscribedCollections.add(collection));
            }
          });

          console.log(`🔔 Cliente suscrito a colecciones: ${[...subscribedCollections].join(', ')}`);
          clients.set(ws, subscribedCollections);
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

// 📡 Enviar datos solo a clientes suscritos a la colección correcta
const broadcast = (data) => {
  clients.forEach((collections, client) => {
    if (client.readyState === WebSocket.OPEN && collections.has(data.collection)) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = { setupWebSocket, broadcast };
