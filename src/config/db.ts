// Importar módulos de mongoose y connect-mongo
import mongoose from 'mongoose';
import config from './config'

// Configuración de MongoDB
const db = async () => {

  await mongoose.connect(config.MONGO_SOCIAL_NETWORK)
    .then(() => console.log(`Connected to MongoDB`))
    .catch((error) => console.log(error))
};

// Exportar la conexión a la base de datos
export default db;
