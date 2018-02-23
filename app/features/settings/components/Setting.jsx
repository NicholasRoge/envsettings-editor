import React from 'react';

import {basename} from 'path';


let SettingRenderers = {};

const requireFromContext = require.context("./SettingRenderers", false, /\.jsx$/);
for (let rendererPath of requireFromContext.keys()) {
    SettingRenderers[basename(rendererPath, ".jsx")] = requireFromContext(rendererPath).default;
}


export default function Setting({setting, changeHandler, component = "div"}) {
    let renderer = setting.handler || "Default";
    if (!(renderer in SettingRenderers)) {
        renderer = "Default";
    }
    renderer = React.createElement(SettingRenderers[renderer], ...arguments);

    return React.createElement(component, {className: "setting"}, renderer);
}
