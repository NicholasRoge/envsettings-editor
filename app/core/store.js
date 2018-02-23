import path from "path";
import thunk from "redux-thunk";

import {applyMiddleware, combineReducers, createStore, compose} from "redux";

import {reducer} from "$app/features/settings";

import initialState from "$data/state/initial";


const featureReducers = {};

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

export default createStore(
    featureReducers === {} ? state => (state || {}) : combineReducers(featureReducers),
    initialState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);