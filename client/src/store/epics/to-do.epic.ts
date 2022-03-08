import { addToDo, deleteToDo, getToDos, updateToDoSuccessFully, setToDos, updateToDo, addToDoSuccessFully } from '../actions/to-do.action';
import { AddToDoAction, DeleteToDoAction, GetToDosAction, UpdateToDoAction } from '../actions/type';
import api from '../../services/apis';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { EOperation } from '../../enums/common.enum';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { formatToDoQuery } from '../../utils/requests';
import { from, of } from 'rxjs';
import { IGetToDosResponse } from '../../utils/type';
import { Observable } from 'rxjs'
import { operate } from '../actions/common.action';
import { RootState } from '@store/type';

export const getListEpic: Epic = (action$: Observable<GetToDosAction>, state$: StateObservable<RootState>) =>
    action$.pipe(
        ofType(getToDos.type),
        switchMap((action: GetToDosAction) => {
            const { filterBy, pagination } = state$.value.toDo;
            return from(api.toDo.getAll(
                formatToDoQuery(filterBy, pagination))
            ).pipe(
                mergeMap((result: IGetToDosResponse) => [setToDos(result), operate([action.type, EOperation.READ, result])]),
                catchError((error: Error) => of(operate([action.type, EOperation.READ, error])))
            );
        })
    );

export const addOneEpic: Epic<AddToDoAction> = (action$: Observable<AddToDoAction>) =>
    action$.pipe(
        ofType(addToDo.type),
        switchMap((action: AddToDoAction) =>
            from(api.toDo.addOne(action.payload)).pipe(
                mergeMap((result) => [addToDoSuccessFully(result), operate([action.type, EOperation.CREATE, result])]),
                catchError((error: Error) => of(operate([action.type, EOperation.CREATE, error])))
            )
        )
    );

export const updateOneEpic: Epic<UpdateToDoAction> = (action$: Observable<UpdateToDoAction>) =>
    action$.pipe(
        ofType(updateToDo.type),
        switchMap((action: UpdateToDoAction) =>
            from(api.toDo.updateOne(action.payload.id, action.payload.data)).pipe(
                mergeMap((result) => [updateToDoSuccessFully(result), operate([action.type, EOperation.UPDATE, result])]),
                catchError((error: Error) => of(operate([action.type, EOperation.UPDATE, error])))
            )
        )
    );

export const deleteOneEpic: Epic<DeleteToDoAction> = (action$: Observable<DeleteToDoAction>) =>
    action$.pipe(
        ofType(deleteToDo.type),
        switchMap((action: DeleteToDoAction) =>
            from(api.toDo.deleteOne(action.payload)).pipe(
                mergeMap((result) => [operate([action.type, EOperation.DELETE, result]), getToDos()]),
                catchError((error: Error) => of(operate([action.type, EOperation.DELETE, error])))
            )
        )
    );