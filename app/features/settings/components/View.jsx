const HandlerData = require("../data/Handler.json");


import React from "react";

import {connect} from "react-redux";
import {selectAvailableEnvironments} from "../selectors";

import HandlerRenderer from "./HandlerRenderer";


class View extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            activeEnvironment: "DEFAULT",
            activeHandler: Object.keys(HandlerData)[0]
        };


        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.activateHandler = this.activateHandler.bind(this);
        this.activateEnvironment = this.activateEnvironment.bind(this);
    }

    render() {
        let availableEnvironments = this.props.availableEnvironments;

        return (
            <div className="settings-view">
                <div className="col-left">
                    <div className="environment-selector">
                        <select 
                            value={this.state.activeEnvironment} 
                            onChange={e => this.activateEnvironment(e.target.value)}>
                            
                            {availableEnvironments.map(environment => (
                                <option key={environment}>{environment}</option>
                            ))}
                        </select>

                        <button type="button" className="add-button">
                            +
                        </button>
                    </div>

                    <nav className="settings-nav">
                        <ul>
                            {Object.keys(HandlerData).map(this.renderMenuItem)}
                        </ul>
                    </nav>
                </div>
                
                <HandlerRenderer handler={this.state.activeHandler} environment={this.state.activeEnvironment} />
            </div>
        );
    }

    renderMenuItem(handler) {
        const handlerData = HandlerData[handler];

        return (
            <li 
                onClick={() => this.activateHandler(handler)} 
                className={handler === this.state.activeHandler ? "ux-active" : ""}
                key={handler}>
                {handlerData.label}
            </li>
        );
    }

    activateHandler(handler) {
        this.setState({
            ...this.state,
            activeHandler: handler
        });
    }

    activateEnvironment(environment) {
        this.setState({
            ...this.state,
            activeEnvironment: environment
        });
    }
}


export default connect(state => ({
    availableEnvironments: selectAvailableEnvironments(state)
}))(View);