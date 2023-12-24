import express, { Application } from 'express';
import session from "express-session";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { config, swaggerConfig } from './config'; // Ajusta la ruta según tu estructura de carpetas
import swaggerUI from 'swagger-ui-express';
import socialNetworkRoutes from "./routes";
import MongoStore from 'connect-mongo';


const app: Application = express();

// Middleware de análisis de cuerpos de solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS con middleware
app.use(cors({
  origin: function (origin, callback) {
    console.log(origin);
    if (!origin) return callback(null, true);

    if (config.whiteList.indexOf(origin) === -1) {
      return callback(new Error('Error de CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true, // Permitir credenciales (Access-Control-Allow-Credentials)
}));

app.use(cookieParser());
// Config la session
const sessionConfig = {
  name: config.SESSION_NAME,
  secret: config.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    path: '/',
    secure: false,
    httpOnly: true,
  },
  store: MongoStore.create({
    mongoUrl: config.MONGO_SOCIAL_NETWORK,
    autoRemove: 'disabled',
    collectionName: 'sessions',
    stringify: false
  })
}

app.use(session(sessionConfig));

// Middleware de rutas
app.use(socialNetworkRoutes);
// Ruta para la documentación Swagger UI
app.use('/social-network/doc', swaggerUI.serve, swaggerUI.setup(swaggerConfig));

export default app 