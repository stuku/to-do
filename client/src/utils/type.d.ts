import color from '@material-ui/core/colors';
import { EStatus } from '../../../enums/to-do.enum';
import { Operation } from '@enums/type';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export type Status = typeof EStatus[keyof typeof EStatus];

export interface IToDo {
    _id: string;
    title: string;
    description?: string;
    status: Status;
}

export interface IQuery {
    __l?: number;
    __p?: number;
    __sv?: number;
    __sp?: string;
}

export type ToDoParams = Partial<Pick<IToDo, 'title' | 'description' | 'status'>>;

export interface IToDoQuery extends IQuery, ToDoParams { }

export type TStatusCode = typeof StatusCodes[keyof typeof StatusCodes];

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

export type IUpdateToDoData = Omit<IToDo, '_id'>;

export interface IUpdateToDoPayload {
    id: string;
    data: IUpdateToDoData;
}