// import { createStore, combineReducers, applyMiddleware} from 'redux'
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger  from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from '../reducers' 
// const logger = createLogger({
//     collapsed: true,
//     predicate: () =>
//         process.env.NODE_ENV === `development`, 
// });
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'token','user','location'
    ],
    blacklist: [
        
    ],
};
//Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleware),
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {
    store,
    persistor,
};