"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosClient = void 0;
/* Configures the axios client. */
var axios_1 = require("axios");
var apiEndpointConstants = require("../constants/api_endpoint_constants");
exports.axiosClient = axios_1.default.create({
    baseURL: apiEndpointConstants.API_URL,
});
//# sourceMappingURL=axios_config.js.map