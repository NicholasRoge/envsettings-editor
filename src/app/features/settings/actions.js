export const Types = {
    RESET:           "ese/settings/reset",
    IMPORT:          "ese/settings/import",
    UPDATE_SETTING:  "ese/settings/update_setting"
};


export function resetAction() {
    return {
        type: Types.RESET
    };
}

export function importAction(data) {
    return {
        type: Types.IMPORT,
        data
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
