import React from "react";
import ReactDOM from "react-dom";
import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";
import App from 'App';
import registerServiceWorker from 'registerServiceWorker';
import store from 'store'
import {Provider} from 'react-redux'
ReactDOM.render(
    <Provider store={store}>
        <App />
        {/* <App history={hist}/> */}
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();

