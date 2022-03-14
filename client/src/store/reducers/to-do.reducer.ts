import { ADD_TODO_SUCCESSFULLY, CHANGE_PAGE_NUMBER, CHANGE_PAGE_SIZE, SET_FILTER_BY, SET_SORT_BY, SET_TO_DOS, UPDATE_TODO_SUCCESSFULLY } from '../actions/to-do.action';
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
        state.list = [action?.payload?.response?.data, ...state.list].slice(0, state.pagination.pageSize);
    },
    [UPDATE_TODO_SUCCESSFULLY]: (state, action) => {
        state.list = state.list.map((existingToDo: IToDo): IToDo => {
            if (existingToDo._id === action?.payload?.response?.data?._id) {
                return action?.payload?.response?.data;
            }
            return existingToDo;
        });
    },
    [CHANGE_PAGE_NUMBER]: (state, action) => {
        state.pagination.page = action?.payload;
        state.list = [];
    },
    [CHANGE_PAGE_SIZE]: (state, action) => {
        state.pagination.page = 0;
        state.pagination.pageSize = action?.payload;
        state.list = [];
    },
    [SET_FILTER_BY]: (state, action) => {
        state.filterBy = action?.payload;
        state.pagination.totalCount = 0;
        state.pagination.pageCount = 0;
        state.pagination.page = 0;
        state.list = [];
        state.renderKeyId += 1;
    },
    [SET_SORT_BY]: (state, action) => {
        state.sortBy = action?.payload;
        state.pagination.page = 0;
        state.list = [];
        state.renderKeyId += 1;
    },
});

export type ToDoState = ReturnType<typeof toDoReducer>;

export default toDoReducer;