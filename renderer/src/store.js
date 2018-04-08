import path from "path";
import thunk from "redux-thunk";

import {applyMiddleware, createStore, compose} from "redux";

import appReducer from "./reducer";

import initialState from "$data/state/initial";


export default createStore(
    appReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);