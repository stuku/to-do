import { CustomRoute } from "../types/routes";
import ENDPOINT from "@config/apis/endpoint";
import { errorHandler } from "@utils/errors";
import { ToDoController } from "@controllers/to-do.controller";
import { toDoModelValidation } from "@utils/validation";

class ToDoRoute extends CustomRoute {
    private toDoController: ToDoController = new ToDoController();

    constructor() {
        super();
        this.prefix = ENDPOINT.TO_DO;
        this.setRoutes();
    }

    protected setRoutes(): void {
        this.router.use(errorHandler)
            .get("", this.toDoController.getAll)
            .post("", toDoModelValidation, this.toDoController.addOne)
            .put("/:id", this.toDoController.updateOne)
            .delete("/:id", this.toDoController.deleteOne);
    }
}

export default ToDoRoute;