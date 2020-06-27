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
/* Contains the timeline for patient visits. */
var React = require('react');
var Visit_1 = require('./Visit');
var Timeline = /** @class */ (function (_super) {
    __extends(Timeline, _super);
    function Timeline() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Timeline.prototype.render = function () {
        var visits = this.props.visits.map(function (visit) {
            return React.createElement(Visit_1.default, {
                visitType: visit.visit_type,
                note: visit.note,
                key: visit.id,
            });
        });
        return React.createElement('div', null, visits);
    };
    return Timeline;
})(React.Component);
exports.default = Timeline;
//# sourceMappingURL=Timeline.js.map
