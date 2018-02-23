import React from 'react';

import {Route} from 'react-router';
import {HashRouter} from 'react-router-dom';
import LoadPrompt from './LoadPrompt';
import SettingsView from '$app/features/settings/components/View';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {selectSourceFile} from '$app/features/settings';


const Router = props => (
    <HashRouter>
        <Route path="/" exact component={props.sourceFileSelected ? SettingsView : LoadPrompt} />
    </HashRouter>
)


export default connect(
    state => ({
        sourceFileSelected: selectSourceFile(state) !== null
    })
)(Router);