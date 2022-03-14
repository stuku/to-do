import { Action, applyMiddleware, compose, createStore, } from 'redux';
import api, { IEpicDependency } from '../services/apis';
import { createEpicMiddleware } from 'redux-observable';
import { initialState } from '../constants/state';
import rootEpic from './epics';
import rootReducer from './reducers';
import { RootState } from './type';

export const epicMiddleware = createEpicMiddleware<Action, Action, RootState, IEpicDependency>({
  dependencies: api,
});

// configure middleware
const middleware = [epicMiddleware];

// compose enhancers
const enhancer = compose(applyMiddleware(...middleware));


// create store
const store = createStore(rootReducer, initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;