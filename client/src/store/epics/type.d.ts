import { ToDoState } from '../reducers/to-do.reducer';

export type ToDoEpic<Out extends ToDoActions = ToDoActions> = Epic<ToDoActions, Out, ToDoState>;