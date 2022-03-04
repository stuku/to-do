import { Router } from "express";

export abstract class CustomRoute {
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