import React from "react"
import ReactDOM from "react-dom"

import App from "./components/App"


const appComponent = <App />
const appRoot = document.getElementById("app-container")


ReactDOM.render(appComponent, appRoot)