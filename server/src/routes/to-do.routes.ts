import { CustomRoute } from "../types/routes";
import ENDPOINT from "@config/apis/endpoint";
import { errorHandler } from "@utils/errors";
import { ToDoController } from "@controllers/to-do.controller";
import { toDoModelValidation } from "@utils/validation";

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

export default ToDoRoute;