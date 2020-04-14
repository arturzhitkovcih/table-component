import {combineReducers, createStore} from 'redux';

import screenReducer from 'common/reducers/screen';

const reducers = combineReducers({
    screen: screenReducer
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
