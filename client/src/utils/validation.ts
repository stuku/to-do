import { Status, ToDoParams } from "./type";
import { statusOptions } from "../constants/common";

export function validateToDoParams(toDo: ToDoParams): boolean {
    return (
        !!toDo &&
        typeof toDo.title === 'string' && toDo.title.length > 2 &&
        typeof toDo.description === 'string' &&
        statusOptions.findIndex((option: Status) => option.value === toDo.status) > -1
    );
}