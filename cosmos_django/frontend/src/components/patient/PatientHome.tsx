/* The patient home page. */
import clsx from 'clsx';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as actionCreators from '../../actions/action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as authUtil from '../../util/auth_util';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { withStyles } from '@material-ui/core/styles';
import FullPageSpinner from '../shared/FullPageSpinner';

import Charts from './Charts';
import Header from './Header';
import EncounterContainer from './EncounterFullViewContainer';
import { Switch } from 'react-router-dom';
import { FormModes } from '../../constants/form_constants';
import AppShell from '../AppShell';
import { Route } from 'react-router-dom';
import Schedule from '../provider/Schedule';
import Inbox from '../shared/Inbox';
import ProviderMetrics from '../provider/ProviderMetrics';
import { Redirect } from 'react-router-dom';
import PatientMetrics from './PatientMetrics';

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
                            <Route path={urlPathConstants.SCHEDULE}>
                                <Schedule />
                            </Route>
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
