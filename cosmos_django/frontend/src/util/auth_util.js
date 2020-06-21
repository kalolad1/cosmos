"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTokens = exports.hasTokens = exports.setToken = exports.getToken = exports.getAuthorizationRequestHeader = exports.refreshAccessToken = void 0;
/* Contains authentication utility functions */
var apiEndpointConstants = require("../constants/api_endpoint_constants");
var tokenConstants = require("../constants/token_constants");
var axiosConfig = require("../configs/axios_config");
function refreshAccessToken() {
    return axiosConfig.axiosClient.post(apiEndpointConstants.REFRESH_TOKEN, {
        'refresh': localStorage.getItem(tokenConstants.REFRESH_TOKEN)
    })
        .then(function (response) {
        return response;
    });
}
exports.refreshAccessToken = refreshAccessToken;
function getAuthorizationRequestHeader() {
    return {
        headers: {
            'Authorization': 'Bearer ' + getToken(tokenConstants.ACCESS_TOKEN)
        }
    };
}
exports.getAuthorizationRequestHeader = getAuthorizationRequestHeader;
function getToken(tokenType) {
    return localStorage.getItem(tokenType);
}
exports.getToken = getToken;
function setToken(tokenType, value) {
    localStorage.setItem(tokenType, value);
}
exports.setToken = setToken;
function hasTokens() {
    return (localStorage.getItem(tokenConstants.ACCESS_TOKEN) !== null &&
        localStorage.getItem(tokenConstants.REFRESH_TOKEN) !== null);
}
exports.hasTokens = hasTokens;
function clearTokens() {
    localStorage.removeItem(tokenConstants.ACCESS_TOKEN);
    localStorage.removeItem(tokenConstants.REFRESH_TOKEN);
}
exports.clearTokens = clearTokens;
//# sourceMappingURL=auth_util.js.map