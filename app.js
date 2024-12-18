import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();


const corsOptions = {
    origin: 'http://127.0.0.1:5500'  };

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', routes);

export default app;