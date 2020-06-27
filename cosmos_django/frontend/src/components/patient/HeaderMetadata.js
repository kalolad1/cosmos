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
var React = require('react');
var HeaderMetadata = /** @class */ (function (_super) {
    __extends(HeaderMetadata, _super);
    function HeaderMetadata() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    HeaderMetadata.prototype.render = function () {
        return React.createElement(
            'div',
            { className: 'patient-header-metadata' },
            React.createElement(
                'h1',
                null,
                this.props.firstName + ' ' + this.props.lastName
            ),
            React.createElement(
                'p',
                null,
                this.props.sex,
                ' \u00B7 ',
                this.props.age,
                ' years old'
            )
        );
    };
    return HeaderMetadata;
})(React.Component);
exports.default = HeaderMetadata;
//# sourceMappingURL=HeaderMetadata.js.map
