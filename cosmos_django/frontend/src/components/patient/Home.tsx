/* The patient home page. */
import clsx from 'clsx';
import * as React from 'react';
import * as ReactRedux from 'react-redux'
import * as ReactRouterDOM from 'react-router-dom';

import * as actionCreators from '../../actions/action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as authUtil from '../../util/auth_util';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import {withStyles} from '@material-ui/core/styles';
import FullPageSpinner from '../shared/FullPageSpinner';

import Charts from './Charts';
import Header from './Header';


interface HomeState {
    isVerticalNavbarOpen: boolean,
}


class Home extends React.Component<any, HomeState> {
    constructor(props) {
        super(props);
        this.state = {
            isVerticalNavbarOpen: false,
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleVerticalNavbarOpen = this.handleVerticalNavbarOpen.bind(this);
        this.handleVerticalNavbarClose = this.handleVerticalNavbarClose.bind(this);
    }

    handleVerticalNavbarOpen() {
        this.setState({
            ...this.state,
            isVerticalNavbarOpen: true,
        })
    };

    handleVerticalNavbarClose() {
        this.setState({
            ...this.state,
            isVerticalNavbarOpen: false,
        })
    };

    componentDidMount() {
        this.props.dispatch(actionCreators.fetchUser(this.props.history));
    }

    handleLogout() {
        authUtil.clearTokens();
        this.props.history.replace(urlPathConstants.LOGIN);
    }

    render() {
        const {classes} = this.props;
        console.log(this.props.user);
        if (this.props.isFetchingUser) {
            return <FullPageSpinner/>
        } else {
            return (
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {[classes.appBarShift]: this.state.isVerticalNavbarOpen,})}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleVerticalNavbarOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {[classes.hide]: this.state.isVerticalNavbarOpen,})}>
                                <MenuIcon/>
                            </IconButton>
                            <h1 className="app-bar-company-name">
                                Cosmos
                            </h1>
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
                                [classes.drawerOpen]: this.state.isVerticalNavbarOpen,
                                [classes.drawerClose]: !this.state.isVerticalNavbarOpen,
                            }),
                        }}>
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleVerticalNavbarClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem button key="Logout" onClick={this.handleLogout}>
                                <ListItemIcon><ExitToAppRoundedIcon/></ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <div>
                            <Header
                                profilePicture={this.props.user.patientProfile.profilePicture}
                                firstName={this.props.user.patientProfile.firstName}
                                lastName={this.props.user.patientProfile.lastName}
                                sex={this.props.user.patientProfile.sex}
                                age={this.props.user.patientProfile.age}
                            />
                            <Charts user={this.props.user}/>
                        </div>
                    </main>
                </div>
            );
        }
    }
}

const useStyles = function(theme) {
    const DRAWER_WIDTH = 200;
    return {
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: DRAWER_WIDTH,
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
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

function mapStateToProps(state) {
    return {
        user: state.user,
        isFetchingUser: state.isFetchingUser,
    }
}

// @ts-ignore
export default ReactRedux.connect(mapStateToProps)(withStyles(useStyles)(ReactRouterDOM.withRouter(Home)));
