import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models';
import routes from './routes';

const app = express();

// use helmet
app.use(helmet());

// use cors
app.use(cors());

// use morgan
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// life check route
app.get('/', (req, res) => {
  res.send('Server alive');
});

// connect route
app.use('/', routes);

// connect database
sequelize.sync();

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
export default app;
