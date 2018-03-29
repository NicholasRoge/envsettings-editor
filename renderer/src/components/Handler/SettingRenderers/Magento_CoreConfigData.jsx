import React from 'react';

import DefaultRenderer from './Default';


export default class Magento_CoreConfigData extends React.Component {
    constructor(props) {
        super(...arguments);

        this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
        this.renderInputs = this.renderInputs.bind(this);
    }
    
    render() {
        const setting = this.props.setting;

        return <DefaultRenderer
            setting={setting}
            settingChangeHandler={this.props.settingChangeHandler}
            environment={this.props.environment}

            label={setting.params[2]}
            info={{
                "Scope": setting.params[0], 
                "Scope ID": setting.params[1]
            }}
            additional={<span>Here's where I'd put a description.  <em>If I had one!</em></span>}
            renderInputs={this.renderInputs}
            />
    }

    renderInputs({useDefaultInput, textInput}) {
        return (
            <div className="setting-inputs">
                {useDefaultInput}
                {this.renderDeleteInput()}
                {textInput}
            </div>
        );
    }

    renderDeleteInput() {
        const setting = this.props.setting;

        let checked = setting.value[this.props.environment].delete;
        let disabled = false;

        if (setting.value[this.props.environment].default) {
            checked = setting.value["DEFAULT"].delete;
            disabled = true;
        }

        return (
            <label className="input checkbox-input">
                <input 
                    type="checkbox"
                    className="checkbox"
                    onChange={this.deleteChangeHandler} 
                    checked={checked}
                    disabled={disabled} />

                <span className="input-label">Delete corresponding DB row.</span>
            </label>
        );
    }

    deleteChangeHandler(e) {
        this.props.setting.value[this.props.environment].delete = e.target.checked;

        this.props.settingChangeHandler(this.props.setting);
    }
}