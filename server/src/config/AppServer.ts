import { API_PREFIX } from "@config/apis/prefix";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import { MONGODB_URL } from "./secrets";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { RegisterRoutes } from "@routes/routes";
import { Request, Response } from "express";
import ROUTE_PATH from "@config/path";
import { router } from "@routes/index";
import { Server } from "http";
import swaggerUi from "swagger-ui-express";

interface IServer {
    configureMiddleware(): void;
    setRoutes(): void;
    start(port: string | number): void;
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
        this._app.use(morgan("tiny"))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }))
            .use(cors())
            .use(ROUTE_PATH.API_DOC, swaggerUi.serve, async (_req: Request, res: Response): Promise<Response> => {
                return res.send(
                    swaggerUi.generateHTML(await import("@spec/swagger.json"))
                );
            });

        mongoose.connect(MONGODB_URL).then(
            () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
        ).catch((error: Error) => {
            console.error(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
            // process.exit();
        });
    }

    public setRoutes(): void {
        for (const route of router) {
            this._app.use(API_PREFIX + route.getPrefix(), route.getRouter());
        }

        this._app.use(express.static(path.join(__dirname, "build")))
            .get("/", (_req: Request, res: Response): void => {
                res.sendFile(path.join(__dirname, "build", "index.html"));
            });

        // tsoa
        RegisterRoutes(this._app);
    }

    public start(port: string | number): void {
        this._app.set("port", port);
        this._server = this._app.listen(this._app.get("port"), (): void => {
            console.log(this.SERVER_STARTED + this._app.get("port"));
        });
    }
}

export default AppServer;