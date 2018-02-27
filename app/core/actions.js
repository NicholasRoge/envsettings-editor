export const Types = {
    LOAD_STATE: "ese/core/loadState",
}


export function loadStateAction(stateData) {
    return {
        type: Types.LOAD_STATE,
        stateData
    };
}