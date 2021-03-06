import express, { Request, Response } from 'express';
import { ApplicationConfig, TodoAppApplication } from './application';
import http from 'http';
import path from 'path';
import { once } from 'events';

export { ApplicationConfig }

export class ExpressServer {

    public readonly app: express.Application;
    public readonly lbApp: TodoAppApplication;
    private server?: http.Server;


    constructor(options: ApplicationConfig = {}) {
        this.app = express();
        this.lbApp = new TodoAppApplication(options);
        this.app.use('/api', this.lbApp.requestHandler);


        this.app.get('/', function (req: Request, res: Response) {
            res.sendFile(path.resolve('public/moja.html'));
        })

        this.app.get('/hello', function (_req: Request, res: Response) {
            res.send('Hello world from LB');
        })

    }

    async boot() {
        await this.lbApp.boot();
    }

    public async start() {
        await this.lbApp.start();
        const port = this.lbApp.restServer.config.port ?? 3000;
        const host = this.lbApp.restServer.config.host ?? '127.0.0.1';
        this.server = this.app.listen(port, host);
        await once(this.server, 'słucham na porcie 3000');
    }

    public async stop() {
        if (!this.server) return;
        await this.lbApp.stop();
        this.server.close();
        await once(this.server, 'zamknięty');
        this.server = undefined;
    }
}