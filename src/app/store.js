import path from "path";
import thunk from "redux-thunk";

import {applyMiddleware, combineReducers, createStore, compose} from "redux";

import coreReducer from "./reducer";

import initialState from "$data/state/initial";


let featureReducers = {};

const requireFromContext = require.context("../features", true, /\.\/[^/]*(\/index)?.jsx?$/);
for (let featurePath of requireFromContext.keys()) {
    const feature = requireFromContext(featurePath).default;
    if (!feature.reducer) {
        continue;
    }


    let featureName = feature.nameInStore;
    if (!featureName) {
        const featurePathComponents = featurePath.split("/");

        featureName = featurePathComponents[1];
        if (featurePathComponents.length == 2) {
            featureName = featureName.split(".").slice(0, -1).join(".");  // Remove the extension, regardless of what it may be.
        }
    }

    featureReducers[featureName] = feature.reducer;
}


let appReducer = null;
if (featureReducers === {}) {
    featureReducers = null;
    appReducer = coreReducer;
} else {
    featureReducers = combineReducers(featureReducers);
    appReducer = (state, action) => featureReducers(coreReducer(state, action), action);
}

export default createStore(
    appReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);