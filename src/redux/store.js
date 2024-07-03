import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import globalReducers from './reducers/globalReducers';

const rootReducer = combineReducers({
    global: globalReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;