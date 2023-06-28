import dotenv from 'dotenv';
import { MainServer } from './src/server/main-server';

dotenv.config();

const server = new MainServer(process.env.PORT || '3000')
