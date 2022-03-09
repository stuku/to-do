import { statusValues } from "../constants/common";
import { ToDoParams } from "./type";

export function validateToDoParams(toDo: ToDoParams): boolean {
    return (
        !!toDo &&
        typeof toDo.title === 'string' && toDo.title.length > 2 &&
        typeof toDo.description === 'string' &&
        statusValues.indexOf(toDo.status) > -1
    );
}