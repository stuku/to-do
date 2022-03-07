import { combineReducers } from 'redux';
import commonReducer from './common.reducer';
import toDoReducer from './to-do.reducer';

export default combineReducers({
    common: commonReducer,
    toDo: toDoReducer,
});