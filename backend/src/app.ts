import express, { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import Controller from './shared/interfaces/controller.interface';
import errorMiddleware from './shared/middleware/error.middleware';
import Middleware from './shared/interfaces/middleware.interface';
import cors from 'cors';
import path from 'path';

class App {
    public app: express.Application;
    public controllers: Controller[];

    constructor(controllers: Controller[], middlewares: Middleware[]) {
        this.app = express();
        this.controllers = controllers;
        this.initializeMiddlewares(middlewares);
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(3000, () => {
            console.log(`App listening on port: 3000`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares(middlewares: Middleware[]) {
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname, 'uploads')));
        this.app.use(bodyParser.json());
        this.app.use(function (request: any, response: any, next) {
            response.header("Access-Control-Allow-Origin", request.headers.origin);
            response.header(
                "Access-Control-Allow-Methods",
                "GET, POST, OPTIONS, PUT, PATCH, DELETE"
            );
            response.header("Access-Control-Allow-Headers", "Content-Type,session_token", "Origin, X-Requested-With, Accept, *");
            next();
        });

        middlewares.forEach((middleware) => {
            this.app.use(middleware.requestHandler);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
}

export default App;