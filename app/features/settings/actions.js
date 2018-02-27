import {readDataFromFile} from "./helpers";


export const Types = {
    RESET:           "ese/settings/reset",
    LOAD:            "ese/settings/load",
    LOAD_BEGIN:      "ese/settings/load_begin",
    LOAD_END:        "ese/settings/load_end",
    UPDATE_SETTING:  "ese/settings/update_setting"
};


function beginLoadAction() {
    return {
        type: Types.LOAD_BEGIN
    };
}

function endLoadAction() {
    return {
        type: Types.LOAD_END
    };
}

function loadDataAction(data, sourceFile) {
    return {
        type: Types.LOAD,
        data
    }
}

export function resetAction() {
    return {
        type: Types.RESET
    };
}

export function loadFileAction(filename) {
    if (typeof filename !== "string" || filename.trim() === "") {
        throw new Error("Invalid filename specified."); 
    }


    return dispatch => {
        dispatch(beginLoadAction());

        readDataFromFile(filename).then(
            data => {
                dispatch(loadDataAction({
                    ...data,
                    sourceFile: filename
                }));
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
        type: Types.UPDATE_SETTING,
        setting
    };
}
