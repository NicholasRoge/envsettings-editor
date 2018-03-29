import HandlerData from "$data/Handler"

import React from 'react'

import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import {FormControl, FormHelperText} from 'material-ui/Form'
import {InputLabel} from 'material-ui/Input'
import List, {ListItem, ListItemText} from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import HandlerView from './Handler/View'

import {withStyles} from 'material-ui/styles'



const styles = theme => ({
    drawerPaper: {
        position: "relative"
    }
})


class App extends React.Component {
    state = {
        environment: "DEFAULT",
        handler: "Est_Handler_Magento_CoreConfigData"
    }

    render() {
        return (
            <div className="app">
                {this.renderDrawer()}

                <HandlerView handler={this.state.handler} environment={this.state.environment} />
            </div>
        )
    }

    renderDrawer() {
        const environments = ["DEFAULT"];


        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: this.props.classes.drawerPaper
                }}
            >
                <FormControl>
                    <InputLabel htmlFor="active-environment-input">Environment</InputLabel>
                    
                    <Select
                        value={this.state.environment}
                        onChange={environment => this.setEnvironment(environment)}
                    >
                        {environments.map(environment => (
                            <MenuItem value={environment} key={environment}>{environment}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Divider />

                <List>
                    <div>
                        {Object.keys(HandlerData).map(handler => (
                            <ListItem button onClick={() => this.setHandler(handler)} key={handler}>
                                <ListItemText primary={HandlerData[handler].label} />
                            </ListItem>
                        ))}
                    </div>
                </List>
            </Drawer>
        )
    }

    setEnvironment(environment) {
        this.setState({
            ...this.state,
            environment
        })
    }

    setHandler(handler) {
        this.setState({
            ...this.state,
            handler
        })
    }
}


export default withStyles(styles)(App);