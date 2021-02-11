import express from 'express';
import morgan from 'morgan';
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import {createRoles} from './libs/initialSetup'
import usersRoutes from './routes/user.routes'
//Database
import './database';

//Initializations
const app = express();
createRoles();

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/api/products',productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

export default app