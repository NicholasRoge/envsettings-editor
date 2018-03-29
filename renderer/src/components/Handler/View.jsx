import HandlerData from '$data/Handler'

import React from 'react'

import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import SettingListContainer from './SettingListContainer'


const View = ({handler, environment}) => (
    <main className="handler-view">
        <Typography variant="display1">
            {HandlerData[handler].label}
        </Typography>
        
        <Typography variant="body1" elevation="root">
            {HandlerData[handler].description}
        </Typography>


        <Paper className="handler-settings" elevation={0}>
            <SettingListContainer environment={environment} handler={handler} />
        </Paper>
    </main>
)


export default View