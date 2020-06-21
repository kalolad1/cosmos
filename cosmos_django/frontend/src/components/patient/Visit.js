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
var textUtil = require("../../util/text_util");
var Visit = /** @class */ (function (_super) {
    __extends(Visit, _super);
    function Visit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Visit.prototype.render = function () {
        return (React.createElement("div", { className: "visit rounded-grey-container" },
            React.createElement("h1", null, textUtil.capitalizeFirstLetter(this.props.visitType)),
            React.createElement("p", null, this.props.note)));
    };
    return Visit;
}(React.Component));
exports.default = Visit;
//# sourceMappingURL=Visit.js.map