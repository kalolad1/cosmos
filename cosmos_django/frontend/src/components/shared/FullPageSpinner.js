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
var core_1 = require("@material-ui/core");
var FullPageSpinner = /** @class */ (function (_super) {
    __extends(FullPageSpinner, _super);
    function FullPageSpinner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullPageSpinner.prototype.render = function () {
        return (React.createElement("div", { className: "full-page-spinner-container" },
            React.createElement(core_1.CircularProgress, { className: "full-page-spinner", color: "secondary" })));
    };
    return FullPageSpinner;
}(React.Component));
exports.default = FullPageSpinner;
//# sourceMappingURL=FullPageSpinner.js.map