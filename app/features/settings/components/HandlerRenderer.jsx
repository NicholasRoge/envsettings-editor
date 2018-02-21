import HandlerData from "../data/Handler.json";


import React from "react";

import {connect} from "react-redux";
import {createSelector} from "reselect";
import {selectAllSettings} from "../";

import HandlerInfoPanel from "./HandlerInfoPanel";
import SettingInfoPanel from "./SettingInfoPanel";
import Setting from "../containers/Setting";


class HandlerRenderer extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            activeSetting: null
        };

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
                        {Object.keys(this.props.settings).map(this.renderSettingItem)}
                    </ul>
                </main>

                {this.renderInfoPanel()}
            </React.Fragment>
        );
    }

    renderSettingItem(settingId) {
        let setting = this.props.settings[settingId];

        return (
            <li 
                className="setting" 
                onMouseEnter={e => this.activateSetting(setting)} 
                onMouseLeave={e => this.activateSetting(null)}
                key={setting.id}>
                <Setting id={setting.id} environment={this.props.environment} />
            </li>
        );
    }

    renderInfoPanel() {
        if (this.state.activeSetting) {
            return <SettingInfoPanel 
                handler={this.props.handler}
                setting={this.state.activeSetting} />
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


function mapStateToProps(state, props) {
    let allSettings = selectAllSettings(state);

    let settings = {};
    for (let id in allSettings) {
        let setting = allSettings[id];
        if (setting.handler !== props.handler) {
            continue;
        }

        settings[id] = setting;
    }

    debugger;

    return {
        settings: {...settings}
    };
}


export default connect(mapStateToProps)(HandlerRenderer);