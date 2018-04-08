import React from 'react';

import DefaultRenderer from './Default';


export default class Est_Handler_Magento_CoreConfigData extends React.Component {
    constructor(props) {
        super(...arguments)

        this.renderInputs = this.renderInputs.bind(this)
        this.deleteChangeHandler = this.deleteChangeHandler.bind(this)
        this.textChangeHandler = this.textChangeHandler.bind(this)
    }
    
    render() {
        const setting = this.props.setting;

        return <DefaultRenderer
            {...this.props}

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
                {this.renderTextInput()}
            </div>
        );
    }

    renderTextInput() {
        const value = this.props.value;

        let disabled = false;
        let displayedValue = value.text
        if (value.isDefault) {
            disabled = true;
            displayedValue = this.props.defaultValue.text;
            if (displayedValue == '--delete--') {
                displayedValue = ''
            }
        } else if (value.text == '--delete--') {
            disabled = true
            displayedValue = ''
        }

        return (
            <label className="input text-input">
                <input 
                    type="text"
                    className="text"
                    onChange={this.textChangeHandler} 
                    value={displayedValue}
                    disabled={disabled} />
            </label>
        )
    }

    renderDeleteInput() {
        const value = this.props.value

        let checked = value.text == '--delete--'
        let disabled = false
        if (value.isDefault) {
            checked = this.props.defaultValue.text == '--delete--'
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
        this.props.valueChangeHandler({
            ...this.props.value,
            text: e.target.checked ? '--delete--' : ''
        })
    }

    textChangeHandler(e) {
        this.props.valueChangeHandler({
            ...this.props.value,
            text: e.target.value
        })
    }
}