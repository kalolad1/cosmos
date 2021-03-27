import clsx from 'clsx';
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../constants/url_path_constants';
import * as authUtil from '../util/auth_util';
import * as urlUtil from '../util/url_util';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

import SearchBar from './search/SearchBar';

interface AppShellProps {
    content: any;
    classes: any;
    history: any;
    isProvider: boolean;
}

interface AppShellState {
    isVerticalNavbarOpen: boolean;
    query: string;
}

class AppShell extends React.Component<AppShellProps, AppShellState> {
    constructor(props) {
        super(props);
        this.state = {
            isVerticalNavbarOpen: false,
            query: '',
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleScheduleClick = this.handleScheduleClick.bind(this);
        this.handleInboxClick = this.handleInboxClick.bind(this);
        this.handleMetricsClick = this.handleMetricsClick.bind(this);
        this.handleChartsClick = this.handleChartsClick.bind(this);
        this.handleCompanyLogoClick = this.handleCompanyLogoClick.bind(this);
        this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearSearchBar = this.clearSearchBar.bind(this);
    }

    handleLogout() {
        authUtil.clearTokens();
        this.props.history.replace(urlPathConstants.LOGIN);
    }

    handleNavbarToggle() {
        // After setting state, dispatch a resize event to the window so that
        // the underline of the selected Tab component repositions.
        this.setState(
            (prevState) => ({
                isVerticalNavbarOpen: !prevState.isVerticalNavbarOpen,
            }),
            () => window.dispatchEvent(new CustomEvent('resize'))
        );
    }

    handleScheduleClick() {
        this.props.history.push(
            urlPathConstants.HOME + urlPathConstants.SCHEDULE
        );
    }

    handleInboxClick() {
        this.props.history.push(urlPathConstants.HOME + urlPathConstants.INBOX);
    }

    handleMetricsClick() {
        this.props.history.push(
            urlPathConstants.HOME + urlPathConstants.METRICS
        );
    }

    handleChartsClick() {
        this.props.history.push(
            urlPathConstants.HOME + urlPathConstants.CHARTS
        );
    }

    handleCompanyLogoClick() {
        this.clearSearchBar();
        if (this.props.isProvider) {
            this.props.history.push(
                urlPathConstants.HOME + urlPathConstants.SCHEDULE
            );
        } else {
            this.props.history.push(
                urlPathConstants.HOME + urlPathConstants.CHARTS
            );
        }
    }

    handleSearchBarSubmit(event) {
        event.preventDefault();
        if (this.state.query === '') {
            return;
        }
        const searchUrl = urlUtil.getUrlPathWithQueryParams(
            urlPathConstants.HOME + urlPathConstants.SEARCH_RESULTS,
            this.state.query
        );
        this.props.history.push(searchUrl);
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    clearSearchBar() {
        this.setState({
            query: '',
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.isVerticalNavbarOpen,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleNavbarToggle}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className="app-bar-item-container">
                            <a
                                onClick={this.handleCompanyLogoClick}
                                className="app-bar-company-name"
                            >
                                <h1 className="app-bar-company-name">Cosmos</h1>
                            </a>
                            {this.props.isProvider && (
                                <SearchBar
                                    handleSubmit={this.handleSearchBarSubmit}
                                    handleInputChange={this.handleInputChange}
                                    query={this.state.query}
                                />
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.isVerticalNavbarOpen,
                        [classes.drawerClose]: !this.state.isVerticalNavbarOpen,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state
                                .isVerticalNavbarOpen,
                            [classes.drawerClose]: !this.state
                                .isVerticalNavbarOpen,
                        }),
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        <ListItem
                            button
                            key="Logout"
                            onClick={this.handleLogout}
                        >
                            <ListItemIcon>
                                <ExitToAppRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                        <Divider />
                        {this.props.isProvider && (
                            <ListItem
                                button
                                key="Schedule"
                                onClick={this.handleScheduleClick}
                            >
                                <ListItemIcon>
                                    <CalendarTodayIcon />
                                </ListItemIcon>
                                <ListItemText primary="Schedule" />
                            </ListItem>
                        )}
                        {!this.props.isProvider && (
                            <ListItem
                                button
                                key="Charts"
                                onClick={this.handleChartsClick}
                            >
                                <ListItemIcon>
                                    <FolderSharedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Charts" />
                            </ListItem>
                        )}
                        <ListItem
                            button
                            key="Inbox"
                            onClick={this.handleInboxClick}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem
                            button
                            key="Metrics"
                            onClick={this.handleMetricsClick}
                        >
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Metrics" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className="app-content-container">
                        <div className="app-content">{this.props.content}</div>
                    </div>
                </main>
            </div>
        );
    }
}

const useStyles = function (theme) {
    const DRAWER_WIDTH = 200;
    return {
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: DRAWER_WIDTH,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(7) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    };
};

// @ts-ignore
export default withStyles(useStyles)(ReactRouterDOM.withRouter(AppShell));
