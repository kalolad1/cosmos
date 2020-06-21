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
Object.defineProperty(exports, "__esModule", { value: true });
/* Contains main application component. */
require("@babel/polyfill");
var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouterDOM = require("react-router-dom");
var urlPathConstants = require("../constants/url_path_constants");
var authUtil = require("../util/auth_util");
var SignupForm_1 = require("./authentication/SignupForm");
var LoginForm_1 = require("../components/authentication/LoginForm");
var Home_1 = require("./patient/Home");
var VisitCreator_1 = require("./patient/VisitCreator");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        var rootUrl;
        if (authUtil.hasTokens()) {
            rootUrl = urlPathConstants.HOME;
        }
        else {
            rootUrl = urlPathConstants.SIGNUP;
        }
        return (React.createElement(ReactRouterDOM.HashRouter, null,
            React.createElement(ReactRouterDOM.Switch, null,
                React.createElement(ReactRouterDOM.Route, { exact: true, path: urlPathConstants.LOGIN },
                    React.createElement(LoginForm_1.default, null)),
                React.createElement(ReactRouterDOM.Route, { path: urlPathConstants.SIGNUP },
                    React.createElement(SignupForm_1.default, null)),
                React.createElement(ReactRouterDOM.Route, { path: urlPathConstants.HOME },
                    React.createElement(Home_1.default, null)),
                React.createElement(ReactRouterDOM.Route, { path: urlPathConstants.CREATE_VISIT },
                    React.createElement(VisitCreator_1.default, null)),
                React.createElement(ReactRouterDOM.Redirect, { from: urlPathConstants.ROOT, to: rootUrl }))));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=App.js.map