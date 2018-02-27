import reducer from "./reducer";

import {loadFileAction, saveFileAction} from "./actions";

import Renderer from "./Renderer";


module.exports = {
    reducer,
    loadFileAction,
    saveFileAction,
    Renderer
};
module.exports.default = module.exports;