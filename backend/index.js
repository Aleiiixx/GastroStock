const express = require('express');
const connectDB = require('./config/mongoose');
const loadRoutes = require('./routes/index');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
connectDB();

// Cargar rutas dinámicamente
loadRoutes(app);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
