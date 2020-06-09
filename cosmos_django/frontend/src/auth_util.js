import axiosClient from "./axiosClient";
import API_ENDPOINTS from "./api_endpoints";
import CONSTANTS from "./constants";

export function sendLoginRequest(email, password) {
    console.log('Handling login request.');
    return axiosClient.post(API_ENDPOINTS.GET_TOKEN, {
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
