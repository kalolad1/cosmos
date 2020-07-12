import clsx from 'clsx';
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as authUtil from '../util/auth_util';
import * as urlPathConstants from '../constants/url_path_constants';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, fade } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

interface AppShellProps {
    content: any;
    classes: any;
    history: any;
    isProvider: boolean;
}

interface AppShellState {
    isVerticalNavbarOpen: boolean;
    patientSearch: string;
}

class AppShell extends React.Component<AppShellProps, AppShellState> {
    constructor(props) {
        super(props);
        this.state = {
            isVerticalNavbarOpen: false,
            patientSearch: '',
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleVerticalNavbarToggle = this.handleVerticalNavbarToggle.bind(
            this
        );
        this.handleScheduleClick = this.handleScheduleClick.bind(this);
        this.handleInboxClick = this.handleInboxClick.bind(this);
        this.handleMetricsClick = this.handleMetricsClick.bind(this);
        this.handleChartsClick = this.handleChartsClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePatientSearch = this.handlePatientSearch.bind(this);
        this.handleCompanyLogoClick = this.handleCompanyLogoClick.bind(this);
    }

    handleVerticalNavbarToggle() {
        // After setting state, dispatch a resize event to the window so that
        // the underline of the selected Tab component repositions.
        this.setState(
            (prevState) => ({
                isVerticalNavbarOpen: !prevState.isVerticalNavbarOpen,
            }),
            () => window.dispatchEvent(new CustomEvent('resize'))
        );
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleLogout() {
        authUtil.clearTokens();
        this.props.history.replace(urlPathConstants.LOGIN);
    }

    handleScheduleClick() {
        this.props.history.push(urlPathConstants.SCHEDULE);
    }

    handleInboxClick() {
        this.props.history.push(urlPathConstants.INBOX);
    }

    handleMetricsClick() {
        this.props.history.push(urlPathConstants.METRICS);
    }

    handleChartsClick() {
        this.props.history.push(urlPathConstants.CHARTS);
    }

    handlePatientSearch(event) {
        event.preventDefault();
        console.log('Submitting search!');
    }

    handleCompanyLogoClick() {
        if (this.props.isProvider) {
            this.props.history.push(urlPathConstants.SCHEDULE);
        } else {
            this.props.history.push(urlPathConstants.CHARTS);
        }
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
                            onClick={this.handleVerticalNavbarToggle}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <a
                            onClick={this.handleCompanyLogoClick}
                            className="app-bar-company-name"
                        >
                            <h1 className="app-bar-company-name">Cosmos</h1>
                        </a>
                        {this.props.isProvider && (
                            <form onSubmit={this.handlePatientSearch}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        name="patientSearch"
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        value={this.state.patientSearch}
                                        onChange={this.handleInputChange}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </form>
                        )}
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
                    {this.props.content}
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
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    };
};

// @ts-ignore
export default withStyles(useStyles)(ReactRouterDOM.withRouter(AppShell));
