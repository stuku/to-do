import { IToDo } from "@models/to-do.model";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export type TStatusCode = typeof StatusCodes[keyof typeof StatusCodes];

export interface IQuery {
    __l?: number;
    __p?: number;
    __sv?: number;
    __sp?: string;
}

export type ToDoParams = Partial<Pick<IToDo, "title" | "description" | "status">>;

export interface IToDoQuery extends IQuery, ToDoParams { }

export interface IResponse extends Response {
    code: TStatusCode;
    message: string;
    data?: any;
}

export interface IPagination {
    totalCount: number;
    pageCount: number;
    pageSize: number;
    page: number;
}

export interface IGetToDosResponse {
    list: IToDo[];
    pagination: IPagination;
}