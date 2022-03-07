import { Epic, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { OperateAction } from '../actions/type';
import { Observable } from 'rxjs'
import { operate, toast } from '../actions/common.action';

export const operateEpic: Epic<OperateAction> = (action$: Observable<OperateAction>) =>
    action$.pipe(
        ofType(operate.type),
        map((action: OperateAction) => toast(action.payload))
    );