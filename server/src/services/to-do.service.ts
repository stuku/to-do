import { countPage } from "@utils/common";
import { debounceTime } from "rxjs/operators";
import { formatQuery } from "@utils/requests";
import { IPagination } from "@type/common";
import { InvalidParamsError, NotFoundError, UnknownError } from "@type/errors";
import { IToDoQuery, ToDoParams } from "@type/requests";
import { Observable, switchMap, catchError, from, of } from "rxjs";
import ToDoModel, { IToDo } from "@models/to-do.model";

interface IToDoService {
    getAll(query?: IToDoQuery): Observable<IPagination>;
    addOne(toDo: ToDoParams): Promise<Observable<IToDo>>;
    updateOne(id: string, toDo: ToDoParams): Promise<Observable<IToDo>>;
    deleteOne(id: string): Promise<Observable<IToDo>>;
}

export class ToDoService implements IToDoService {
    public getAll(query?: IToDoQuery): Observable<IPagination> {
        const { limit: pageSize = 10, page = 1 } = query || {};
        const toDos$: Observable<IToDo[]> = from(
            ToDoModel.aggregate()
                .match(formatQuery(query?.filterBy))
                .skip((pageSize * page) - pageSize)
                .limit(pageSize)
        );

        return toDos$.pipe(
            debounceTime(500),
            switchMap((result) => {
                if (!result) {
                    throw new NotFoundError();
                }
                const totalCount: number = result.length;
                return of({
                    totalCount,
                    pageCount: countPage(totalCount, pageSize),
                    pageSize,
                    page,
                    data: result
                } as IPagination);
            }),
            catchError(() => {
                throw new InvalidParamsError(query);
            })
        );
    }

    public async addOne(toDo: ToDoParams): Promise<Observable<IToDo>> {
        if (!toDo) {
            throw new InvalidParamsError(toDo);
        }

        return of(await ToDoModel.create(toDo)).pipe(
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