'use strict';
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, '__esModule', { value: true });
var React = require('react');
var ReactRouterDOM = require('react-router-dom');
var authApi = require('../../api/auth_api');
var apiEndpointConstants = require('../../constants/api_endpoint_constants');
var urlPathConstants = require('../../constants/url_path_constants');
var core_1 = require('@material-ui/core');
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            email: '',
            password: '',
        };
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleLoginRequest = _this.handleLoginRequest.bind(_this);
        return _this;
    }
    LoginForm.prototype.handleInputChange = function (event) {
        var _a;
        var element = event.target;
        var name = element.name;
        this.setState(
            __assign(
                __assign({}, this.state),
                ((_a = {}), (_a[name] = element.value), _a)
            )
        );
    };
    LoginForm.prototype.handleLoginRequest = function (event) {
        event.preventDefault();
        console.log('Received request to log in.');
        var self = this;
        authApi
            .loginRequest(this.state.email, this.state.password)
            .then(function () {
                self.props.history.replace(urlPathConstants.HOME);
            });
    };
    LoginForm.prototype.render = function () {
        return React.createElement(
            'div',
            { className: 'login-signup-form-container' },
            React.createElement(
                'div',
                {
                    className:
                        'login-signup-form-content rounded-grey-container box-shadow-container',
                },
                React.createElement(
                    'div',
                    { className: 'login-signup-form-content-logo-container' },
                    React.createElement('img', {
                        src: apiEndpointConstants.TEXT,
                        alt: 'Cosmos logo with text.',
                    })
                ),
                React.createElement('h1', null, 'Sign in'),
                React.createElement(
                    'form',
                    {
                        className: 'login-signup-form',
                        onSubmit: this.handleLoginRequest,
                    },
                    React.createElement(
                        'div',
                        { className: 'form-input-container' },
                        React.createElement(core_1.TextField, {
                            className: 'form-input-field',
                            name: 'email',
                            onChange: this.handleInputChange,
                            value: this.state.email,
                            label: 'Email',
                            type: 'email',
                            variant: 'outlined',
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-input-container' },
                        React.createElement(core_1.TextField, {
                            className: 'form-input-field',
                            name: 'password',
                            onChange: this.handleInputChange,
                            value: this.state.password,
                            label: 'Password',
                            type: 'password',
                            variant: 'outlined',
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-button-container' },
                        React.createElement(
                            core_1.Button,
                            {
                                type: 'submit',
                                variant: 'contained',
                                color: 'secondary',
                                size: 'large',
                            },
                            'Next'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'login-signup-redirect-link-container' },
                        React.createElement(
                            ReactRouterDOM.Link,
                            { to: urlPathConstants.SIGNUP },
                            'Not an existing user? Sign up here.'
                        )
                    )
                )
            )
        );
    };
    return LoginForm;
})(React.Component);
exports.default = ReactRouterDOM.withRouter(LoginForm);
//# sourceMappingURL=LoginForm.js.map
