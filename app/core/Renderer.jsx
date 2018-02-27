import React from "react";

import store from "./store";

import {Provider} from "react-redux";
import {Renderer as SettingsRenderer} from "$app/features/settings";


console.log(SettingsRenderer);
export default function Renderer() {
    return (
        <Provider store={store}>
            <SettingsRenderer />
        </Provider>
    );
}