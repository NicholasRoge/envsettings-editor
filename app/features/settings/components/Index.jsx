import React from "react";

import {connect} from "react-redux";
import {createSelector} from "reselect";
import {selectSourceFile} from "../";


function Index(props) {
    return (
        <div>File get!  You loaded <strong>{props.sourceFile}</strong>!</div>
    );
}


const propsSelector = createSelector(
    selectSourceFile,
    (sourceFile) => ({sourceFile})
);


export default connect(propsSelector)(Index);