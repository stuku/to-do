import { IPagination, IToDo, Status } from "../../utils/type";

export interface IToDoFilterBy {
    _id?: string;
    title?: string;
    description?: string;
    status?: Status;
}

export interface ICommonState {
    overlay: Boolean;
    toastMessage: String;
}

export interface IToDoState {
    filterBy: IToDoFilterBy;
    list: IToDo[];
    pagination: IPagination;
}