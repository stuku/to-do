export type OperateResponse = [Action, Operation, any];

export type ToastAction = ReturnType<typeof toast>;
export type SetOverlayAction = ReturnType<typeof setOverlay>;
export type OperateAction = ReturnType<typeof operate>;
export type CommonActions = ToastAction | SetOverlayAction | OperateAction;

export type GetToDosAction = ReturnType<typeof getToDos>;
export type AddToDoAction = ReturnType<typeof addToDo>;
export type UpdateToDoSuccessFullyAction = ReturnType<typeof addToDoSuccessFully>;
export type UpdateToDoAction = ReturnType<typeof updateToDo>;
export type UpdateToDoSuccessFullyAction = ReturnType<typeof updateToDoSuccessFully>;
export type DeleteToDoAction = ReturnType<typeof deleteToDo>;
export type ChangePageNumberAction = ReturnType<typeof changePageNumber>;
export type ChangePageSizeAction = ReturnType<typeof changePageSize>;
export type SetFilterByAction = ReturnType<typeof setFilterBy>;
export type ToDoActions = GetToDosAction | AddToDoAction | UpdateToDoAction | DeleteToDoAction | AddToDoSuccessFullyAction | UpdateToDoSuccessFullyAction | ChangePageNumberAction | ChangePageSizeAction | SetFilterByAction;