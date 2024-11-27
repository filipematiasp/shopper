import "reflect-metadata";
import { app } from "./app";
import 'dotenv/config';
import { Database } from "./bdInMemory/index"

//inicializar o banco de dados e depois ligar a api
const dataBase = new Database();

dataBase.initialize().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server started on port ${process.env.PORT || 8080}!`);
  })
})
