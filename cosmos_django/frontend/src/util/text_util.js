"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = void 0;
function capitalizeFirstLetter(str) {
    if (str === null) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
//# sourceMappingURL=text_util.js.map