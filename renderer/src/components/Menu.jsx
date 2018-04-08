import React from 'react'
import {connect} from 'react-redux'

import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import {FormControl, FormHelperText} from 'material-ui/Form'
import {InputLabel} from 'material-ui/Input'
import List, {ListItem, ListItemText} from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import HandlerView from './Handler/View'

import {withStyles} from 'material-ui/styles'

import {selectActiveEnvironment, selectAllEnvironments, selectAllHandlers} from '../selectors'
import {activateEnvironmentAction, activateHandlerAction} from '../actions'



const styles = theme => ({
    environmentSelectContainer: {
        padding: theme.spacing.unit * 1 
    },
    drawerPaper: {
        position: "relative"
    }
})


const Menu = ({environments, activeEnvironment, handlers, onEnvironmentChange, onHandlerChange, classes}) => (
    <Drawer
        variant="permanent"
        classes={{
            paper: classes.drawerPaper
        }}
    >
        <FormControl margin={"normal"}>
            <InputLabel htmlFor="active-environment-input">Environment</InputLabel>
            
            <Select
                id="active-environment-input"
                value={activeEnvironment.name}
                onChange={e => onEnvironmentChange(e.target.value)}
            >
                {environments.map(environment => (
                    <MenuItem value={environment.name} key={environment.name}>{environment.name}</MenuItem>
                ))}
            </Select>
        </FormControl>

        <Divider />

        <List>
            <div>
                {handlers.map(handler => (
                    <ListItem button onClick={() => onHandlerChange(handler.type)} key={handler.type}>
                        <ListItemText primary={handler.label} />
                    </ListItem>
                ))}
            </div>
        </List>
    </Drawer>
)


export default connect(
    state => ({
        environments: selectAllEnvironments(state),
        activeEnvironment: selectActiveEnvironment(state),
        handlers: selectAllHandlers(state)
    }),
    dispatch => ({
        onEnvironmentChange: environment => dispatch(activateEnvironmentAction(environment)),
        onHandlerChange: handler => dispatch(activateHandlerAction(handler))
    })
)(withStyles(styles)(Menu));