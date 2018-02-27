import "./ipc";

import React from "react";
import ReactDOM from "react-dom";

import CoreRenderer from "./Renderer";

console.log(CoreRenderer);
ReactDOM.render(
    React.createElement(CoreRenderer),
    document.getElementById("app")
);
