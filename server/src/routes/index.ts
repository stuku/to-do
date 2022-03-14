import * as ENDPOINT from "@config/apis/endpoint";
import { errorHandler } from "@utils/errors";
import { Router } from "express";
import { ToDoController } from "@controllers/to-do.controller";
import { toDoModelValidation } from "src/constants/validation";

interface ICustomRoute {
    getRouter(): Router;
    getPrefix(): string;
}

export default abstract class CustomRoute implements ICustomRoute {
    protected router: Router = Router();
    protected prefix: string = "/";
    protected abstract setRoutes(): void;

    public getRouter(): Router {
        return this.router;
    }
    public getPrefix(): string {
        return this.prefix;
    }
}

class ToDoRoute extends CustomRoute {
    private readonly _toDoController: ToDoController = new ToDoController();

    constructor() {
        super();
        this.prefix = ENDPOINT.TO_DO;
        this.setRoutes();
    }

    protected setRoutes(): void {
        this.router.use(errorHandler)
            .get("", this._toDoController.getAll)
            .post("", toDoModelValidation, this._toDoController.addOne)
            .put("/:id", this._toDoController.updateOne)
            .delete("/:id", this._toDoController.deleteOne);
    }
}

export const router: Array<CustomRoute> = [
    new ToDoRoute(),
];