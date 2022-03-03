import { CustomRoute } from "../types/Route";
import ENDPOINT from "@config/apis/endpoint";
import { ToDoController } from "../controllers/ToDo";

class ToDoRoute extends CustomRoute {
    private toDoController: ToDoController = new ToDoController();

    constructor() {
        super();
        this.prefix = ENDPOINT.TO_DO;
        this.setRoutes();
    }

    protected setRoutes(): void {
        this.router.get("", this.toDoController.getAll)
            .post("", this.toDoController.addOne)
            // .put("/:id", this.toDoController.updateOne)
            .delete("/:id", this.toDoController.deleteOne);
    }
}

export default ToDoRoute;