
import { CustomRoute } from "../types/routes";
import ToDoRoute from "./to-do.routes";

export const router: Array<CustomRoute> = [
    new ToDoRoute(),
];