import { StatusCodes } from "http-status-codes";

export abstract class CustomError extends Error {
    public readonly status: typeof StatusCodes[keyof typeof StatusCodes] = StatusCodes.BAD_REQUEST;

    constructor(msg: string, status: number) {
        super(msg);
        this.status = status;
    }
}

export class InvalidParamsError extends CustomError {
    public static readonly msg: string = "One or more of the required parameters was missing.";
    public static readonly status: typeof StatusCodes[keyof typeof StatusCodes] = StatusCodes.BAD_REQUEST;

    constructor(params: any) {
        super("' " + JSON.stringify(params) + " ' sent." + InvalidParamsError.msg, InvalidParamsError.status);
    }
}

export class NotFoundError extends CustomError {
    public static readonly msg: string = "Data with given parameters does not exists in the database.";
    public static readonly status: typeof StatusCodes[keyof typeof StatusCodes] = StatusCodes.NOT_FOUND;

    constructor() {
        super(NotFoundError.msg, NotFoundError.status);
    }
}

export class UnknownError extends CustomError {
    public static readonly msg: string = "Errors occur during processing. Here is the json:\n";
    public static readonly status: typeof StatusCodes[keyof typeof StatusCodes] = StatusCodes.BAD_REQUEST;

    constructor(error: Error) {
        super(UnknownError.msg + JSON.stringify(error), UnknownError.status);
    }
}