import { IPagination, IToDo, Status } from "../../utils/type";

export interface IToDoFilterBy {
    _id?: string;
    title?: string;
    description?: string;
    status?: Status;
}

export interface ICommonState {
    overlay: boolean;
    toastMessage: string;
}

export interface IToDoState {
    renderKeyId: number;
    filterBy: IToDoFilterBy;
    list: IToDo[];
    pagination: IPagination;
}