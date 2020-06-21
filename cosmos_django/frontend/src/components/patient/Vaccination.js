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
var Vaccination = /** @class */ (function (_super) {
    __extends(Vaccination, _super);
    function Vaccination() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vaccination.prototype.render = function () {
        return (React.createElement("div", { className: "vaccination rounded-grey-container" },
            React.createElement("h1", null, this.props.name)));
    };
    return Vaccination;
}(React.Component));
exports.default = Vaccination;
//# sourceMappingURL=Vaccination.js.map