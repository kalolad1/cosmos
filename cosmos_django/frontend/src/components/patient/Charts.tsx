/* Contains all the charts of the patient, organized in tabs. */
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';

import { Route, Switch, Redirect } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Profile from './Profile';
import Header from './Header';
import Summary from './Summary';
import Timeline from './Timeline';

interface ChartsProps {
    user: modelTypes.User;
    history: any;
}

let base_path = '';

class Charts extends React.Component<ChartsProps, any> {
    constructor(props) {
        super(props);

        this.handleTabChange = this.handleTabChange.bind(this);
        base_path = this.props.history.location.pathname;
    }

    handleTabChange(unusedEvent, newPath) {
        this.props.history.push(newPath);
    }

    render() {
        return (
            <div className="charts">
                <Header
                    profilePicture={
                        this.props.user.patientProfile!.profilePicture
                    }
                    firstName={this.props.user.patientProfile!.firstName}
                    lastName={this.props.user.patientProfile!.lastName}
                    sex={this.props.user.patientProfile!.sex}
                    age={this.props.user.patientProfile!.age}
                />
                <div className="charts-tab-row">
                    <div>
                        <Tabs
                            value={this.props.history.location.pathname}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab
                                label="Summary"
                                value={base_path + urlPathConstants.SUMMARY}
                            />
                            <Tab
                                label="Timeline"
                                value={base_path + urlPathConstants.TIMELINE}
                            />
                            <Tab
                                label="Profile"
                                value={base_path + urlPathConstants.PROFILE}
                            />
                        </Tabs>
                    </div>
                </div>
                <div className="chart-content-container">
                    <Switch>
                        <Route path={base_path + urlPathConstants.SUMMARY}>
                            <Summary user={this.props.user} />
                        </Route>
                        <Route path={base_path + urlPathConstants.TIMELINE}>
                            <Timeline user={this.props.user} />
                        </Route>
                        <Route path={base_path + urlPathConstants.PROFILE}>
                            <Profile user={this.props.user} />
                        </Route>
                        <Redirect to={base_path + urlPathConstants.SUMMARY} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(Charts);
