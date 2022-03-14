import { ajax, AjaxResponse } from 'rxjs/ajax';
import { API_PREFIX } from './prefix';
import { encodeToDoQuery } from '../../utils/requests';
import * as ENDPOINT from './endpoint';
import { IGetToDosResponse, IToDo, IToDoQuery, ToDoParams } from '../../utils/type';
import { Observable } from 'rxjs';

export interface IToDoApi {
    getAll: (query?: IToDoQuery) => Observable<IGetToDosResponse>;
    addOne: (toDo: ToDoParams) => Observable<AjaxResponse<IToDo>>;
    updateOne: (id: string, toDo: ToDoParams) => Observable<AjaxResponse<IToDo>>;
    deleteOne: (id: string) => Observable<AjaxResponse<IToDo>>;
}

const toDoApiEndpoint: string = API_PREFIX + ENDPOINT.TO_DO;

const toDo: IToDoApi = {
    getAll: (query?: IToDoQuery): Observable<IGetToDosResponse> => ajax.getJSON<IGetToDosResponse>(toDoApiEndpoint + `?${encodeToDoQuery(query)}`),
    addOne: (toDo: ToDoParams): Observable<AjaxResponse<IToDo>> => ajax.post<IToDo>(toDoApiEndpoint, toDo),
    updateOne: (id: string, toDo: ToDoParams): Observable<AjaxResponse<IToDo>> => ajax.put<IToDo>(toDoApiEndpoint + `/${id}`, toDo),
    deleteOne: (id: string): Observable<AjaxResponse<IToDo>> => ajax.delete<IToDo>(toDoApiEndpoint + `/${id}`),
}

export default toDo;