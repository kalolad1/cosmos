"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRequest = exports.loginRequest = void 0;
var axiosConfig = require("../configs/axios_config");
var apiEndpointConstants = require("../constants/api_endpoint_constants");
var tokenConstants = require("../constants/token_constants");
var authUtil = require("../util/auth_util");
function loginRequest(email, password) {
    return axiosConfig.axiosClient.post(apiEndpointConstants.GET_TOKEN, {
        email: email,
        password: password
    })
        .then(function (response) {
        authUtil.setToken(tokenConstants.ACCESS_TOKEN, response.data.access);
        authUtil.setToken(tokenConstants.REFRESH_TOKEN, response.data.refresh);
        return response;
    });
}
exports.loginRequest = loginRequest;
function signupRequest(email, password, firstName, lastName, dateOfBirth, sex) {
    return axiosConfig.axiosClient.post(apiEndpointConstants.ACCOUNTS, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: {
            year: dateOfBirth.year,
            month: dateOfBirth.month,
            day: dateOfBirth.day,
        },
        sex: sex
    });
}
exports.signupRequest = signupRequest;
//# sourceMappingURL=auth_api.js.map