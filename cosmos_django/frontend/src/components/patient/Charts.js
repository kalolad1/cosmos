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
/* Contains all the charts of the patient, organized in tabs. */
var React = require('react');
var Tab_1 = require('@material-ui/core/Tab');
var Tabs_1 = require('@material-ui/core/Tabs');
var Medications_1 = require('./Medications');
var Timeline_1 = require('./Timeline');
var Vaccinations_1 = require('./Vaccinations');
var Charts = /** @class */ (function (_super) {
    __extends(Charts, _super);
    function Charts(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selectedTab: 0,
        };
        _this.handleTabChange = _this.handleTabChange.bind(_this);
        _this.getOpenChartComponent = _this.getOpenChartComponent.bind(_this);
        return _this;
    }
    Charts.prototype.handleTabChange = function (event, newValue) {
        this.setState(
            __assign(__assign({}, this.state), { selectedTab: newValue })
        );
    };
    Charts.prototype.getOpenChartComponent = function () {
        var openChart;
        switch (this.state.selectedTab) {
            case 0:
                openChart = React.createElement(Timeline_1.default, {
                    visits: this.props.patientProfile.visits,
                });
                break;
            case 1:
                openChart = React.createElement(Medications_1.default, {
                    medications: this.props.patientProfile.medications,
                });
                break;
            case 2:
                openChart = React.createElement(Vaccinations_1.default, {
                    vaccinations: this.props.patientProfile.vaccinations,
                });
                break;
            default:
                openChart = React.createElement(Timeline_1.default, {
                    visits: this.props.patientProfile.visits,
                });
        }
        return openChart;
    };
    Charts.prototype.render = function () {
        return React.createElement(
            'div',
            { className: 'charts' },
            React.createElement(
                'div',
                null,
                React.createElement(
                    Tabs_1.default,
                    {
                        value: this.state.selectedTab,
                        onChange: this.handleTabChange,
                        indicatorColor: 'primary',
                        textColor: 'primary',
                        centered: true,
                    },
                    React.createElement(Tab_1.default, { label: 'Timeline' }),
                    React.createElement(Tab_1.default, {
                        label: 'Medications',
                    }),
                    React.createElement(Tab_1.default, {
                        label: 'Vaccinations',
                    })
                )
            ),
            React.createElement(
                'div',
                { className: 'chart-content-container rounded-grey-container' },
                this.getOpenChartComponent()
            )
        );
    };
    return Charts;
})(React.Component);
exports.default = Charts;
//# sourceMappingURL=Charts.js.map
