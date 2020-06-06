import express from "express";
import cors from "cors";
import { errors } from "celebrate";
import { resolve } from "path";
import BodyParser from 'body-parser';

import routes from "./routes";

const app = express();
app.use(BodyParser.json());

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errors()); // Validação de dados

app.use("/uploads", express.static(resolve(__dirname, "..", "uploads")));

app.listen(3333, () =>
  console.log("Serviço no endereço http://localhost:3333")
);
