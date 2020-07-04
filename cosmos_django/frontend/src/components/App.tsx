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
import EncounterFullView from './patient/EncounterFullView';
import EncounterContainer from './patient/EncounterContainer';
import { FormModes } from '../constants/form_constants';
import { Switch } from 'react-router-dom';
import { url } from 'inspector';

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
                            path={urlPathConstants.NEW_ENCOUNTER}
                        >
                            <EncounterContainer mode={FormModes.CREATE} />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route
                            exact
                            path={urlPathConstants.UPDATE_ENCOUNTER}
                        >
                            <EncounterContainer mode={FormModes.UPDATE} />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route
                            exact
                            path={urlPathConstants.VIEW_ENCOUNTER}
                        >
                            <EncounterContainer mode={FormModes.VIEW} />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route
                            exact
                            path={urlPathConstants.ADD_ENCOUNTER}
                        >
                            <VisitCreator />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Route path={urlPathConstants.HOME}>
                            <Home />
                        </ReactRouterDOM.Route>
                        <ReactRouterDOM.Redirect to={this.state.rootUrl} />
                    </ReactRouterDOM.Switch>
                </ReactRouterDOM.HashRouter>
            </ReactRedux.Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
