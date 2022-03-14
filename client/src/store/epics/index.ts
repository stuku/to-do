import { Action } from 'redux';
import { combineEpics } from 'redux-observable';
import { IEpicDependency } from '@services/apis';
import { RootState } from '@store/type';
import * as commonEpics from './common.epic';
import * as toDoEpics from './to-do.epic';

export default combineEpics<Action, Action, RootState, IEpicDependency>(
    ...Object.values(commonEpics),
    ...Object.values(toDoEpics),
);