import path from "path";
import thunk from "redux-thunk";

import {applyMiddleware, combineReducers, createStore} from "redux";

import settings from "~/features/settings";


export default createStore(
    combineReducers({settings}),
    applyMiddleware(thunk)
);