import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export interface IResponse extends Response {
    code: typeof StatusCodes[keyof typeof StatusCodes];
    message: string;
    data?: any;
}