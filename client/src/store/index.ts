import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import rootEpic from './epics';
import services from '../services/index';
import { initialState } from '../constants/state';

export const epicMiddleware = createEpicMiddleware({
  dependencies: services.api,
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