import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// Controllers
// index => listagem
// show => mostrar um item
// create / store
// update
// delete / destroy

// Routes items
routes.get('/items', itemsController.index);
routes.post('/items', itemsController.create);
routes.put('/items/:id', itemsController.update);
routes.delete('/items/:id', itemsController.delete);

// Routes point
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);
routes.post('/points', pointsController.create);

export default routes;

// Service pattern
// Repository Patter ( Data Mapper)