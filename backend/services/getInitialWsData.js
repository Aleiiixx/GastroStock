const mongoose = require("mongoose");
const { loadModels } = require("../config/loadModels"); // Importa la función que carga los modelos

// 🔥 Cargar todos los modelos antes de acceder a ellos
loadModels();


const getInitialData = async (modelName) => {
  try {
    const Model = mongoose.model(modelName); // Accede directamente al modelo por su nombre
    if (!Model) return null;

    const data = await Model.find({}).lean();
    return data;
  } catch (error) {
    console.error(`❌ Error obteniendo datos iniciales de ${modelName}:`, error);
    return null;
  }
};

module.exports = { getInitialData };
