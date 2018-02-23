import reducer from "./reducer";

import {loadFileAction} from "./actions";

import {selectSourceFile} from "./selectors";


module.exports = {
    reducer,
    loadFileAction,
    selectSourceFile
};
module.exports.default = module.exports;