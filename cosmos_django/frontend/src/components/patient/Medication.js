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
/* A component that represents a single medication. */
var React = require("react");
var Medication = /** @class */ (function (_super) {
    __extends(Medication, _super);
    function Medication() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Medication.prototype.render = function () {
        return (React.createElement("div", { className: "medication rounded-grey-container" },
            React.createElement("h1", null, this.props.name)));
    };
    return Medication;
}(React.Component));
exports.default = Medication;
//# sourceMappingURL=Medication.js.map