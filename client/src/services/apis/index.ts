import toDo, { IToDoApi } from './to-do';

export interface IEpicDependency {
    toDo: IToDoApi;
}

const api: IEpicDependency = {
    toDo
};

export default api;