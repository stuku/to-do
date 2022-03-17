import { IUpdateToDoData } from './type';
import { statusValues } from '../constants/common';

export function validateToDoParams(toDo: IUpdateToDoData): boolean {
    return (
        typeof toDo?.title === 'string' && toDo?.title.length > 2 &&
        typeof toDo?.description === 'string' &&
        statusValues.indexOf(toDo?.status) > -1
    );
}