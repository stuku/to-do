import { combineEpics } from 'redux-observable';
import * as commonEpics from './common.epic';
import * as toDoEpics from './to-do.epic';

export default combineEpics(
    ...Object.values(commonEpics),
    ...Object.values(toDoEpics),
);