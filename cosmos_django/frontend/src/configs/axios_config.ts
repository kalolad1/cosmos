/* Configures the axios client. */
import axios from 'axios';

import * as apiEndpointConstants from '../constants/api_endpoint_constants'

export const axiosClient = axios.create({
    baseURL: apiEndpointConstants.API_URL,
});
