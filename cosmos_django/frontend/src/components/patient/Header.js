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
Object.defineProperty(exports, '__esModule', { value: true });
/* The header portion of the patient home page. */
var React = require('react');
var ReactRouterDOM = require('react-router-dom');
var urlPathConstants = require('../../constants/url_path_constants');
var HeaderMetadata_1 = require('./HeaderMetadata');
var core_1 = require('@material-ui/core');
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        var _this = _super.call(this, props) || this;
        _this.handleNewVisitButtonClick = _this.handleNewVisitButtonClick.bind(
            _this
        );
        _this.getPatientInitials = _this.getPatientInitials.bind(_this);
        return _this;
    }
    Header.prototype.handleNewVisitButtonClick = function (event) {
        event.preventDefault();
        this.props.history.push(urlPathConstants.CREATE_VISIT);
    };
    Header.prototype.getPatientInitials = function () {
        return this.props.firstName[0] + this.props.lastName[0];
    };
    Header.prototype.render = function () {
        return React.createElement(
            'div',
            { className: 'patient-header rounded-grey-container' },
            React.createElement(
                'div',
                { className: 'patient-info' },
                React.createElement(
                    core_1.Avatar,
                    {
                        alt: this.props.firstName + ' ' + this.props.lastName,
                        src: this.props.profilePicture,
                        className: 'profile-picture',
                    },
                    this.getPatientInitials()
                ),
                React.createElement(HeaderMetadata_1.default, {
                    firstName: this.props.firstName,
                    lastName: this.props.lastName,
                    sex: this.props.sex,
                    age: this.props.age,
                })
            ),
            React.createElement(
                core_1.Button,
                {
                    variant: 'contained',
                    color: 'secondary',
                    size: 'large',
                    onClick: this.handleNewVisitButtonClick,
                },
                'New Visit'
            )
        );
    };
    return Header;
})(React.Component);
exports.default = ReactRouterDOM.withRouter(Header);
//# sourceMappingURL=Header.js.map
