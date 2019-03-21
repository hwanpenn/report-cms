import React, { Component } from 'react';
// import './css/App.css';
import 'App.css';
import {appReduxChange, appReduxTest} from "actions/app";
import {connect} from 'react-redux'
import { createHashHistory } from "history";
import {  HashRouter, Route, Switch, Redirect } from "react-router-dom";
import indexRoutes from "routes/index.jsx";
import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";
const hist = createHashHistory();
class App extends Component {
    componentWillMount(){
        // const s = document.createElement('script');
        // s.type = 'text/javascript';
        // s.src = '/static/js/chat1.js';
        // document.body.appendChild(s);       
    }    
    componentDidMount(){
    	
    }
    render() {
        return (
            <HashRouter history={hist}>
                <Switch>
                    {indexRoutes.map((prop, key) => {
                        if (prop.collapse) {
                            return null;
                        }
                        if (prop.redirect) {
                            return (
                                <Redirect from={prop.path} to={prop.pathTo} key={key} />
                            );
                        }
                        return (
                            <Route
                                path={prop.path}
                                component={prop.component}
                                key={key}
                            />
                        );
                    })}
                </Switch>
            </HashRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        app: state.app
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        appReduxTest: () => {
            dispatch(appReduxTest())
        },
        appReduxChange: () => {
            dispatch(appReduxChange())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
