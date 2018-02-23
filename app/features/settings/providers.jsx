import React from 'react';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {updateSettingAction} from "./actions";
import {createSettingSelector,selectAllSettings} from "./selectors";


export const provideSetting = (constraint) => {
    const selectSettings = createSettingSelector(constraint);

    return connect(
        state => {
            const settings = selectSettings(state);
            if (settings.length === 0) {
                throw new Error("No settings match `constraint`.");
            } else if (settings.length > 1) {
                throw new Error("More than one setting matches `constraint`.");
            }

            return {setting: settings[0]};
        },
        dispatch => ({
            settingChangeHandler: setting => dispatch(updateSettingAction(setting))
        })
    );
}

export const provideSettingList = (constraint = {}) => {
    const selectSettings = createSettingSelector(constraint);

    return connect(
        (state, {id}) => ({
            settingList: selectSettings(state)
        }),
        dispatch => ({
            settingChangeHandler: setting => dispatch(updateSettingAction(setting))
        })
    );
}

export const SettingProvider = ({constraint, children}) => {
    if (!children) {
        return null;
    }


    const ConnectedSettingProvider = provideSetting(constraint)(SettingProviderRenderer);

    return React.createElement(ConnectedSettingProvider, arguments[0], children);
}

const SettingProviderRenderer = ({setting, settingChangeHandler, children}) => {
    children = React.Children.map(children, (child, index) => React.cloneElement(child, {
        setting, 
        settingChangeHandler
    }));

    return (
        <React.Fragment>{children}</React.Fragment>
    );
}

export const SettingListProvider = (props) => {
    return null;
}