import HandlerData from "../data/Handler.json";


import React from "react";

import {connect} from "react-redux";
import {createSettingSelector} from "../selectors";

import HandlerInfoPanel from "./HandlerInfoPanel";
import SettingInfoPanel from "./SettingInfoPanel";
import Setting from "./Setting";
import {SettingProvider} from "../providers";


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
                <main className="col-center">
                    <div className="settings-content">
                        <h1 className="setting-heading">
                            {HandlerData[this.props.handler].label}
                        </h1>
                        
                        <div className="block-content">
                            <div className="handler-description">
                                {HandlerData[this.props.handler].description}
                            </div>

                            <div className="setting-list-container">
                                <ul className="setting-list">
                                    {Object.keys(this.props.settings).map(this.renderSettingItem)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

                <aside className="col-right">
                    {this.renderInfoPanel()}
                </aside>
            </React.Fragment>
        );
    }

    renderSettingItem(settingId) {
        let setting = this.props.settings[settingId];

        return (
            <li 
                className="setting-container" 
                onMouseEnter={e => this.activateSetting(setting)} 
                onMouseLeave={e => this.activateSetting(null)}
                key={setting.id}>
                <SettingProvider constraint={setting}>
                    <Setting environment={this.props.environment} />
                </SettingProvider>
            </li>
        );
    }

    renderInfoPanel() {
        if (this.state.activeSetting) {
            return (
                <SettingProvider constraint={this.state.activeSetting}>
                    <SettingInfoPanel />
                </SettingProvider>
            );
        } else {
            return <HandlerInfoPanel handler={this.props.handler} />
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
    return {settings: createSettingSelector({handler: props.handler})(state)};
}


export default connect(mapStateToProps)(HandlerRenderer);