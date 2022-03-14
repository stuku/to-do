import { debounceTime } from "rxjs/operators";
import { formatGetToDosResponse } from "@utils/response";
import { formatQuery, getSkipNumber } from "@utils/requests";
import { IGetToDosResponse, IToDoQuery, ToDoParams } from "@utils/type";
import { InvalidParamsError, NotFoundError, UnknownError } from "@utils/errors";
import { Observable, switchMap, catchError, from, forkJoin, of, } from "rxjs";
import ToDoModel, { IToDo } from "@models/to-do.model";

interface IToDoService {
    getAll(query?: IToDoQuery): Promise<Observable<IGetToDosResponse>>;
    addOne(toDo: ToDoParams): Promise<Observable<IToDo>>;
    updateOne(id: string, toDo: ToDoParams): Promise<Observable<IToDo>>;
    deleteOne(id: string): Promise<Observable<IToDo>>;
}

export class ToDoService implements IToDoService {
    public async getAll(query?: IToDoQuery): Promise<Observable<IGetToDosResponse>> {
        const { __l: pageSize = 10, __p: page = 0, __sv: sortByValue = 1, __sp: sortByProperty = '_id' } = query || {};

        const formattedQuery = formatQuery(query);
        const toDos$: Observable<IToDo[]> = from(
            ToDoModel.find(formattedQuery)
                .sort({ [sortByProperty]: sortByValue })
                .skip(getSkipNumber(pageSize, page))
                .limit(pageSize)
                .exec()
        );
        const totalCount$: Observable<number> = of(await ToDoModel.countDocuments(formattedQuery));

        return forkJoin([toDos$, totalCount$]).pipe(
            debounceTime(500),
            switchMap((result: [IToDo[], number]) => {
                return of(formatGetToDosResponse(result, pageSize, page));
            }),
            catchError(() => {
                throw new InvalidParamsError(query)
            }),
        );
    }

    public async addOne(toDo: ToDoParams): Promise<Observable<IToDo>> {
        if (!toDo || typeof toDo?.title !== 'string' || toDo?.title?.length < 3) {
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
                throw error;
            }),
        );
    }

    public async updateOne(id: string, toDo: ToDoParams): Promise<Observable<IToDo>> {
        if (typeof id !== "string" || !toDo || typeof toDo?.title !== 'string' || toDo?.title?.length < 3) {
            throw new InvalidParamsError({ id, toDo });
        }

        return of(await ToDoModel.findOneAndUpdate({ _id: id }, { $set: toDo }, { returnOriginal: false })).pipe(
            switchMap((result: null | IToDo) => {
                if (!result) {
                    throw new NotFoundError();
                }
                return of(result);
            }),
            catchError((error: Error) => {
                throw error;
            }),
        );
    }

    public async deleteOne(id: string): Promise<Observable<IToDo>> {
        if (typeof id !== "string") {
            throw new InvalidParamsError(id);
        }

        return of(await ToDoModel.findOneAndDelete({ _id: id })).pipe(
            switchMap((result: null | IToDo) => {
                if (!result) {
                    throw new NotFoundError();
                }
                return of(result);
            }),
            catchError((error: Error) => {
                throw error;
            }),
        );
    }
}