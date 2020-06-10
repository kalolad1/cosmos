import axiosClient from "./axiosClient";
import apiEndpoints from "./apiEndpoints";
import CONSTANTS from "./constants";

export function sendLoginRequest(email, password) {
    console.log('Handling login request.');
    return axiosClient.post(apiEndpoints.GET_TOKEN, {
        email: email,
        password: password
    })
        .then(function (response) {
            localStorage.setItem(CONSTANTS.ACCESS_TOKEN,
                response.data.access);
            localStorage.setItem(CONSTANTS.REFRESH_TOKEN,
                response.data.refresh);
            return response;
        })
}
