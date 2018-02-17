import React from 'react';

import {Route} from 'react-router';
import {HashRouter} from 'react-router-dom';
import LoadPrompt from './LoadPrompt';
import SettingsIndex from '~/features/settings/components/Index';

import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {selectSourceFile} from '~/features/settings';


const Router = props => (
    <HashRouter>
        <Route path="/" exact component={props.sourceFileSelected ? SettingsIndex : LoadPrompt} />
    </HashRouter>
)


const propsSelector = createSelector(
    selectSourceFile,
    (settingsSourceFile) => {
        return {
            sourceFileSelected: settingsSourceFile !== null
        }
    }
);

export default connect(propsSelector)(Router);