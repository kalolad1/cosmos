/* Contains main application component. */
import '@babel/polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';
import * as Redux from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as urlPathConstants from '../constants/url_path_constants';
import * as formConstants from '../constants/form_constants';
import * as reducers from '../reducers/reducers';
import * as authUtil from '../util/auth_util';

import AllergyFullViewContainer from './patient/AllergyFullViewContainer';
import AppHome from './AppHome';
import DiagnosisFullViewContainer from './patient/DiagnosisFullViewContainer';
import EncounterFullViewContainer from './patient/EncounterFullViewContainer';
import LoginForm from '../components/authentication/LoginForm';
import MedicationFullViewContainer from './patient/MedicationFullViewContainer';
import PatientViewContainer from './provider/PatientViewContainer';
import SignupForm from './authentication/SignupForm';
import VaccinationFullViewContainer from './patient/VaccinationFullViewContainer';
import { Switch, HashRouter, Route } from 'react-router-dom';

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
                <HashRouter>
                    <Switch>
                        <Route exact path={urlPathConstants.SIGNUP}>
                            <SignupForm />
                        </Route>
                        <Route exact path={urlPathConstants.LOGIN}>
                            <LoginForm />
                        </Route>
                        <Route exact path={urlPathConstants.NEW_ENCOUNTER}>
                            <EncounterFullViewContainer
                                mode={formConstants.FormModes.CREATE}
                            />
                        </Route>
                        <ReactRouterDOM.Route
                            exact
                            path={urlPathConstants.UPDATE_ENCOUNTER}
                        >
                            <EncounterFullViewContainer
                                mode={formConstants.FormModes.UPDATE}
                            />
                        </ReactRouterDOM.Route>
                        <Route exact path={urlPathConstants.VIEW_ENCOUNTER}>
                            <EncounterFullViewContainer
                                mode={formConstants.FormModes.VIEW}
                            />
                        </Route>

                        <Route exact path={urlPathConstants.NEW_DIAGNOSIS}>
                            <DiagnosisFullViewContainer
                                mode={formConstants.FormModes.CREATE}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.UPDATE_DIAGNOSIS}>
                            <DiagnosisFullViewContainer
                                mode={formConstants.FormModes.UPDATE}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.VIEW_DIAGNOSIS}>
                            <DiagnosisFullViewContainer
                                mode={formConstants.FormModes.VIEW}
                            />
                        </Route>

                        <Route exact path={urlPathConstants.NEW_MEDICATION}>
                            <MedicationFullViewContainer
                                mode={formConstants.FormModes.CREATE}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.UPDATE_MEDICATION}>
                            <MedicationFullViewContainer
                                mode={formConstants.FormModes.UPDATE}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.VIEW_MEDICATION}>
                            <MedicationFullViewContainer
                                mode={formConstants.FormModes.VIEW}
                            />
                        </Route>

                        <Route exact path={urlPathConstants.NEW_ALLERGY}>
                            <AllergyFullViewContainer
                                mode={formConstants.FormModes.CREATE}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.UPDATE_ALLERGY}>
                            <AllergyFullViewContainer
                                mode={formConstants.FormModes.UPDATE}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.VIEW_ALLERGY}>
                            <AllergyFullViewContainer
                                mode={formConstants.FormModes.VIEW}
                            />
                        </Route>

                        <Route exact path={urlPathConstants.NEW_VACCINATION}>
                            <VaccinationFullViewContainer
                                mode={formConstants.FormModes.CREATE}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.UPDATE_VACCINATION}>
                            <VaccinationFullViewContainer
                                mode={formConstants.FormModes.UPDATE}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.VIEW_VACCINATION}>
                            <VaccinationFullViewContainer
                                mode={formConstants.FormModes.VIEW}
                            />
                        </Route>
                        <Route exact path={urlPathConstants.VIEW_PATIENT}>
                            <PatientViewContainer />
                        </Route>

                        <Route path={urlPathConstants.HOME}>
                            <AppHome />
                        </Route>
                        <ReactRouterDOM.Redirect to={this.state.rootUrl} />
                    </Switch>
                </HashRouter>
            </ReactRedux.Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
