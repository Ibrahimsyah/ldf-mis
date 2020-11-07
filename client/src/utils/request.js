import axios from 'axios'
import store from '../stores'

const APIURL = process.env.REACT_APP_API_URL
const getAuth = () => {
    const {auth} = store.getState();
    return auth
};
const getHeaders = (refreshToken) => {
    const headers = {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Access-Control-Allow-Origin": true,
    };
    const authUser = getAuth();
    if (!refreshToken && authUser && authUser.token) {
        headers.Authorization = `Bearer ${authUser.token}`;
    }
    return headers;
};

const getOption = (method, url, data = {}) => {
    return {
        headers: getHeaders(data.refreshToken),
        method,
        url: `${APIURL}/${url}`,
        data,
    };
};

const doRequest = async option => {
    try {
        const { data } = await axios.request(option)
        return Promise.resolve(data)
    } catch (err) {
        let error = null
        if (!err.response?.data?.error) {
            error = "Ada Kerusakan Server, Mohon Hubungi Administrator"
        } else {
            error = err.response.data.error
        }
        return Promise.reject(error)
    }
}

export default {
    get: async (url) => {
        const option = getOption('get', url)
        return doRequest(option)
    },

    post: async (url, data) => {
        const option = getOption('post', url, data)
        return doRequest(option)
    },

    put: async (url, data) => {
        const option = getOption('put', url, data)
        return doRequest(option)
    },

    delete: async (url) => {
        const option = getOption('delete', url)
        return doRequest(option)
    }
}