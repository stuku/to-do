import { Epic, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { OperateAction } from '../actions/type';
import { Observable } from 'rxjs'
import { operate, setOverlay, toast } from '../actions/common.action';

export const operateEpic: Epic<OperateAction> = (action$: Observable<OperateAction>) =>
    action$.pipe(
        ofType(operate.type),
        mergeMap((action: OperateAction) => [setOverlay(false), toast(action.payload)]),
    );