import {Types} from "./actions";

import {update} from "$app/core/util";


function GetInitialState() {
    return {
        loading: false,
        data: [],
        environments: ["DEFAULT"],
        sourceFile: null,
    };
}


export default function reducer(state, action) {
    if (state === undefined) {
        state = GetInitialState();
    }

    switch (action.type) {
        case Types.RESET:
            state = GetInitialState();

            break;

        case Types.LOAD:
            state = {...action.data}

            break;
        
        case Types.LOAD_BEGIN:
            state = update(state, "loading", true);

            break;

        case Types.LOAD_END:
            state = update(state, "loading", false);

            break;

        case Types.UPDATE_SETTING:
            let setting = {...action.setting};

            state = update(state, "data." + setting.id, setting);

            break;

    }

    return state;
}