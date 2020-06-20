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
var React = require("react");
var ReactRouterDOM = require("react-router-dom");
var urlPathConstants = require("../../constants/url_path_constants");
var authUtil = require("../../util/auth_util");
var Button_1 = require("react-bootstrap/Button");
var Form_1 = require("react-bootstrap/Form");
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            'email': '',
            'password': ''
        };
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleLoginRequest = _this.handleLoginRequest.bind(_this);
        return _this;
    }
    LoginForm.prototype.handleInputChange = function (event) {
        var _a;
        var element = event.target;
        var name = element.name;
        this.setState((_a = {},
            _a[name] = element.value,
            _a));
    };
    LoginForm.prototype.handleLoginRequest = function (event) {
        event.preventDefault();
        var self = this;
        authUtil.sendLoginRequest(this.state.email, this.state.password)
            .then(function () {
            self.props.history.replace(urlPathConstants.HOME);
        });
    };
    LoginForm.prototype.render = function () {
        return (React.createElement("div", { className: "login-signup-form-container" },
            React.createElement("div", { className: "login-signup-form-content rounded-grey-container" },
                React.createElement("h1", null, "Sign in"),
                React.createElement(Form_1.default, { className: "login-signup-form", onSubmit: this.handleLoginRequest },
                    React.createElement(Form_1.default.Group, null,
                        React.createElement(Form_1.default.Label, null, "Email address"),
                        React.createElement(Form_1.default.Control, { name: "email", value: this.state.email, onChange: this.handleInputChange, type: "email", placeholder: "Enter email" }),
                        React.createElement(Form_1.default.Text, { className: "text-muted" }, "We'll never share your email with anyone else.")),
                    React.createElement(Form_1.default.Group, null,
                        React.createElement(Form_1.default.Label, null, "Password"),
                        React.createElement(Form_1.default.Control, { name: "password", value: this.state.password, onChange: this.handleInputChange, type: "password", placeholder: "Password" })),
                    React.createElement("div", { className: "login-signup-form-button-container" },
                        React.createElement(Button_1.default, { variant: "primary", type: "submit" }, "Submit")),
                    React.createElement(ReactRouterDOM.Link, { to: urlPathConstants.SIGNUP },
                        React.createElement("p", null, "Not an existing user? Sign up here."))))));
    };
    return LoginForm;
}(React.Component));
exports.default = ReactRouterDOM.withRouter(LoginForm);
//# sourceMappingURL=LoginForm.js.map