import HandlerData from "../data/Handler.json";


import React from "react";

import {connect} from "react-redux";
import {createSelector} from "reselect";
import {selectAllSettings} from "../";

import HandlerInfoPanel from "./HandlerInfoPanel";
import SettingInfoPanel from "./SettingInfoPanel";
import SettingRenderer from "./SettingRenderer";


class HandlerRenderer extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            activeSetting: null
        }

        this.renderSettingItem = this.renderSettingItem.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <main className="settings-content">
                    <h1 className="setting-heading">
                        {HandlerData[this.props.handler].label}
                    </h1>

                    <ul className="setting-list">
                        {this.props.settings.map(this.renderSettingItem)}
                    </ul>
                </main>

                {this.renderInfoPanel()}
            </React.Fragment>
        );
    }

    renderSettingItem(setting, index) {
        return (
            <li 
                className="setting" 
                onMouseEnter={e => this.activateSetting(setting)} 
                onMouseLeave={e => this.activateSetting(null)}
                key={index}>
                <SettingRenderer handler={this.props.handler} setting={setting} environment={this.props.environment} />
            </li>
        );
    }

    renderInfoPanel() {
        if (this.activeSetting) {
            return <SettingInfoPanel 
                handler={this.props.handler}
                setting={activeSetting} />
        } else {
            return <HandlerInfoPanel
                handler={this.props.handler} />
        }
    }

    activateSetting(setting) {
        this.setState({
            ...this.state,
            activeSetting: setting,
        });
    }
}


const propsSelector = createSelector(
    (state, props) => {
        return props;
    },
    selectAllSettings,
    (props, settings) => ({
        settings: settings.filter(setting => setting.handler === props.handler)
    })
)


export default connect(propsSelector)(HandlerRenderer);