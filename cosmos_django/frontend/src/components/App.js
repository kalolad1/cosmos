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

import LoginForm from "./LoginForm";
import PatientHome from "./PatientHome";
import SignupForm from "./SignupForm";


class App extends React.Component {

    render() {
        let homePageRoute;
        if (localStorage.getItem(CONSTANTS.ACCESS_TOKEN) !== null
            && localStorage.getItem(CONSTANTS.REFRESH_TOKEN) !== null) {
            homePageRoute = (
                <Route path="/">
                    <Redirect to="/home"/>
                </Route>
            )
        } else {
            homePageRoute = (
                <Route path="/">
                    <Redirect to="/login"/>
                </Route>
            )
        }

        return (
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <LoginForm/>
                    </Route>
                    <Route path="/signup">
                        <SignupForm/>
                    </Route>
                    <Route path="/home">
                        <PatientHome/>
                    </Route>
                    {homePageRoute}
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));