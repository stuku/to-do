import { formatPagination } from "./common";
import { IGetToDosResponse, IResponse, TStatusCode } from "./type";
import { IToDo } from "@models/to-do.model";
import { Observer } from "rxjs";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function generateResponse(
    code: TStatusCode,
    message: string,
    data: any
): IResponse {
    switch (code) {
        case StatusCodes.OK:
            message = "success";
            break
        case StatusCodes.BAD_REQUEST:
            message = "One or more of the required parameters was missing.";
            break;
        case StatusCodes.NOT_FOUND:
            message = "Data with given parameters does not exists in the database.";
            break;
        default:
            break;
    }

    return {
        code,
        message,
        data
    } as IResponse;
}

export function getObserver(res: Response): Observer<any> {
    return {
        next: (result: any) => res.status(StatusCodes.OK).json(generateResponse(StatusCodes.OK, "", result)),
        error: (error: Error) => res.status(StatusCodes.BAD_REQUEST).json(generateResponse(StatusCodes.BAD_REQUEST, JSON.stringify(error), null)),
        complete: () => { }
    };
}

export function formatGetToDosResponse([list, totalCount]: [IToDo[], number], pageSize: number, page: number): IGetToDosResponse {
    return {
        list: list || [],
        pagination: formatPagination(totalCount, pageSize, page)
    };
}