import {writeFileSync} from 'fs';
import path from 'path';
import store from '$app/core/store';


export function select(state, path) {
    if (typeof path === "string") {
        path = path.split(".");
        path = path.filter(pathComponent => pathComponent !== "")
    }
    
    let currentObject = state;    
    for (let pathComponent of path) {
        currentObject = currentObject[pathComponent];
        if (currentObject === undefined) {
            return undefined;
        }
    }
    return currentObject;
}

export function update(state, path, value) {
    if (typeof path === "string") {
        path = path.split(".");
        path = path.filter(pathComponent => pathComponent !== "");
    }

    let oldValue = select(state, path);
    let newValue = oldValue;
    if (value instanceof Function) {
        newValue = value(oldValue);
        if (newValue === undefined) {
            throw new Error("No value returned from value callback.");
        }
    } else {
        newValue = value;
    }

    if (newValue === oldValue) {
        return; 
    }


    // TODO: Dispatch some kind of path changed event in the
    // future?

    // Mutate the state.
    state = {...state};

    let lastPathComponent = path.pop();

    let currentObject = state;
    let parentObject = null;
    for (let pathComponent of path) {
        let parentObject = currentObject;
        currentObject = parentObject[pathComponent];
        if (Array.isArray(currentObject)) {
            currentObject = [...currentObject];
        } else {
            currentObject = {...currentObject[pathComponent]};
        }
    }
    currentObject[lastPathComponent] = newValue;


    return state;
}

export async function dumpStoreState(target = null) {
    if (target === null) {
        target = path.resolve(`data/state/dump.json`);
        console.log(target);
    }

    let bytes = writeFileSync(target, JSON.stringify(store.getState()));

    console.log(`Dumped ${bytes} bytes worth of data to ${target}.`)
}