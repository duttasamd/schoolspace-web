import axios from 'axios';
import moment from 'moment';
import CookieService from '../services/CookieService';

const authAxios = axios.create({
    baseURL : process.env.REACT_APP_SCHOOLSPACE_API_URL
});

authAxios.interceptors.request.use(
    async config => {
        const access_token = CookieService.get('access_token');

        if(!access_token)
            Promise.reject(new Error("UNAUTHORIZED"));

        let expires_at = CookieService.get('expires_at');
        expires_at = moment.utc(expires_at);

        if(expires_at.isBefore(moment.utc()))
            Promise.reject(new Error("UNAUTHORIZED"));

        config.headers = { 
            'Authorization': `Bearer ${access_token}`
        }

        return config;
    },
    error => {
      Promise.reject(error)
    }
);

authAxios.interceptors.response.use(
    response => response,
    error => {
        if ([401, 403].includes(error.response.status)) {
            window.location.href = `${process.env.REACT_APP_SCHOOLSPACE_API_URL}/#/login`;
            return Promise.reject(error);
        }
    }
);

export default authAxios;