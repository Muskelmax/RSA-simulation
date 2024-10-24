import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Message } from "./models/messagesModel.js";
import messagesRoute from './routes/messagesRoute.js'
import { Client } from "./models/keyModel.js";
import clientRoute from './routes/clientRoutes.js'

dotenv.config();
const port = process.env.PORT;
const mongoDB_URL = process.env.DB_CONNECTION_STRING;


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
  res.send({message: "hello MERN-stack"})
})

app.use('/message', messagesRoute);
app.use('/client', clientRoute);

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`)
    })
  })
  .catch((err) => {
    console.log(err);
  })
