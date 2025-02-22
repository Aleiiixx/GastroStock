const WebSocket = require('ws');

const clients = new Set();

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');
    clients.add(ws);

    ws.send(JSON.stringify({ type: 'welcome', message: 'Conexión establecida' }));

    ws.on('message', (message) => {
      console.log('Mensaje recibido:', message);
    });

    ws.on('close', () => {
      console.log('Cliente desconectado');
      clients.delete(ws);
    });
  });

  return wss;
};

const broadcast = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = { setupWebSocket, broadcast };
