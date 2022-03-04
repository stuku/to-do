import { API_PREFIX } from "@config/apis/prefix";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import { MONGODB_URL } from "./secrets";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
// import { RegisterRoutes } from "@routes/routes";
import { Request, Response } from "express";
import ROUTE_PATH from "@config/path";
import { router } from "@routes/index";
import { Server } from "http";
import swaggerUi from "swagger-ui-express";

interface IServer {
    start(port: string | number): void;
    stop(): Promise<void>;
}


export class AppServer implements IServer {
    private readonly _app: Express;
    private _server!: Server;
    private readonly SERVER_STARTED: string = "Server is running on port: ";

    get app(): Express {
        return this._app;
    }

    get server(): Server {
        return this._server;
    }

    constructor() {
        this._app = express();
        this.connectDb();
        this.configureMiddleware();
        this.setRoutes();
    }

    protected connectDb(): void {
        mongoose.connect(MONGODB_URL).catch((error: Error): void => {
            console.error(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
        });
    }

    protected configureMiddleware(): void {
        this._app.use(morgan("tiny"))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }))
            .use(cors())
            .use(ROUTE_PATH.API_DOC, swaggerUi.serve, async (_req: Request, res: Response): Promise<Response> => {
                return res.send(
                    swaggerUi.generateHTML(await import("@spec/swagger.json"))
                );
            });
    }

    protected setRoutes(): void {
        for (const route of router) {
            this._app.use(API_PREFIX + route.getPrefix(), route.getRouter());
        }

        this._app.use(express.static(path.join(__dirname, "../../../client/build")))
            .get("/", (_req: Request, res: Response): void => {
                res.sendFile(path.join(__dirname, "../../../client/build", "index.html"));
            });

        // tsoa
        // RegisterRoutes(this._app);
    }

    public start(port: string | number): void {
        this._app.set("port", port);
        this._server = this._app.listen(this._app.get("port"), (): void => {
            console.log(this.SERVER_STARTED + this._app.get("port"));
        });
    }

    protected async disconnectDb(): Promise<void> {
        await mongoose.connection.close();
    }

    public async stop(): Promise<void> {
        await this.disconnectDb();
        this._server.close();
    }
}

export default AppServer;