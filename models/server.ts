import express, { Express } from 'express';
import { conectarDB } from '../db/config';
import routerU from '../routes/users';
import routerT from '../routes/turnos';
import cors from 'cors';

export default class Server {
    app: Express;
    port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.conexionADB();
        this.middlewares();
        this.routes();
    };

    async conexionADB(): Promise<void> {
        await conectarDB();
    };

    middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
    };

    routes(): void {
        this.app.use('/api/users', routerU);
        this.app.use('/api/turnos', routerT);

    };

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    };
};