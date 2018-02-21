import React from 'react';

import {basename} from 'path';
import {connect} from 'react-redux';
import {updateSettingAction,createSettingSelector} from '../';


const Renderers = {};

const requireFromContext = require.context("../components/SettingRenderers/", false, /\.jsx$/);
for (let path of requireFromContext.keys()) {
    Renderers[basename(path, ".jsx")] = requireFromContext(path).default;
}

const Setting = (props) => React.createElement(Renderers[props.setting.handler], props);


function mapStateToProps(state, props) {
    const selectSetting = createSettingSelector(props.id);

    return {
        setting: selectSetting(state)
    };
}

function mapDispatchToProps(dispatch, props) {
    return {
        changeHandler: setting => dispatch(updateSettingAction(setting))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Setting);