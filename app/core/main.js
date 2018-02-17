import path from "path";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";

import {Provider} from "react-redux";
import Router from "./components/Router";

import {loadFileAction} from "~/features/settings";


ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById("app")
);

