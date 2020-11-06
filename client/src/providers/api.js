import request from '../utils/request'

export default {
    get: async url => request.get(url),
    post: async (url, model) => request.post(url, model),
    put: async (url, model) => request.put(url, model),
    delete: async (url, model) => request.delete(url, model),
}