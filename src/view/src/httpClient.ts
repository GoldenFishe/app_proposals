import axios, {AxiosResponse} from 'axios';

export const accessTokenStore = (function () {
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
            accessTokenStore.setToken(response.data.accessToken);
        }
    }
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default class HttpClient {
    static async get(url: string, withToken: boolean = true) {
        let accessToken = accessTokenStore.getToken();
        let headers = {};
        if (withToken) {
            if (!accessToken) accessToken = await this.getAccessToken();
            headers = {...headers, 'Authorization': accessToken};
        }
        return axios.get(url, {headers}).then((res: AxiosResponse) => res.data);
    }

    static async post(url: string, body: object, withToken: boolean = false) {
        let accessToken = accessTokenStore.getToken();
        let headers = {};
        if (withToken) {
            if (!accessToken) accessToken = await this.getAccessToken();
            headers = {...headers, 'Authorization': accessToken};
        }
        return axios.post(url, body, {headers}).then((res: AxiosResponse) => res.data);
    }

    static async getAccessToken() {
        try {
            const request = await axios.get('/api/user/access-token');
            return request.data.accessToken;
        } catch (err) {
            console.error(err);
        }
    }
}