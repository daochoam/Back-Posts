import dotenv from 'dotenv';
dotenv.config()

const config: IConfig = {
  //? PORT Conexion
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 8080,

  //? MongoDB Connect
  MONGO_SOCIAL_NETWORK: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,

  //? whiteList CORS
  whiteList: [
    'http://localhost:4200',
    'http://127.0.0.1:4200',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    process.env.URL_SOCIALNETWORK_FRONT,
    undefined
  ],

  JWT_ID_SESSION: process.env.JWT_ID_SESSION || '',
  SESSION_KEY: process.env.COOKIE_KEY || '',
  SESSION_NAME: process.env.COOKIE_NAME || ''
};


export default config;