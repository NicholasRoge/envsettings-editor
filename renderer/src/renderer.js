import React from "react"
import ReactDOM from "react-dom"

import {Provider} from "react-redux"
import App from "./components/App"

import store from "./store"


const appComponent = (
    <Provider store={store}>
        <App />
    </Provider>
)
const appRoot = document.getElementById("app-container")


ReactDOM.render(appComponent, appRoot)