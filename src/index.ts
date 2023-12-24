import app from './app';
import { config, db } from "./config";

app.listen(config.PORT, () => {
  db()
  console.log(`Server on port: http://localhost:${config.PORT}`);
});