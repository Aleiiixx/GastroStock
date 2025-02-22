const express = require('express');
const http = require('http');
const connectDB = require('./config/mongoose');
const loadRoutes = require('./routes/index');
const cors = require('cors');
const { setupWebSocket } = require('./config/wsServer');
const { watchDatabase } = require('./config/watchDatabase');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// Cargar rutas dinámicamente
loadRoutes(app);

const server = http.createServer(app);

setupWebSocket(server);

watchDatabase();

// Iniciar el servidor HTTP con WebSocket
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
