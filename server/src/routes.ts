import express from "express";
import { celebrate, Joi } from "celebrate";
import multer from "multer";
import multerConfig from "./config/multer";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

import PointSchema from "./schemas/pointSchema";

const routes = express.Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();
const itemsController = new ItemsController();

// Controllers
// index => listagem
// show => mostrar um item
// create / store
// update
// delete / destroy

// Routes items
routes.get("/items", itemsController.index);
routes.post("/items", itemsController.create);
routes.put("/items/:id", itemsController.update);
routes.delete("/items/:id", itemsController.delete);

// Routes point
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);
routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: PointSchema,
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);

export default routes;

// Service pattern
// Repository Patter ( Data Mapper)
