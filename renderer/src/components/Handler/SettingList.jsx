import React from 'react'

import Setting from './Setting'


const SettingList = ({settings, onChange}) => {
    console.log(settings)
    return (
        <ul className="setting-list">
            {settings.map(setting => (
                <Setting 
                    component="li" 
                    setting={setting} 
                    onChange={onChange}
                    key={setting.id} />
            ))}
        </ul>
    )
}


export default SettingList