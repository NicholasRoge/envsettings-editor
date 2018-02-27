import React from "react";

import store from "./store";

import {Provider} from "react-redux";
import {Router} from "./components";


export default function Renderer() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}