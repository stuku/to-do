import { ADD_TODO_SUCCESSFULLY, CHANGE_PAGE_NUMBER, CHANGE_PAGE_SIZE, SET_TO_DOS, UPDATE_TODO_SUCCESSFULLY } from '../actions/to-do.action';
import { createReducer } from '@reduxjs/toolkit';
import { initialToDoState } from '../../constants/state';
import { IToDo } from '../../utils/type';

const toDoReducer = createReducer(initialToDoState, {
    [SET_TO_DOS]: (state, action) => {
        const { list, pagination } = action?.payload?.data || {};
        state.list = list
        state.pagination = pagination;
    },
    [ADD_TODO_SUCCESSFULLY]: (state, action) => {
        state.list.splice(0, 0, action?.payload?.response?.data);
        if (state.list.length === state.pagination.pageSize) {
            state.list.pop();
        }
    },
    [UPDATE_TODO_SUCCESSFULLY]: (state, action) => {
        const idx: number = state.list.findIndex((existingToDo: IToDo) => existingToDo._id === action?.payload?.response?.data?._id);
        state.list[idx] = action?.payload?.response?.data;
    },
    [CHANGE_PAGE_NUMBER]: (state, action) => {
        state.pagination.page = action?.payload;
    },
    [CHANGE_PAGE_SIZE]: (state, action) => {
        state.pagination.page = 0;
        state.pagination.pageSize = action?.payload;
    },
});

export type ToDoState = ReturnType<typeof toDoReducer>;

export default toDoReducer;