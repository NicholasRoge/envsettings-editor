import React from 'react'
import {connect} from 'react-redux'

import {basename} from 'path'

import {updateSettingValueAction} from '../../actions'
import {selectActiveEnvironment, selectSettingValue} from '../../selectors'


let SettingRenderers = {};

const requireFromContext = require.context("./SettingRenderers", false, /\.jsx$/);
for (let rendererPath of requireFromContext.keys()) {
    SettingRenderers[basename(rendererPath, ".jsx")] = requireFromContext(rendererPath).default;
}


function Setting({setting, value, defaultValue, settingChangeHandler, valueChangeHandler}) {
    let renderer = setting.handler;
    if (!(renderer in SettingRenderers)) {
        renderer = "Default";
    }
    renderer = React.createElement(SettingRenderers[renderer], {setting, value, defaultValue, settingChangeHandler, valueChangeHandler});

    return (
        <li className="setting">
            {renderer}
        </li>
    )
}


export default connect(
    (state, ownProps) => ({
        value: selectSettingValue(state, ownProps.setting.id, selectActiveEnvironment(state).name),
        defaultValue: selectSettingValue(state, ownProps.setting.id, 'DEFAULT')
    }),
    dispatch => ({
        valueChangeHandler: value => dispatch(updateSettingValueAction(value))
    })
)(Setting)