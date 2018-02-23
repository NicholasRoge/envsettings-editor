import React from "react";
import {remote} from "electron";

import {connect} from "react-redux";
import {loadFileAction} from "$app/features/settings";


const LoadPrompt = ({fileSelectionHandler}) => {
    return (
        <div className="load-prompt" onClick={() => selectFile(fileSelectionHandler)}>
            <span>Click anywhere to load an EnvSettingsTool CSV and continue.</span>
        </div>
    );
}


function selectFile(selectionHandler) {
    remote.dialog.showOpenDialog(selectedPaths => {
        if (!selectedPaths) {
            return;
        }

        selectionHandler(selectedPaths[0]);
    });
}

function mapDispatchToProps(dispatch) {
    return {
        fileSelectionHandler:  selectedPath => dispatch(loadFileAction(selectedPath))
    };
}


export default connect(null, mapDispatchToProps)(LoadPrompt);