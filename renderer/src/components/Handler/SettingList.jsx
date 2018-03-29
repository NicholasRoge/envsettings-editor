import React from 'react'

import Setting from './Setting'


const SettingList = ({environment = "default", settings, onChange}) => {
    return (
        <ul className="setting-list">
            {settings.map(setting => (
                <Setting 
                    component="li" 
                    environment={environment}
                    setting={setting} 
                    onChange={onChange}
                    key={setting.id} />
            ))}
        </ul>
    )
}


export default SettingList