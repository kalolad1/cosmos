/* Contains all the charts of the patient, organized in tabs. */
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as types from '../../types/types';

import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Route, Switch, Redirect } from 'react-router-dom';

import Profile from './Profile';
import Summary from './Summary';
import Timeline from './Timeline';
import Header from './Header';

interface ChartsProps {
    user: types.User;
    history: any;
    classes: any;
}

class Charts extends React.Component<ChartsProps, any> {
    constructor(props) {
        super(props);

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(unusedEvent, newPath) {
        this.props.history.push(newPath);
    }

    render() {
        const { classes } = this.props;
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
                                className={classes.chartTabButtons}
                                label="Summary"
                                value={urlPathConstants.SUMMARY}
                            />
                            <Tab
                                className={classes.chartTabButtons}
                                label="Timeline"
                                value={urlPathConstants.TIMELINE}
                            />
                            <Tab
                                className={classes.chartTabButtons}
                                label="Profile"
                                value={urlPathConstants.PROFILE}
                            />
                        </Tabs>
                    </div>
                </div>
                <div className="chart-content-container">
                    <Switch>
                        <Route path={urlPathConstants.SUMMARY}>
                            <Summary user={this.props.user} />
                        </Route>
                        <Route path={urlPathConstants.TIMELINE}>
                            <Timeline user={this.props.user} />
                        </Route>
                        <Route path={urlPathConstants.PROFILE}>
                            <Profile user={this.props.user} />
                        </Route>
                        <Redirect to={urlPathConstants.SUMMARY} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withStyles({
    chartTabButtons: {
        textTransform: 'none',
        fontFamily: 'Neue Hans Kendrick',
        fontSize: '16px',
    },
})(ReactRouterDOM.withRouter(Charts));
