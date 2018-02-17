import {readDataFromFile} from "./helpers";


const ACTIONS = {
    LOAD:       "ese/settings/load",
    LOAD_BEGIN: "ese/settings/load:begin",
    LOAD_END:   "ese/settings/load:end"
};


function beginLoadAction() {
    return {
        type: ACTIONS.LOAD_BEGIN
    };
}

function endLoadAction() {
    return {
        type: ACTIONS.LOAD_END
    };
}

function loadDataAction(data, sourceFile) {
    return {
        type: ACTIONS.LOAD,
        data,
        sourceFile
    }
}

export function loadFileAction(filename) {
    if (typeof filename !== "string" || filename.trim() === "") {
        throw new Error("Invalid filename specified."); 
    }


    return dispatch => {
        dispatch(beginLoadAction());

        readDataFromFile(filename).then(
            data => {
                dispatch(loadDataAction(data, filename));
                dispatch(endLoadAction());
            },
            error => {
                console.error(error);  // TODO:  Display this in a more noticeable way
                dispatch(endLoadAction());
            }
        );
    }
}


export function selectAll(state) {
    return state.settings.data;
}

export function selectIsLoading(state) {
    return state.settings.loading;
}

export function selectSourceFile(state) {
    return state.settings.sourceFile;
}


export default function featureReducer(state, action) {
    if (state === undefined) {
        state = {
            loading: false,
            data: [],
            sourceFile: null
        };
    }

    switch (action.type) {
        case ACTIONS.LOAD:
            state = {
                ...state,
                data: action.data,
                sourceFile: action.sourceFile
            };
            console.log("Loaded data.", action.data);
            break;
        
        case ACTIONS.LOAD_BEGIN:
            state = {
                ...state,
                loading: true
            };
            break;

        case ACTIONS.LOAD_END:
            state = {
                ...state,
                loading: false
            };
            break;
    }

    return state;
}