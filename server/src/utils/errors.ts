import { generateResponse } from "./response";
import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export function errorHandler(_req: Request, res: Response, next: NextFunction): void {
    const errors: Result<ValidationError> = validationResult(_req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.BAD_REQUEST)
            .json(generateResponse(StatusCodes.BAD_REQUEST, JSON.stringify(errors.array()), null));
    }
    next();
}