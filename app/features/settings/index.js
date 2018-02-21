import {readDataFromFile} from "./helpers";

import {select,update} from "~/core/util";


const ACTIONS = {
    LOAD:            "ese/settings/load",
    LOAD_BEGIN:      "ese/settings/load_begin",
    LOAD_END:        "ese/settings/load_end",
    UPDATE_SETTING:  "ese/settings/update_setting"
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

export function updateSettingAction(setting) {
    if (!setting || !setting.id) {
        throw new Error("Setting id field missing or empty.");
    }

    return {
        type: ACTIONS.UPDATE_SETTING,
        setting
    };
}


export function selectAllSettings(state) {
    return state.settings.data;
}

export function selectIsLoading(state) {
    return state.settings.loading;
}

export function selectSourceFile(state) {
    return state.settings.sourceFile;
}


export function createSettingSelector(id)  {
    return state => state.settings.data[id];
}

export function createSettingValueSelector(id, environment = null, path = "") {
    return createSelector(
        createSettingSelector(id),
        setting => environment === null ? setting.value : select(setting.value[environment], path)
    );
}


export default function featureReducer(state, action) {
    if (state === undefined) {
        state = {
            loading: false,
            data: {},
            sourceFile: null,
        };
    }

    let actionType = action.type;
    delete action.type;
    switch (actionType) {
        case ACTIONS.LOAD:
            state = {...action}

            break;
        
        case ACTIONS.LOAD_BEGIN:
            state = update(state, "loading", true);

            break;

        case ACTIONS.LOAD_END:
            state = update(state, "loading", false);

            break;

        case ACTIONS.UPDATE_SETTING:
        debugger;
            let setting = {...action.setting};

            state = update(state, "data." + setting.id, setting);

            break;

    }

    return state;
}