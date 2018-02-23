import {Types} from "./actions";

import {update} from "$app/core/util";


export default function reducer(state, action) {
    if (state === undefined) {
        state = {
            loading: false,
            data: [],
            sourceFile: null,
        };
    }

    let actionType = action.type;
    delete action.type;
    switch (actionType) {
        case Types.LOAD:
            state = {...action}

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