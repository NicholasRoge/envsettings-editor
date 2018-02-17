import thunk from "redux-thunk";

import {applyMiddleware, createStore} from "redux";


export default createStore(
    (state, action) => state === undefined ? {} : state, // No-op
    applyMiddleware(thunk)
);