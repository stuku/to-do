import { API_PREFIX } from "@config/apis/prefix";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import { MONGODB_URL } from "./secrets";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { Request, Response } from "express";
import routes from "@routes/index";
import { Server } from "http";

interface IServer {
    configureMiddleware(): void
    setRoutes(): void
    start(port: string | number): void
}


export class AppServer implements IServer {
    private readonly _app: Application;
    private _server!: Server;
    private readonly SERVER_STARTED = "Server is running on port: ";

    get app(): Application {
        return this._app;
    }

    get server(): Server {
        return this._server;
    }

    constructor() {
        this._app = express();
        this.configureMiddleware();
        this.setRoutes();
    }

    public configureMiddleware(): void {
        // Dev logger
        this._app.use(morgan("tiny"));

        // Required for POST requests
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));

        // CORS
        this._app.use(cors());

        // Connect to MongoDB
        mongoose.connect(MONGODB_URL).then(
            () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
        ).catch((error: Error) => {
            console.error(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
            // process.exit();
        });
    }

    public setRoutes(): void {
        this._app.use(express.static(path.join(__dirname, "build")));
        this._app.get("/", (_req: Request, res: Response): void => {
            res.sendFile(path.join(__dirname, "build", "index.html"));
        });
        this._app.get("/express_backend", (_req: Request, res: Response): void => {
            res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
        });
        this._app.use(API_PREFIX, routes);
    }

    public start(port: string | number): void {
        this._app.set("port", port);
        this._server = this._app.listen(this._app.get("port"), (): void => {
            console.log(this.SERVER_STARTED + this._app.get("port"));
        });
    }
}

export default AppServer;