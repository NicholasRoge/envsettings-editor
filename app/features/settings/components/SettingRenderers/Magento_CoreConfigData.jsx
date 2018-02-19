import React from 'react';


export default class Magento_CoreConfigData extends React.Component {
    constructor() {
        super(...arguments);

        this.useDefaultChangeHandler = this.useDefaultChangeHandler.bind(this);
        this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
    }

    render () {
        let {setting, changeHandler} = this.props;

        return ( 
            <React.Fragment>
                <div className="setting-label">
                    {setting.params[2]}
                </div>

                <table className="setting-info">
                    <colgroup>
                        <col width="1" />
                        <col />
                    </colgroup>

                    <tbody>
                        <tr>
                            <td>
                                <span className="setting-info-label">Scope</span>
                            </td>
                            <td>
                                <span className="setting-info-value">{setting.params[0]}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span className="setting-info-label">Scope ID</span>
                            </td>
                            <td>
                                <span className="setting-info-value">{setting.params[1]}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="setting-description">
                    Here's where I'd put a config description...  <em>If I had one!</em>
                </div>

                {this.renderUseDefaultInput()}
                {this.renderDeleteInput()}
                {this.renderValueInput()}
            </React.Fragment>
        );
    }

    renderUseDefaultInput() {
        if (this.props.environment === "DEFAULT") {
            return null;
        }
        

        let currentValue = this.props.setting.value[this.props.environment];

        return (
            <div className="checkbox-input">
                <input type="checkbox" onChange={this.useDefaultChangeHandler} checked={currentValue === ""} />
                <label>Use DEFAULT</label>
            </div>
        );
    }

    renderDeleteInput() {
        return (
            <div className="checkbox-input">
                <input 
                    type="checkbox" 
                    onChange={this.deleteChangeHandler} 
                    checked={this.props.setting.delete[this.props.environment]} />
                <label>Delete corresponding DB row.</label>
            </div>
        );
    }

    renderValueInput() {
        let disabled;
        let displayedValue;

        if (this.props.setting.delete[this.props.environment]) {
            disabled = true;
            displayedValue = "";
        } else {
            let currentValue = this.props.setting.value[this.props.environment];
            if (currentValue === null) {
                if (this.props.environment === "DEFAULT") {
                    disabled = false;
                } else {
                    disabled = true;
                }
                
                displayedValue = "";
            } else {
                displayedValue = currentValue;
            }
        }

        return (
            <div className="text-input">
                <input 
                    type="text" 
                    onChange={this.valueChangeHandler} 
                    value={displayedValue}
                    disabled={disabled} />
            </div>
        )
    }

    useDefaultChangeHandler(e) {
        let newSetting = {
            ...this.props.setting,
            params: [...this.props.setting.params],
            value: {...this.props.setting.value}
        };

        if (e.target.checked) {
            newSetting.value[this.props.environment] = null;
        } else {
            newSetting.value[this.props.environment] = newSetting.value["DEFAULT"];
        }

        this.props.changeHandler(
            newSetting,
            this.props.setting
        );
    }

    deleteChangeHandler(e) {
        let newSetting = {
            ...this.props.setting,
            params: [...this.props.setting.params],
            value: {...this.props.setting.value}
        };

        if (e.target.checked) {
            newSetting.delete[this.props.environment] = true;
        } else {
            newSetting.value[this.props.environment] = newSetting.value["DEFAULT"];
            newSetting.delete[this.props.environment] = false;
        }

        this.props.changeHandler(
            newSetting,
            this.props.setting
        );
    }

    valueChangeHandler(e) {
        let newSetting = {
            ...this.props.setting,
            params: [...this.props.setting.params],
            value: {...this.props.setting.value}
        };

        newSetting.value[this.props.environment] = e.target.value;

        this.props.changeHandler(newSetting, this.props.setting);
    }
}