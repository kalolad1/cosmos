/* Contains main application component. */
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';
import * as Redux from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as urlPathConstants from '../constants/url_path_constants';
import * as reducers from '../reducers/reducers';
import * as authUtil from '../util/auth_util';

import SignupForm from './authentication/SignupForm';
import LoginForm from '../components/authentication/LoginForm';
import VisitCreator from './patient/EncounterCreator';
import Home from './patient/Home';

export const store = Redux.createStore(
    reducers.rootReducer,
    Redux.applyMiddleware(thunkMiddleware)
);

interface AppState {
    rootUrl: string;
}

class App extends React.Component<any, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            rootUrl: urlPathConstants.SIGNUP,
        };
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
        });
    }

    render() {
        return (
            <ReactRedux.Provider store={store}>
                <ReactRouterDOM.HashRouter>
                    <ReactRouterDOM.Switch>
                        <ReactRouterDOM.Route
                            exact
                            path={urlPathConstants.SIGNUP}
                        >
                            <SignupForm />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route
                            exact
                            path={urlPathConstants.LOGIN}
                        >
                            <LoginForm />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route
                            exact
                            path={urlPathConstants.HOME}
                        >
                            <Home />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route
                            exact
                            path={urlPathConstants.ADD_ENCOUNTER}
                        >
                            <VisitCreator />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Redirect to={this.state.rootUrl} />
                    </ReactRouterDOM.Switch>
                </ReactRouterDOM.HashRouter>
            </ReactRedux.Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
