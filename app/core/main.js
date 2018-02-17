import React from "react";
import ReactDOM from "react-dom";

import store from "./store";

import {Provider} from "react-redux";


const App = () => <div>Hello World</div>;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);