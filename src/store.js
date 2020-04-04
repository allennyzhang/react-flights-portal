import logger from 'redux-logger'
import { combineReducers, createStore, applyMiddleware } from "redux";
import { FlightReducer } from './redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  flightState: FlightReducer,
});

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
