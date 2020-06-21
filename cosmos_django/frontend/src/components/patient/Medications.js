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
var Medication_1 = require("./Medication");
var Medications = /** @class */ (function (_super) {
    __extends(Medications, _super);
    function Medications() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Medications.prototype.render = function () {
        var medications = this.props.medications.map(function (medication) {
            return React.createElement(Medication_1.default, { name: medication.name, key: medication.id });
        });
        return (React.createElement("div", { className: "patient-chart-content-container" }, medications));
    };
    return Medications;
}(React.Component));
exports.default = Medications;
//# sourceMappingURL=Medications.js.map