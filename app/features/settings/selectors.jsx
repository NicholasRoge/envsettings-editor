import {createSelector} from 'reselect';


export function selectSettingById(state, id) {
    return state.settings.data[id];
}

export function selectAllSettings(state) {
    return Object.values(state.settings.data);
}

export function selectIsLoading(state) {
    return state.settings.loading;
}

export function selectSourceFile(state) {
    return state.settings.sourceFile;
}


export function createSettingSelector(constraint)  {
    if (!constraint) {
        return selectAllSettings;
    }


    if (constraint instanceof Object) {
        if (constraint.id) {
            constraint = {id: constraint.id};
        }
    } else {
        constraint = {id: constraint};
    }

    if (constraint instanceof Function) {
        return state => selectAllSettings(state).filter(constraint);
    } else if (constraint.id) {
        return state => [selectSettingById(state, constraint.id)];
    } else {
        return state => {
            let settings = selectAllSettings(state);
            for (let key in constraint) {
                settings = settings.filter(setting => setting[key] == constraint[key]);
            }
            return settings;
        }
    }
}

export function createSettingValueSelector(id, environment = null, path = "") {
    return createSelector(
        createSettingSelector(id),
        setting => environment === null ? setting.value : select(setting.value[environment], path)
    );
}