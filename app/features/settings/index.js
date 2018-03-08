import reducer from "./reducer";
import store from "$app/core/store";

import {resetAction, importAction} from "./actions";
import {readFromCsv, writeToCsv} from "./io";
import {selectRoot} from "./selectors";

import Renderer from "./Renderer";


module.exports = {
    reducer,
    Renderer,

    resetSettings() {
        store.dispatch(resetAction());
    },

    importSettingsFromCsv(filename, withReset = true) {
        readFromCsv(filename).then(
            data => {
                if (withReset) {
                    store.dispatch(resetAction());
                }
                
                store.dispatch(importAction(data));
            }
        );
    },

    exportSettingsToCsv(filename) {
        writeToCsv(filename, selectRoot(store.getState()));
    }
};
module.exports.default = module.exports;