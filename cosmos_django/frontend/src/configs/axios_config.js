/* Configures the axios client. The app server will have a local version of
* this file.
*/

import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/main/api/',
});
