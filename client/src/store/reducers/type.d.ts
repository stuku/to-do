import { ESort } from '../../enums/common.enum';
import { IPagination, IToDo, Status } from '../../utils/type';

export interface IToDoFilterBy {
    _id?: string;
    title?: string;
    description?: string;
    status?: Status;
}

export interface ISortBy {
    property: string;
    value: ESort.ASC | ESort.DSC;
}

export interface ICommonState {
    overlay: boolean;
    toastMessage: string;
}

export interface IToDoState {
    renderKeyId: number;
    filterBy: IToDoFilterBy;
    sortBy: ISortBy;
    list: IToDo[];
    pagination: IPagination;
}