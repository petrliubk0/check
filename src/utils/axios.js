import axios from 'axios';
const TIMEOUT = 10 * 1000;

function get(url) {
    const source = axios.CancelToken.source();
    setTimeout(source.cancel, TIMEOUT);
    return axios.get(url, {cancelToken: source.token});
}

function post(url, params) {
    const source = axios.CancelToken.source();
    setTimeout(source.cancel, TIMEOUT);
    return axios.post(url, params, {cancelToken: source.token})
}



export default {
    get, post
}