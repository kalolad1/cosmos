import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';

import ProviderMetrics from './ProviderMetrics';
import Schedule from './Schedule';
import Inbox from '../shared/Inbox';
import SearchResultsContainer from '../search/SearchResultsContainer';
import { Redirect, Route, Switch } from 'react-router-dom';
import PatientViewContainer from './PatientViewContainer';

interface ProviderHomeProps {
    user: modelTypes.User;
    history: any;
}

class ProviderHome extends React.Component<ProviderHomeProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route
                        path={urlPathConstants.HOME + urlPathConstants.SCHEDULE}
                    >
                        <Schedule />
                    </Route>
                    <Route
                        path={urlPathConstants.HOME + urlPathConstants.INBOX}
                    >
                        <Inbox />
                    </Route>
                    <Route
                        path={urlPathConstants.HOME + urlPathConstants.METRICS}
                    >
                        <ProviderMetrics />
                    </Route>
                    <Route
                        path={
                            urlPathConstants.HOME +
                            urlPathConstants.SEARCH_RESULTS
                        }
                    >
                        <SearchResultsContainer />
                    </Route>
                    <Route
                        path={
                            urlPathConstants.HOME +
                            urlPathConstants.VIEW_PATIENT
                        }
                    >
                        <PatientViewContainer />
                    </Route>
                    <Redirect
                        to={urlPathConstants.HOME + urlPathConstants.SCHEDULE}
                    />
                </Switch>
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(ProviderHome);
