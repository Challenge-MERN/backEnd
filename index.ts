const dotenv = require('dotenv').config();
const connection = require('./src/connection/dbConnection');
import { MainServer } from './src/server/main-server';

const server = new MainServer(process.env.PORT || '3000')
