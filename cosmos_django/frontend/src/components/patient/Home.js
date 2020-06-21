"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* The patient home page. */
var clsx_1 = require("clsx");
var React = require("react");
var ReactRouterDOM = require("react-router-dom");
var patientApi = require("../../api/patient_api");
var urlPathConstants = require("../../constants/url_path_constants");
var authUtil = require("../../util/auth_util");
var Drawer_1 = require("@material-ui/core/Drawer");
var AppBar_1 = require("@material-ui/core/AppBar");
var Toolbar_1 = require("@material-ui/core/Toolbar");
var List_1 = require("@material-ui/core/List");
var CssBaseline_1 = require("@material-ui/core/CssBaseline");
var Divider_1 = require("@material-ui/core/Divider");
var IconButton_1 = require("@material-ui/core/IconButton");
var Menu_1 = require("@material-ui/icons/Menu");
var ChevronLeft_1 = require("@material-ui/icons/ChevronLeft");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var ExitToAppRounded_1 = require("@material-ui/icons/ExitToAppRounded");
var styles_1 = require("@material-ui/core/styles");
var FullPageSpinner_1 = require("../shared/FullPageSpinner");
var Charts_1 = require("./Charts");
var Header_1 = require("./Header");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            account: {},
            isLoading: true,
            isVerticalNavbarOpen: false,
        };
        _this.handleLogout = _this.handleLogout.bind(_this);
        _this.handleVerticalNavbarOpen = _this.handleVerticalNavbarOpen.bind(_this);
        _this.handleVerticalNavbarClose = _this.handleVerticalNavbarClose.bind(_this);
        return _this;
    }
    Home.prototype.handleVerticalNavbarOpen = function () {
        this.setState(__assign(__assign({}, this.state), { isVerticalNavbarOpen: true }));
    };
    ;
    Home.prototype.handleVerticalNavbarClose = function () {
        this.setState(__assign(__assign({}, this.state), { isVerticalNavbarOpen: false }));
    };
    ;
    Home.prototype.componentDidMount = function () {
        var self = this;
        patientApi.getAccount(this.props.history)
            .then(function (response) {
            console.log(response);
            self.setState({
                'account': response === null || response === void 0 ? void 0 : response.data,
                'isLoading': false,
            });
        });
    };
    Home.prototype.handleLogout = function () {
        authUtil.clearTokens();
        this.props.history.replace(urlPathConstants.LOGIN);
    };
    Home.prototype.render = function () {
        var _a, _b, _c, _d;
        var classes = this.props.classes;
        if (this.state.isLoading) {
            return React.createElement(FullPageSpinner_1.default, null);
        }
        else {
            return (React.createElement("div", { className: classes.root },
                React.createElement(CssBaseline_1.default, null),
                React.createElement(AppBar_1.default, { position: "fixed", className: clsx_1.default(classes.appBar, (_a = {}, _a[classes.appBarShift] = this.state.isVerticalNavbarOpen, _a)) },
                    React.createElement(Toolbar_1.default, null,
                        React.createElement(IconButton_1.default, { color: "inherit", "aria-label": "open drawer", onClick: this.handleVerticalNavbarOpen, edge: "start", className: clsx_1.default(classes.menuButton, (_b = {}, _b[classes.hide] = this.state.isVerticalNavbarOpen, _b)) },
                            React.createElement(Menu_1.default, null)),
                        React.createElement("h1", { className: "app-bar-company-name" }, "Cosmos"))),
                React.createElement(Drawer_1.default, { variant: "permanent", className: clsx_1.default(classes.drawer, (_c = {},
                        _c[classes.drawerOpen] = this.state.isVerticalNavbarOpen,
                        _c[classes.drawerClose] = !this.state.isVerticalNavbarOpen,
                        _c)), classes: {
                        paper: clsx_1.default((_d = {},
                            _d[classes.drawerOpen] = this.state.isVerticalNavbarOpen,
                            _d[classes.drawerClose] = !this.state.isVerticalNavbarOpen,
                            _d)),
                    } },
                    React.createElement("div", { className: classes.toolbar },
                        React.createElement(IconButton_1.default, { onClick: this.handleVerticalNavbarClose },
                            React.createElement(ChevronLeft_1.default, null))),
                    React.createElement(Divider_1.default, null),
                    React.createElement(List_1.default, null,
                        React.createElement(ListItem_1.default, { button: true, key: "Logout", onClick: this.handleLogout },
                            React.createElement(ListItemIcon_1.default, null,
                                React.createElement(ExitToAppRounded_1.default, null)),
                            React.createElement(ListItemText_1.default, { primary: "Logout" })))),
                React.createElement("main", { className: classes.content },
                    React.createElement("div", { className: classes.toolbar }),
                    React.createElement("div", null,
                        React.createElement(Header_1.default, { profilePicture: this.state.account.patient_profile.profile_picture, firstName: this.state.account.patient_profile.first_name, lastName: this.state.account.patient_profile.last_name, sex: this.state.account.patient_profile.sex, age: this.state.account.patient_profile.age }),
                        React.createElement(Charts_1.default, { patientProfile: this.state.account.patient_profile })))));
        }
    };
    return Home;
}(React.Component));
var useStyles = function (theme) {
    var _a;
    var DRAWER_WIDTH = 200;
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
            width: "calc(100% - " + DRAWER_WIDTH + "px)",
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
        drawerClose: (_a = {
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                overflowX: 'hidden',
                width: theme.spacing(7) + 1
            },
            _a[theme.breakpoints.up('sm')] = {
                width: theme.spacing(7) + 1,
            },
            _a),
        toolbar: __assign({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: theme.spacing(0, 1) }, theme.mixins.toolbar),
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    };
};
// @ts-ignore
exports.default = styles_1.withStyles(useStyles)(ReactRouterDOM.withRouter(Home));
//# sourceMappingURL=Home.js.map