/* The patient home page. */
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';

import { Switch, Redirect, Route } from 'react-router-dom';

import Charts from './Charts';
import PatientMetrics from './PatientMetrics';
import FullPageSpinner from '../shared/FullPageSpinner';
import Inbox from '../shared/Inbox';

interface HomeState {}

class PatientHome extends React.Component<any, HomeState> {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.user);
        if (this.props.isFetchingUser) {
            return <FullPageSpinner />;
        } else {
            return (
                <div className="home-content-container">
                    <div className="home-content">
                        <Switch>
                            <Route path={urlPathConstants.INBOX}>
                                <Inbox />
                            </Route>
                            <Route path={urlPathConstants.METRICS}>
                                <PatientMetrics />
                            </Route>
                            <Route path={urlPathConstants.CHARTS}>
                                <Charts user={this.props.user} />
                            </Route>
                            <Redirect to={urlPathConstants.CHARTS} />
                        </Switch>
                    </div>
                </div>
            );
        }
    }
}

export default ReactRouterDOM.withRouter(PatientHome);
