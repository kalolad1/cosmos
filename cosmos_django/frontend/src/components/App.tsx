/* Contains main application component. */
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../constants/url_path_constants';
import * as authUtil from '../util/auth_util';

import LoginForm from '../components/authentication/LoginForm';
import SignupForm from './authentication/SignupForm';
import PatientHome from './patient/Home';
import VisitCreator from '../components/patient/VisitCreator';


class App extends React.Component {
    render() {
        let rootUrl: string;
        if (authUtil.hasTokens()) {
            rootUrl = urlPathConstants.HOME;
        } else {
            rootUrl = urlPathConstants.SIGNUP;
        }

        return (
            <ReactRouterDOM.HashRouter>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route exact path={urlPathConstants.LOGIN}>
                        <LoginForm/>
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path={urlPathConstants.SIGNUP}>
                        <SignupForm/>
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path={urlPathConstants.HOME}>
                        <PatientHome/>
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route path={urlPathConstants.CREATE_VISIT}>
                        <VisitCreator/>
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Redirect
                        from={urlPathConstants.ROOT}
                        to={rootUrl}/>
                </ReactRouterDOM.Switch>
            </ReactRouterDOM.HashRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
