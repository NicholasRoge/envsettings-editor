import path from 'path';
import React from 'react';

import {connect} from 'react-redux';

import {updateSettingAction} from '../';


const requireSettingRenderer = require.context("./SettingRenderers/", false, /\.jsx$/);

let SettingRenderers = {};
for (let settingRendererPath of requireSettingRenderer.keys()) {
    SettingRenderers[path.basename(settingRendererPath, '.jsx')] = requireSettingRenderer(settingRendererPath).default;
}


const SettingRenderer = (props) => {
    return React.createElement(
        SettingRenderers[props.handler],
        {
            setting: props.setting,
            environment: props.environment,
            changeHandler: props.changeHandler
        }
    )
}


function mapDispatchToProps(dispatch, oldProps) {
    return {
        changeHandler(newData, oldData) {
            dispatch(updateSettingAction(
                oldProps.handler,
                oldData.params,
                newData
            ));
        }
    }
}


export default connect(null, mapDispatchToProps)(SettingRenderer) 