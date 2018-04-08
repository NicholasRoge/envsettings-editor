import React from 'react'
import {connect} from 'react-redux'

import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Setting from './Setting'

import {createSettingAction, updateSettingAction} from '../../actions'
import {selectActiveHandler, selectAllSettings} from '../../selectors'


const View = ({handler, settings, settingChangeHandler, addSettingHandler}) => (
    <main className="handler-view">
        <Typography variant="display1">
            {handler.label}
        </Typography>
        
        <Typography variant="body1" elevation="root">
            {handler.description}
        </Typography>

        <Paper className="handler-settings" elevation={0}>
            <ul className="setting-list">
                {settings.map(setting => (
                    <Setting setting={setting} settingChangeHandler={settingChangeHandler} key={setting.id} />
                ))}
            </ul>

            <button onClick={() => addSettingHandler(handler.type, ['', '', ''])}>Add a New Setting</button>
        </Paper>
    </main>
)


export default connect(
    state => {
        const handler = selectActiveHandler(state)

        return {
            handler,
            settings: selectAllSettings(state).filter(setting => setting.handler == handler.type)
        }
    },
    dispatch => ({
        addSettingHandler: (handler, params) => dispatch(createSettingAction({handler, params})),
        settingChangeHandler: setting => dispatch(updateSettingAction(setting))
    })
)(View)