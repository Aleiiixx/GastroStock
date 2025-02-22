const { MongoClient } = require('mongodb');
const { broadcast } = require('./wsServer');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const watchDatabase = async () => {
  await client.connect();
  const db = client.db('GastroStock');

  console.log('📡 Escuchando cambios en TODAS las colecciones de la base de datos...');

  const changeStream = db.watch();

  changeStream.on('change', (change) => {
    console.log(`🔄 Cambio en la colección: ${change.ns.coll}`);
    broadcast({ type: 'dbUpdate', collection: change.ns.coll, data: change });
  });
};

module.exports = { watchDatabase };
