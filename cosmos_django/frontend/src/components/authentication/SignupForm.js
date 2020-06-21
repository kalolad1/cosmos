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
var date_fns_1 = require("@date-io/date-fns");
var React = require("react");
require("react-datepicker/dist/react-datepicker.css");
var ReactRouterDOM = require("react-router-dom");
var authApi = require("../../api/auth_api");
var apiEndpointConstants = require("../../constants/api_endpoint_constants");
var urlPathConstants = require("../../constants/url_path_constants");
var core_1 = require("@material-ui/core");
var pickers_1 = require("@material-ui/pickers");
var SEX_OPTIONS = [
    { id: 1, value: 'male', humanReadable: 'Male' },
    { id: 2, value: 'female', humanReadable: 'Female' },
];
var SignupForm = /** @class */ (function (_super) {
    __extends(SignupForm, _super);
    function SignupForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(),
            sex: '',
        };
        _this.handleRegistrationRequest = _this.handleRegistrationRequest.bind(_this);
        _this.createSexMenuItems = _this.createSexMenuItems.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleSelectChange = _this.handleSelectChange.bind(_this);
        _this.handleDateChange = _this.handleDateChange.bind(_this);
        return _this;
    }
    SignupForm.prototype.handleDateChange = function (date) {
        this.setState(__assign(__assign({}, this.state), { dateOfBirth: date }));
    };
    SignupForm.prototype.handleInputChange = function (event) {
        var _a;
        var element = event.target;
        var name = element.name;
        this.setState(__assign(__assign({}, this.state), (_a = {}, _a[name] = element.value, _a)));
    };
    SignupForm.prototype.handleSelectChange = function (event) {
        var _a;
        var element = event.target;
        var name = element.name;
        this.setState(__assign(__assign({}, this.state), (_a = {}, _a[name] = element.value, _a)));
    };
    SignupForm.prototype.createSexMenuItems = function () {
        return SEX_OPTIONS.map(function (option) {
            return (React.createElement(core_1.MenuItem, { key: option.id, value: option.value }, option.humanReadable));
        });
    };
    SignupForm.prototype.handleRegistrationRequest = function (event) {
        event.preventDefault();
        var self = this;
        authApi.signupRequest(this.state.email, this.state.password, this.state.firstName, this.state.lastName, {
            year: this.state.dateOfBirth.getFullYear(),
            // Add 1 to month to change from 0 to 1 indexing.
            month: this.state.dateOfBirth.getMonth() + 1,
            day: this.state.dateOfBirth.getDate(),
        }, this.state.sex)
            .then(function () {
            authApi.loginRequest(self.state.email, self.state.password)
                .then(function () {
                self.props.history.replace(urlPathConstants.HOME);
            });
        });
    };
    SignupForm.prototype.render = function () {
        return (React.createElement("div", { className: "login-signup-form-container" },
            React.createElement("div", { className: "login-signup-form-content rounded-grey-container box-shadow-container" },
                React.createElement("div", { className: "login-signup-form-content-logo-container" },
                    React.createElement("img", { src: apiEndpointConstants.TEXT, alt: "Cosmos text logo." })),
                React.createElement("h1", null, "Sign up"),
                React.createElement("form", { className: "login-signup-form", onSubmit: this.handleRegistrationRequest },
                    React.createElement("div", { className: "form-input-container" },
                        React.createElement(core_1.TextField, { className: "form-input-field", name: "email", onChange: this.handleInputChange, value: this.state.email, label: "Email", type: "email", variant: "outlined" })),
                    React.createElement("div", { className: "form-input-container" },
                        React.createElement(core_1.TextField, { className: "form-input-field", name: "password", onChange: this.handleInputChange, value: this.state.password, label: "Password", type: "password", variant: "outlined" })),
                    React.createElement("div", { className: "form-input-container" },
                        React.createElement(core_1.TextField, { className: "form-input-field", name: "firstName", onChange: this.handleInputChange, value: this.state.firstName, label: "First name", type: "text", variant: "outlined" })),
                    React.createElement("div", { className: "form-input-container" },
                        React.createElement(core_1.TextField, { className: "form-input-field", name: "lastName", onChange: this.handleInputChange, value: this.state.lastName, label: "Last name", type: "text", variant: "outlined" })),
                    React.createElement("div", { className: "form-input-container" },
                        React.createElement(core_1.FormControl, { variant: "outlined", className: "form-input-field" },
                            React.createElement(core_1.InputLabel, { id: "sex-label" }, "Sex"),
                            React.createElement(core_1.Select, { displayEmpty: true, labelId: "sex-label", id: "sex", name: "sex", value: this.state.sex, onChange: this.handleSelectChange, label: "Sex" }, this.createSexMenuItems()))),
                    React.createElement("div", { className: "form-input-container" },
                        React.createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1.default },
                            React.createElement(pickers_1.KeyboardDatePicker, { fullWidth: true, disableToolbar: true, disableFuture: true, variant: "inline", inputVariant: "outlined", format: "MM/dd/yyyy", id: "dateOfBirth", margin: "normal", label: "Date of birth", value: this.state.dateOfBirth, onChange: this.handleDateChange, keyboardIcon: null }))),
                    React.createElement("div", { className: "form-button-container" },
                        React.createElement(core_1.Button, { variant: "contained", color: "secondary", size: "large", type: "submit" }, "Next")),
                    React.createElement("div", { className: "login-signup-redirect-link-container" },
                        React.createElement(ReactRouterDOM.Link, { to: urlPathConstants.LOGIN }, "Already an existing user? Log in here."))))));
    };
    return SignupForm;
}(React.Component));
exports.default = ReactRouterDOM.withRouter(SignupForm);
//# sourceMappingURL=SignupForm.js.map