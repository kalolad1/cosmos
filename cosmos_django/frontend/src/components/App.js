import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import CONSTANTS from '../constants';
import UrlPaths from "../urlPaths";

import LoginForm from "./LoginForm";
import PatientHome from "./PatientHome";
import SignupForm from "./SignupForm";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.hasTokens = this.hasTokens.bind(this);
    }

    hasTokens() {
        return (localStorage.getItem(CONSTANTS.ACCESS_TOKEN) !== null
                && localStorage.getItem(CONSTANTS.REFRESH_TOKEN) !== null)
    }

    render() {
        let rootUrl;
        if (this.hasTokens()) {
            rootUrl = UrlPaths.HOME;
        } else {
            rootUrl = UrlPaths.SIGNUP;
        }

        return (
            <Router>
                <Switch>
                    <Route exact path={UrlPaths.LOGIN}>
                        <LoginForm/>
                    </Route>
                    <Route path={UrlPaths.SIGNUP}>
                        <SignupForm/>
                    </Route>
                    <Route path={UrlPaths.HOME}>
                        <PatientHome/>
                    </Route>
                    <Redirect from={UrlPaths.ROOT} to={rootUrl}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));