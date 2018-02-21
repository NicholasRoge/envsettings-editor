import React from 'react';


export default class Magento_CoreConfigData extends React.Component {
    constructor() {
        super(...arguments);

        this.useDefaultChangeHandler = this.useDefaultChangeHandler.bind(this);
        this.deleteChangeHandler = this.deleteChangeHandler.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
    }
    
    render () {
        const setting = this.props.setting;

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
        

        let checked = this.value.default;

        return (
            <div className="checkbox-input">
                <input type="checkbox" onChange={this.useDefaultChangeHandler} checked={checked} />
                <label>Use DEFAULT</label>
            </div>
        );
    }

    renderDeleteInput() {
        let checked = this.value.delete;
        let disabled = false;

        if (this.value.default) {
            checked = this.defaultValue.delete;
            disabled = true;
        }

        return (
            <div className="checkbox-input">
                <input 
                    type="checkbox" 
                    onChange={this.deleteChangeHandler} 
                    checked={checked} />
                <label>Delete corresponding DB row.</label>
            </div>
        );
    }

    renderValueInput() {
        let disabled = false;
        let value = this.value.text;

        if (this.value.default) {
            disabled = true;
            value = this.defaultValue.text;
        } else if (this.value.delete) {
            disabled = true;
            value = "";
        }

        return (
            <div className="text-input">
                <input 
                    type="text" 
                    onChange={this.textChangeHandler} 
                    value={value}
                    disabled={disabled} />
            </div>
        )
    }

    useDefaultChangeHandler(e) {
        this.value.default = e.target.checked;

        this.props.changeHandler(this.props.setting);
    }

    deleteChangeHandler(e) {
        this.value.delete = e.target.checked;

        this.props.changeHandler(this.props.setting);
    }

    textChangeHandler(e) {
        this.value.text = e.target.value;

        this.props.changeHandler(this.props.setting);
    }

    get value() {
        return this.props.setting.value[this.props.environment];
    }

    get defaultValue() {
        return this.props.setting.value["DEFAULT"];
    }
}