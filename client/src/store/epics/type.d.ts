import { ToDoState } from '../reducers/to-do.reducer';

export interface IPagination {
    totalCount: number;
    pageCount: number;
    pageSize: number;
    page: number;
}

export type ToDoEpic<Out extends ToDoActions = ToDoActions> = Epic<ToDoActions, Out, ToDoState>;