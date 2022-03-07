import { debounceTime } from "rxjs/operators";
import { formatQuery } from "@utils/requests";
import { formatGetToDosResponse } from "@utils/response";
import { IGetToDosResponse, IToDoQuery, ToDoParams } from "@utils/type";
import { InvalidParamsError, NotFoundError, UnknownError } from "@utils/errors";
import { Observable, switchMap, catchError, from, of } from "rxjs";
import ToDoModel, { IToDo } from "@models/to-do.model";

interface IToDoService {
    getAll(query?: IToDoQuery): Observable<IGetToDosResponse>;
    addOne(toDo: ToDoParams): Promise<Observable<IToDo>>;
    updateOne(id: string, toDo: ToDoParams): Promise<Observable<IToDo>>;
    deleteOne(id: string): Promise<Observable<IToDo>>;
}

export class ToDoService implements IToDoService {
    public getAll(query?: IToDoQuery): Observable<IGetToDosResponse> {
        const { __l: pageSize = 10, __p: page = 0 } = query || {};

        const toDos$: Observable<IToDo[]> = from(
            ToDoModel.find(formatQuery(query))
                .skip(pageSize * (page + 1) - pageSize)
                .limit(pageSize)
                .exec()
        );

        return toDos$.pipe(
            debounceTime(500),
            switchMap((result: IToDo[]) => {
                if (!result) {
                    throw new UnknownError(result);
                }
                return of(formatGetToDosResponse(result, pageSize, page));
            }),
            catchError((error: Error) => {
                throw new InvalidParamsError(error);
            })
        );
    }

    public async addOne(toDo: ToDoParams): Promise<Observable<IToDo>> {
        if (!toDo) {
            throw new InvalidParamsError(toDo);
        }

        return of(await ToDoModel.create(toDo)).pipe(
            switchMap((result: IToDo) => {
                if (!result) {
                    throw new UnknownError(result);
                }
                return of(result as IToDo);
            }),
            catchError((error: Error) => {
                throw new UnknownError(error);
            })
        );
    }

    public async updateOne(id: string, toDo: ToDoParams): Promise<Observable<IToDo>> {
        if (typeof id !== "string" || !toDo) {
            throw new InvalidParamsError({ id, toDo });
        }

        return of(await ToDoModel.findOneAndUpdate({ _id: id }, { $set: toDo })).pipe(
            switchMap((result) => {
                if (!result) {
                    throw new NotFoundError();
                }
                return of(result as IToDo);
            }),
            catchError((error: Error) => {
                throw new UnknownError(error);
            })
        );
    }

    public async deleteOne(id: string): Promise<Observable<IToDo>> {
        if (typeof id !== "string") {
            throw new InvalidParamsError(id);
        }

        return of(await ToDoModel.findOneAndDelete({ _id: id })).pipe(
            switchMap((result) => {
                if (!result) {
                    throw new NotFoundError();
                }
                return of(result as IToDo);
            }),
            catchError((error: Error) => {
                throw new UnknownError(error);
            })
        );
    }
}