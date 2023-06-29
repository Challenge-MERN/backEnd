import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import UserRoutes from '../routes/user-routes';
import TaskRoutes from '../routes/task-routes';

export class MainServer {
    // Endpoints
    private EndPointUser: string = '/user';
    private EndPointTask: string = '/task';

    // Variables
    private app: Application;
    private port: String;

    constructor (port: String) {
        this.port = port;
        this.app = express();
        this.middleWares();
        this.asingRoutes();
        this.app.listen(port, () => {
            console.log('server listening port', port);
        });
    }

    middleWares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('ACcess-Control-Allow-Headers', 'Authorization, X-API-Kew, Origin, X-Requested-With, Content-Type, Access-Control-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }

    asingRoutes() {
        this.app.use(this.EndPointUser, UserRoutes);
        this.app.use(this.EndPointTask, TaskRoutes);
        this.app.use('/', (req, res) => {
            res.status(200).json({
                status: 'OK',
                data: 'Connection successful!'
            });
        })
    }

}