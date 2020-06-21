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
var Vaccination_1 = require("./Vaccination");
var Vaccinations = /** @class */ (function (_super) {
    __extends(Vaccinations, _super);
    function Vaccinations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vaccinations.prototype.render = function () {
        var vaccinations = this.props.vaccinations.map(function (vaccination) {
            return React.createElement(Vaccination_1.default, { name: vaccination.name, key: vaccination.id });
        });
        return (React.createElement("div", { className: "patient-chart-content-container" }, vaccinations));
    };
    return Vaccinations;
}(React.Component));
exports.default = Vaccinations;
//# sourceMappingURL=Vaccinations.js.map