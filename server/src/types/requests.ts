import { IToDo } from "@models/to-do.model";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export type ToDoParams = Pick<IToDo, "title" | "description" | "status">;

export interface IToDoQuery {
    filterBy?: ToDoParams;
    page?: number;
    limit?: number;
}

export interface IResponse extends Response {
    code: typeof StatusCodes[keyof typeof StatusCodes];
    message: string;
    data?: any;
}