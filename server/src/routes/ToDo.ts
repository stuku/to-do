import ENDPOINT from "@config/apis/endpoint";
import Route from "./index";
import { ToDoController } from "../controllers/ToDo";

class ToDoRoute extends Route {
    private toDoController = new ToDoController();

    constructor() {
        super();
        this.prefix = ENDPOINT.TO_DO;
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.get("", this.toDoController.getAll)
            .post("", this.toDoController.addOne)
            // .put("/:id", this.toDoController.updateOne)
            .delete("/:id", this.toDoController.deleteOne);
    }
}

export default ToDoRoute;