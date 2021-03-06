import axios, {AxiosResponse} from 'axios';

export const accessTokenController = (function () {
    let accessToken = '';
    return {
        setToken: function (token: string) {
            accessToken = token;
        },
        getToken: function () {
            return accessToken;
        }
    }
})();

axios.interceptors.request.use(config => {
    console.log(config);
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    if (response.config.url) {
        if (/sign-(in|up)/.test(response.config.url)) {
            accessTokenController.setToken(response.data.accessToken);
        }
    }
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default class HttpClient {
    static get(url: string, withToken: boolean = false) {
        let token = accessTokenController.getToken();
        let headers = {};
        if (withToken) headers = {...headers, 'Authorization': token};
        return axios.get(url, headers).then((res: AxiosResponse) => res.data);
    }

    static post(url: string, body: object, withToken: boolean = true) {
        let token = accessTokenController.getToken();
        let headers = {};
        if (withToken) headers = {...headers, 'Authorization': token};
        return axios.post(url, body, {headers}).then((res: AxiosResponse) => res.data);
    }
}