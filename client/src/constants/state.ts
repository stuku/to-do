import { formatPagination } from '../utils/common';
import { ICommonState, IToDoState } from '../store/reducers/type';
import { RootState } from '../store/type';

export const initialCommonState: ICommonState = {
    overlay: false,
    toastMessage: ''
};

export const initialToDoState: IToDoState = {
    filterBy: {},
    list: [],
    pagination: formatPagination()
};

export const initialState: RootState = {
    toDo: initialToDoState
}