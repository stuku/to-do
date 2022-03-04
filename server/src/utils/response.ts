import { IResponse } from "@models/common.model"
import { StatusCodes } from "http-status-codes"

export function generateResponse(
    code: typeof StatusCodes[keyof typeof StatusCodes],
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