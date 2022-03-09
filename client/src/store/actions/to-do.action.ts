import { AjaxResponse } from 'rxjs/ajax';
import { createAction } from '@reduxjs/toolkit';
import { IToDoFilterBy } from '@store/reducers/type';
import { IGetToDosResponse, IToDo, IUpdateToDoPayload, ToDoParams } from '../../utils/type';

export const GET_TO_DOS: string = 'GET_TO_DOS';
export const SET_TO_DOS: string = 'SET_TO_DOS';
export const ADD_TO_DO: string = 'ADD_TO_DO';
export const ADD_TODO_SUCCESSFULLY: string = 'ADD_TODO_SUCCESSFULLY';
export const UPDATE_TO_DO: string = 'UPDATE_TO_DO';
export const UPDATE_TODO_SUCCESSFULLY: string = 'UPDATE_TODO_SUCCESSFULLY';
export const DELETE_TO_DO: string = 'DELETE_TO_DO';

export const CHANGE_PAGE_NUMBER: string = 'CHANGE_PAGE_NUMBER';
export const CHANGE_PAGE_SIZE: string = 'CHANGE_PAGE_SIZE';
export const SET_FILTER_BY: string = 'SET_FILTER_BY';

export const getToDos = createAction(GET_TO_DOS);
export const setToDos = createAction<IGetToDosResponse>(SET_TO_DOS);
export const addToDo = createAction<ToDoParams>(ADD_TO_DO);
export const addToDoSuccessFully = createAction<AjaxResponse<IToDo>>(ADD_TODO_SUCCESSFULLY);
export const updateToDo = createAction<IUpdateToDoPayload>(UPDATE_TO_DO);
export const updateToDoSuccessFully = createAction<AjaxResponse<IToDo>>(UPDATE_TODO_SUCCESSFULLY);
export const deleteToDo = createAction<string>(DELETE_TO_DO);

export const changePageNumber = createAction<number>(CHANGE_PAGE_NUMBER);
export const changePageSize = createAction<number>(CHANGE_PAGE_SIZE);
export const setFilterBy = createAction<IToDoFilterBy>(SET_FILTER_BY);