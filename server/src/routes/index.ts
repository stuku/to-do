import { Router } from "express";
import ToDoRoute from "./ToDo";

abstract class Route {
    protected router = Router();
    protected prefix: string = "/";
    protected abstract setRoutes(): void;
    
    public getRouter() {
        return this.router;
    }
    public getPrefix() {
        return this.prefix;
    }
}

export const router: Array<Route> = [
    new ToDoRoute(),
];

export default Route;