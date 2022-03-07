import { createReducer } from '@reduxjs/toolkit';
import { initialCommonState } from '../../constants/state';
import { SET_OVERLAY, TOAST } from '../actions/common.action';

const commonReducer = createReducer(initialCommonState, {
    [SET_OVERLAY]: (state, action) => { state.overlay = action.payload },
    [TOAST]: (state, action) => { state.toastMessage = action.payload }
});

export type CommonState = ReturnType<typeof commonReducer>;

export default commonReducer;