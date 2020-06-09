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
import URL_PATHS from "../url_paths";

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
            rootUrl = URL_PATHS.HOME;
        } else {
            rootUrl = URL_PATHS.SIGNUP;
        }

        return (
            <Router>
                <Switch>
                    <Route exact path={URL_PATHS.LOGIN}>
                        <LoginForm/>
                    </Route>
                    <Route path={URL_PATHS.SIGNUP}>
                        <SignupForm/>
                    </Route>
                    <Route path={URL_PATHS.HOME}>
                        <PatientHome/>
                    </Route>
                    <Redirect from={URL_PATHS.ROOT} to={rootUrl}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));