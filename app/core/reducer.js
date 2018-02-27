import {Types} from "./actions";


export default function reducer(state, action) {
    if (state === undefined) {
        state = {};
    }

    switch(action.type) {
        case Types.LOAD_STATE:
            state = action.stateData;
            break;
    }

    return state;
}