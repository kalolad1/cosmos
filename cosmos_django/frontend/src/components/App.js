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

    render() {
        let homePageRoute;
        if (localStorage.getItem(CONSTANTS.ACCESS_TOKEN) !== null
            && localStorage.getItem(CONSTANTS.REFRESH_TOKEN) !== null) {
            homePageRoute = (
                <Route path={URL_PATHS.ROOT}>
                    <Redirect to={URL_PATHS.HOME}/>
                </Route>
            )
        } else {
            homePageRoute = (
                <Route path={URL_PATHS.ROOT}>
                    <Redirect to={URL_PATHS.LOGIN}/>
                </Route>
            )
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
                    {homePageRoute}
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));