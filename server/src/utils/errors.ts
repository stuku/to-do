import { generateResponse } from "./response";
import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { TStatusCode } from "./type";

export abstract class CustomError extends Error {
    public readonly status: TStatusCode = StatusCodes.BAD_REQUEST;

    constructor(msg: string, status: number) {
        super(msg);
        this.status = status;
    }
}

export class InvalidParamsError extends CustomError {
    public static readonly msg: string = "One or more of the required parameters was missing.";
    public static readonly status: TStatusCode = StatusCodes.BAD_REQUEST;

    constructor(params: any) {
        super("Parameters " + JSON.stringify(params) + " sent.\n" + InvalidParamsError.msg, InvalidParamsError.status);
    }
}

export class NotFoundError extends CustomError {
    public static readonly msg: string = "Data with given parameters does not exists in the database.";
    public static readonly status: TStatusCode = StatusCodes.NOT_FOUND;

    constructor() {
        super(NotFoundError.msg, NotFoundError.status);
    }
}

export class UnknownError extends CustomError {
    public static readonly msg: string = "Errors occur during processing. Here is the json:\n";
    public static readonly status: TStatusCode = StatusCodes.BAD_REQUEST;

    constructor(error?: Error | null) {
        super(UnknownError.msg + (!!error ? JSON.stringify(error) : error), UnknownError.status);
    }
}

export function errorHandler(_req: Request, res: Response, next: NextFunction): void {
    const errors: Result<ValidationError> = validationResult(_req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST)
            .json(generateResponse(StatusCodes.BAD_REQUEST, JSON.stringify(errors.array()), null));
    }
    next();
}