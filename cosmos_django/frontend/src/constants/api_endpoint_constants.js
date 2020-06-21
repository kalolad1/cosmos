"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VISITS = exports.ACCOUNTS = exports.REFRESH_TOKEN = exports.GET_TOKEN = exports.LOGO_TEXT = exports.TEXT = exports.API_URL = exports.STATIC = void 0;
/* Contains API endpoint constants. */
var base_url_constant_1 = require("./base_url_constant");
exports.STATIC = base_url_constant_1.BASE_URL + '/static/frontend/';
exports.API_URL = base_url_constant_1.BASE_URL + '/main/api/';
exports.TEXT = exports.STATIC + 'images/logos/text_800_220.png';
exports.LOGO_TEXT = exports.STATIC + 'images/logos/logo_text_800x200.png';
exports.GET_TOKEN = 'token/';
exports.REFRESH_TOKEN = 'token/refresh/';
exports.ACCOUNTS = 'accounts/';
exports.VISITS = 'visits/';
//# sourceMappingURL=api_endpoint_constants.js.map