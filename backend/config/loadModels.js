const fs = require("fs");
const path = require("path");

// 📌 Función para cargar automáticamente todos los modelos en la carpeta "models/"
const loadModels = () => {
  const modelsPath = path.join(__dirname, "../models"); // Ruta de la carpeta models

  fs.readdirSync(modelsPath).forEach((file) => {
    if (file.endsWith(".js")) {
      require(path.join(modelsPath, file)); // 🔥 Importa cada modelo dinámicamente
    }
  });;
};

module.exports = { loadModels };
