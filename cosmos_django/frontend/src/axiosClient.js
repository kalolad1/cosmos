import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/account/api/',
});

export default axiosClient;