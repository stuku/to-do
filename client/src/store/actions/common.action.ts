import { createAction } from '@reduxjs/toolkit'
import { OperateResponse } from './type';
import { Toast } from '../../enums/type';

export const TOAST: string = 'TOAST';
export const SET_OVERLAY: string = 'SET_OVERLAY';
export const EXECUTE_OPERATION: string = 'EXECUTE_OPERATION';

export const toast = createAction<Toast>(TOAST);
export const setOverlay = createAction<boolean>(SET_OVERLAY);
export const operate = createAction<OperateResponse>(EXECUTE_OPERATION);