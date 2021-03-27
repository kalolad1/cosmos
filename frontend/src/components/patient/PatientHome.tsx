/* The patient home page. */
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';

import { Switch, Redirect, Route } from 'react-router-dom';

import Charts from './Charts';
import PatientMetrics from './PatientMetrics';
import FullPageSpinner from '../shared/FullPageSpinner';
import Inbox from '../shared/Inbox';

class PatientHome extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.user);
        if (this.props.isFetchingUser) {
            return <FullPageSpinner />;
        } else {
            return (
                <div>
                    <Switch>
                        <Route
                            path={
                                urlPathConstants.HOME + urlPathConstants.INBOX
                            }
                        >
                            <Inbox />
                        </Route>
                        <Route
                            path={
                                urlPathConstants.HOME + urlPathConstants.METRICS
                            }
                        >
                            <PatientMetrics />
                        </Route>
                        <Route
                            path={
                                urlPathConstants.HOME + urlPathConstants.CHARTS
                            }
                        >
                            <Charts user={this.props.user} />
                        </Route>
                        <Redirect
                            to={urlPathConstants.HOME + urlPathConstants.CHARTS}
                        />
                    </Switch>
                </div>
            );
        }
    }
}

export default ReactRouterDOM.withRouter(PatientHome);
