import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store, {history} from "./app/store";
import {ConnectedRouter} from 'react-router-redux';
import App from "./app/App.js";
render(
    <Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <App/>
        </div>
    </ConnectedRouter>
</Provider>, window.document.getElementById('root'));