import React from 'react'

import SettingList from './SettingList'


export default class SettingListContainer extends React.Component {
    state = {
        settings: {"1":{"groups":[],"handler":"Est_Handler_CopyFile","id":1,"params":["app/etc/local.xml","",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"app/etc/local.xml.template"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"2":{"groups":[],"handler":"Est_Handler_XmlFile","id":2,"params":["app/etc/local.xml","/config/global/install/date",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"Fri, 02 Oct 2015 16:35:45 +0000"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"3":{"groups":[],"handler":"Est_Handler_XmlFile","id":3,"params":["app/etc/local.xml","/config/global/crypt/key",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"d0f9dc821ca71c8ec4a1426c454db2c5"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"4":{"groups":[],"handler":"Est_Handler_XmlFile","id":4,"params":["app/etc/local.xml","/config/global/session_save",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"db"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"5":{"groups":[],"handler":"Est_Handler_XmlFile","id":5,"params":["app/etc/local.xml","/config/admin/routers/adminhtml/args/frontName",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"m4g3nt0"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"6":{"groups":[],"handler":"Est_Handler_XmlFile","id":6,"params":["app/etc/local.xml","/config/global/resources/db/table_prefix",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":""},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"7":{"groups":[],"handler":"Est_Handler_XmlFile","id":7,"params":["app/etc/local.xml","/config/global/resources/default_setup/connection/host",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"localhost"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"8":{"groups":[],"handler":"Est_Handler_XmlFile","id":8,"params":["app/etc/local.xml","/config/global/resources/default_setup/connection/username",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"AzureDiamond"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"9":{"groups":[],"handler":"Est_Handler_XmlFile","id":9,"params":["app/etc/local.xml","/config/global/resources/default_setup/connection/password",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"hunter2"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"10":{"groups":[],"handler":"Est_Handler_XmlFile","id":10,"params":["app/etc/local.xml","/config/global/resources/default_setup/connection/dbname",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":""},"dev":{"default":false,"delete":false,"text":"mage_dev"},"testing":{"default":false,"delete":false,"text":"mage_test"}}},"11":{"groups":[],"handler":"Est_Handler_XmlFile","id":11,"params":["app/etc/local.xml","/config/global/resources/default_setup/connection/initStatements",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"SET NAMES utf8"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"12":{"groups":[],"handler":"Est_Handler_XmlFile","id":12,"params":["app/etc/local.xml","/config/global/resources/default_setup/connection/model",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"mysql4"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"13":{"groups":[],"handler":"Est_Handler_XmlFile","id":13,"params":["app/etc/local.xml","/config/global/resources/default_setup/connection/type",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":"pdo_mysql"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"14":{"groups":[],"handler":"Est_Handler_XmlFile","id":14,"params":["app/etc/local.xml","/config/global/resources/default_setup/connection/pdoType",""],"value":{"DEFAULT":{"default":false,"delete":false,"text":""},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"15":{"groups":[],"handler":"Est_Handler_Magento_CoreConfigData","id":15,"params":["default","0","dev/template/allow_symlink"],"value":{"DEFAULT":{"default":false,"delete":false,"text":"1"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"16":{"groups":[],"handler":"Est_Handler_Magento_CoreConfigData","id":16,"params":["default","0","web/unsecure/base_url"],"value":{"DEFAULT":{"default":false,"delete":false,"text":""},"dev":{"default":false,"delete":false,"text":"http://foobar.local/"},"testing":{"default":false,"delete":false,"text":"http://foobar.test/"}}},"17":{"groups":[],"handler":"Est_Handler_Magento_CoreConfigData","id":17,"params":["default","0","web/secure/base_url"],"value":{"DEFAULT":{"default":false,"delete":false,"text":""},"dev":{"default":false,"delete":false,"text":"https://foobar.local/"},"testing":{"default":false,"delete":false,"text":"https://foobar.test/"}}},"18":{"groups":[],"handler":"Est_Handler_Magento_CoreConfigData","id":18,"params":["%","%","google/analytics/active"],"value":{"DEFAULT":{"default":false,"delete":false,"text":"0"},"dev":{"default":true,"delete":false,"text":""},"testing":{"default":true,"delete":false,"text":""}}},"19":{"groups":[],"handler":"Est_Handler_Magento_CoreConfigData","id":19,"params":["websites","1","payment/checkmo/active"],"value":{"DEFAULT":{"default":false,"delete":false,"text":""},"dev":{"default":false,"delete":false,"text":"1"},"testing":{"default":true,"delete":false,"text":""}}}}
    }

    render() {
        console.log(this.props.handler)
        const handlerSettings = []
        for (const settingId in this.state.settings) {
            const setting = this.state.settings[settingId]
            if (setting.handler !== this.props.handler) {
                continue
            }

            handlerSettings.push(setting)
        }
        console.log(handlerSettings)
        

        return <SettingList 
            environment={this.props.environment}
            settings={handlerSettings} 
            onChange={setting => this.settingChangeHandler(setting)} />
    }

    settingChangeHandler(setting) {
        this.setState({
            ...this.state,
            settings: {
                ...this.state.settings,
                [setting.id]: {
                    ...setting
                }
            }
        })
    }
}