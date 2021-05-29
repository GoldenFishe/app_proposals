import axios, {AxiosResponse} from 'axios';

export const accessTokenStore = (function () {
    let accessToken = '';
    let initialized = false;
    return {
        setToken: function (token: string) {
            accessToken = token;
        },
        getToken: function () {
            return accessToken;
        },
        init: function () {
            initialized = true;
        },
        isInitialized: function () {
            return initialized;
        }
    }
})();

axios.interceptors.request.use(
    config => {

        return config;
    },
    error => {

        return Promise.reject(error);
    });

axios.interceptors.response.use(
    response => {
        if (response.data.accessToken) accessTokenStore.setToken(response.data.accessToken);
        return response;
    },
    async (error) => {
        // if (error.response && error.response.status === 401 && !accessTokenStore.isInitialized()) {
        //     accessTokenStore.init();
        //     await HttpClient.getAccessToken();
        //     return axios.request(error.response.config);
        // }
        return Promise.reject(error);
    });

export default class HttpClient {
    static async get<T>(url: string) {
        let accessToken = accessTokenStore.getToken();
        let headers = {};
        if (!accessToken) accessToken = await this.getAccessToken();
        headers = {...headers, 'Authorization': accessToken};
        return axios.get(url, {headers}).then((res: AxiosResponse<T>) => res.data);
    }

    static async post<T>(url: string, body: object, withToken: boolean = false) {
        let accessToken = accessTokenStore.getToken();
        let headers = {};
        if (!accessToken) accessToken = await this.getAccessToken();
        headers = {...headers, 'Authorization': accessToken};
        return axios.post(url, body, {headers}).then((res: AxiosResponse<T>) => res.data);
    }

    static async getAccessToken() {
        try {
            const request: AxiosResponse<{ accessToken: string }> = await axios.get('/api/user/access-token');
            return request.data.accessToken;
        } catch (err) {
            console.error(err);
            return '';
        }
    }
}

export type HttpClientResponse<Ok, Error> = Ok | Error;