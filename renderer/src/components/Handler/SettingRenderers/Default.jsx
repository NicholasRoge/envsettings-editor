import React from 'react';


export default class Default extends React.Component {
    constructor() {
        super(...arguments);

        this.useDefaultChangeHandler = this.useDefaultChangeHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
    }
    
    render() {
        const label       = this.renderLabel();
        const info        = this.renderInfo();
        const additional  = this.renderAdditional();
        const inputs      = this.renderInputs();


        return (
            <React.Fragment>
                {label}
                {info}
                {additional}
                {inputs}
            </React.Fragment>
        );
    }

    renderLabel() {
        const setting = this.props.setting;

        const label = this.props.label || `${setting.handler}(${setting.params.join(", ")})`;

        if (this.props.renderLabel) {
            return this.props.renderLabel({setting, label});
        } else {
            return (
                <div className="setting-label">{label}</div>
            );
        }
    }

    renderInfo() {
        const setting = this.props.setting;

        // Normalize the info prop.
        let info = this.props.info;
        if (!info) {
            info = {
                "Handler": setting.handler,
                "Param1":  setting.params[0],
                "Param2":  setting.params[1],
                "Param3":  setting.params[2]
            };
        }
        if (!Array.isArray(info)) {
            let normalizedInfo = [];
            for (let label in info) {
                normalizedInfo.push({
                    label,
                    value: info[label]
                });
            }
            info = normalizedInfo;
        }

        if (this.props.renderInfo) {
            return this.props.renderInfo({setting, info});
        } else {
            return (
                <table className="setting-info">
                    <colgroup>
                        <col width="1" />
                        <col />
                    </colgroup>

                    <tbody>
                        {info.map(({label, value}, index) => (
                            <tr key={index}>
                                <td>
                                    <span className="setting-info-label">{label}</span>
                                </td>

                                <td>
                                    <span className="setting-info-value">{value}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }

    renderAdditional() {
        const setting = this.props.setting;

        let additional = this.props.additional;

        if (this.props.renderAdditional) {
            return this.props.renderAdditional({setting, additional});
        } else {
            if (!additional) {
                return null;
            }


            return (
                <div className="setting-description">{additional}</div>
            )
        }
    }

    renderInputs() {
        const setting = this.props.setting;

        const useDefaultInput = this.renderUseDefaultInput();
        const textInput = this.renderTextInput();

        if (this.props.renderInputs) {
            return this.props.renderInputs({setting, useDefaultInput, textInput});
        } else {
            return (
                <div className="setting-inputs">
                    {useDefaultInput}
                    {textInput}
                </div>
            );
        }
    }

    renderUseDefaultInput() {
        const value = this.props.value
        if (value.environment == "DEFAULT") {
            return null;
        }
        

        return (
            <label className="input checkbox-input">
                <input 
                    type="checkbox" 
                    className="checkbox"
                    onChange={this.useDefaultChangeHandler} 
                    checked={value.isDefault} />

                <span className="input-label">Use DEFAULT</span>
            </label>
        );
    }

    renderTextInput() {
        const value = this.props.value;

        let disabled = false;
        let displayedValue = value.text
        if (value.isDefault) {
            disabled = true;
            displayedValue = this.props.defaultValue.text;
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

    useDefaultChangeHandler(e) {
        this.props.valueChangeHandler({
            ...this.props.value,
            isDefault: e.target.checked,
            text: e.target.checked ? '' : this.props.defaultValue.text
        });
    }

    textChangeHandler(e) {
        this.props.valueChangeHandler({
            ...this.props.value,
            text: e.target.value
        });
    }
}