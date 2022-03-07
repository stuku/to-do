import { ajax, AjaxResponse } from 'rxjs/ajax';
import { API_PREFIX } from './prefix';
import { encodeToDoQuery } from '../../utils/requests';
import * as ENDPOINT from './endpoint';
import { IGetToDosResponse, IToDo, IToDoQuery, ToDoParams } from '../../utils/type';
import { Observable } from 'rxjs';

const toDoApiEndpoint: string = API_PREFIX + ENDPOINT.TO_DO;

export const getAll = (query?: IToDoQuery): Observable<IGetToDosResponse> => ajax.getJSON<IGetToDosResponse>(toDoApiEndpoint + `?${encodeToDoQuery(query)}`);
export const addOne = (toDo: ToDoParams): Observable<AjaxResponse<IToDo>> => ajax.post<IToDo>(toDoApiEndpoint, toDo);
export const updateOne = (id: string, toDo: ToDoParams): Observable<AjaxResponse<IToDo>> => ajax.put<IToDo>(toDoApiEndpoint + `/${id}`, toDo);
export const deleteOne = (id: string): Observable<AjaxResponse<IToDo>> => ajax.delete<IToDo>(toDoApiEndpoint + `/${id}`);