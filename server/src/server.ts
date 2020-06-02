import express from 'express';
import cors from 'cors';

import routes from './routes';
import { resolve } from 'path';

const app = express();

app.use(express.json())
app.use(cors())

app.use(routes); 

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')))

app.listen(3333, () => console.log("Serviço no endereço http://localhost:3333"));