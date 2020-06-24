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
var React = require("react");
var ReactRouterDOM = require("react-router-dom");
var patientApi = require("../../api/patient_api");
var core_1 = require("@material-ui/core");
var VISIT_OPTIONS = [
    { id: 1, value: 'physical', humanReadable: 'Physical' },
    { id: 2, value: 'illness', humanReadable: 'Illness' },
    { id: 3, value: 'vaccination', humanReadable: 'Vaccination' },
];
var EncounterCreator = /** @class */ (function (_super) {
    __extends(VisitCreator, _super);
    function VisitCreator(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            'visitType': '',
            'note': ''
        };
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.createVisitTypeMenuItems = _this.createVisitTypeMenuItems.bind(_this);
        _this.handleSelectChange = _this.handleSelectChange.bind(_this);
        _this.handleVisitCreate = _this.handleVisitCreate.bind(_this);
        _this.handleExitClick = _this.handleExitClick.bind(_this);
        return _this;
    }
    VisitCreator.prototype.handleInputChange = function (event) {
        var _a;
        var element = event.target;
        var name = element.name;
        this.setState(__assign(__assign({}, this.state), (_a = {}, _a[name] = element.value, _a)));
    };
    VisitCreator.prototype.createVisitTypeMenuItems = function () {
        return VISIT_OPTIONS.map(function (option) {
            return (React.createElement(core_1.MenuItem, { key: option.id, value: option.value }, option.humanReadable));
        });
    };
    VisitCreator.prototype.handleSelectChange = function (event) {
        var _a;
        var element = event.target;
        var name = element.name;
        this.setState(__assign(__assign({}, this.state), (_a = {}, _a[name] = element.value, _a)));
    };
    VisitCreator.prototype.handleVisitCreate = function (event) {
        event.preventDefault();
        var self = this;
        patientApi.createVisit(this.state.visitType, this.state.note, this.props.history)
            .then(function () {
            console.log('Visit created successfully.');
            self.props.history.goBack();
        });
    };
    VisitCreator.prototype.handleExitClick = function (event) {
        event.preventDefault();
        this.props.history.goBack();
    };
    VisitCreator.prototype.render = function () {
        return (React.createElement("div", { className: "visit-creator" },
            React.createElement("a", { href: "#", onClick: this.handleExitClick, className: "visit-creator-close-button" }),
            React.createElement("div", null,
                React.createElement("form", { onSubmit: this.handleVisitCreate },
                    React.createElement("div", { className: "form-input-container" },
                        React.createElement(core_1.FormControl, { variant: "outlined", className: "form-input-field" },
                            React.createElement(core_1.InputLabel, { id: "visitType-label" }, "Type"),
                            React.createElement(core_1.Select, { displayEmpty: true, labelId: "visitType-label", id: "visitType", name: "visitType", value: this.state.visitType, onChange: this.handleSelectChange, label: "Type" }, this.createVisitTypeMenuItems()))),
                    React.createElement("div", { className: "form-input-container" },
                        React.createElement(core_1.TextField, { className: "form-input-field", name: "note", onChange: this.handleInputChange, value: this.state.note, label: "Note", multiline: true, rows: 24, variant: "outlined" })),
                    React.createElement("div", { className: "form-button-container" },
                        React.createElement(core_1.Button, { variant: "contained", color: "secondary", type: "submit" }, "Create"))))));
    };
    return VisitCreator;
}(React.Component));
exports.default = ReactRouterDOM.withRouter(EncounterCreator);
//# sourceMappingURL=VisitCreator.js.map