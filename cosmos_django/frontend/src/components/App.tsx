/* Contains main application component. */
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';

import * as constants from '../constants';
import * as urlPaths from '../url_paths';

import LoginForm from './LoginForm';
import PatientHome from './PatientHome';
import SignupForm from './SignupForm';
import VisitCreator from './VisitCreator';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.hasTokens = this.hasTokens.bind(this);
  }

  hasTokens(): boolean {
    return (
      localStorage.getItem(constants.TOKEN_CONSTANTS.ACCESS_TOKEN) !== null &&
      localStorage.getItem(constants.TOKEN_CONSTANTS.REFRESH_TOKEN) !== null
    );
  }

  render() {
    let rootUrl: string;
    if (this.hasTokens()) {
      rootUrl = urlPaths.HOME;
    } else {
      rootUrl = urlPaths.SIGNUP;
    }

    return (
      <ReactRouterDOM.HashRouter>
        <ReactRouterDOM.Switch>
          <ReactRouterDOM.Route exact path={urlPaths.LOGIN}>
            <LoginForm />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path={urlPaths.SIGNUP}>
            <SignupForm />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path={urlPaths.HOME}>
            <PatientHome />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route path={urlPaths.CREATE_VISIT}>
            <VisitCreator />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Redirect from={urlPaths.ROOT} to={rootUrl} />
        </ReactRouterDOM.Switch>
      </ReactRouterDOM.HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
