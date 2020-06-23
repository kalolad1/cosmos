/* Contains main application component. */
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../constants/url_path_constants';
import * as authUtil from '../util/auth_util';

import SignupForm from './authentication/SignupForm';
import LoginForm from '../components/authentication/LoginForm';
import PatientHome from './patient/Home';
import VisitCreator from './patient/VisitCreator';



interface AppState {
    rootUrl: string,
}

class App extends React.Component<any, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            rootUrl: urlPathConstants.SIGNUP,
        }
    }
    componentDidMount(): void {
        let rootUrl: string;
        if (authUtil.hasTokens()) {
            rootUrl = urlPathConstants.HOME;
        } else {
            rootUrl = urlPathConstants.SIGNUP;
        }
        this.setState({
            rootUrl: rootUrl,
        })
    }

    render() {
        return (
            <ReactRouterDOM.HashRouter>
                <ReactRouterDOM.Switch>
                    <ReactRouterDOM.Route exact path={urlPathConstants.SIGNUP}>
                        <SignupForm/>
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route exact path={urlPathConstants.LOGIN}>
                        <LoginForm/>
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route exact path={urlPathConstants.HOME}>
                        <PatientHome/>
                    </ReactRouterDOM.Route>
                    <ReactRouterDOM.Route exact path={urlPathConstants.CREATE_VISIT}>
                        <VisitCreator/>
                    </ReactRouterDOM.Route>
                </ReactRouterDOM.Switch>
            </ReactRouterDOM.HashRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
