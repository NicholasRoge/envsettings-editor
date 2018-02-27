import eh from "./ipc";

import React from "react";
import ReactDOM from "react-dom";

import CoreRenderer from "./Renderer";


ReactDOM.render(
    React.createElement(CoreRenderer),
    document.getElementById("app")
);
