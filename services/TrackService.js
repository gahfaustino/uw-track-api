const  axios = require('axios');
const AxiosHandlerError = require('./utils/AxiosErrorHandler')
const  { last, omitBy } = require('lodash')
const apiUrl = process.env?.TRACKING_API
const apiToken = process.env?.TRACKING_SECRET

if(!apiToken) {
    const event = new Event('invalid_token')
    window.dispatchEvent(event)
}

const api = axios.create({
    baseURL: apiUrl,
    headers: { 
        'Authorization': 'Bearer ' + apiToken,
    },
    crossDomain: true,
    withCredentials: true,
})

const errorHandler = (error) => {
    if(error.response?.status === 401) {
        const endPath = last(error.config.url.split('/'));
        if(endPath === 'verifyToken') {
            window.location.href = config.loginPath;
        }
    }

    if(error.code === 'ERR_NETWORK') {
        window.dispatchEvent(new Event('err_network'));
    }

    throw new AxiosHandlerError(error);
}

// api.interceptors.response.use((res) => {
//     return res;
// }, errorHandler);

// api.interceptors.request.use(
//     function(config) {
//       // Do something before request is sent
//       config.withCredentials = true;
//       return config;
// },errorHandler);

// api.interceptors.response.use((response) => {
//     return response;
// }, function (error) {
//     // Do something with response error
//     if (error.response.status === 401) {
//         console.log('unauthorized, logging out ...');
//         auth.logout();
//         router.replace('/auth/login');
//     }
//     return Promise.reject(error.response);
// });

const get =  async (uri, data) => await axios.get(uri, data).catch(errorHandler);
const post =  async (uri, data) => await axios.post(uri, data);
const put = async (uri, data) => await axios.put(uri, data);
const del = async (uri, data) => await axios.delete(uri, data);

const getAllUser = async () => {
    let json = await api.get(
        '/api/users'
    ).catch(errorHandler);

    return json;
};

const createUser = async (data) => {
    let json = await api.post(
        '/api/users',
        data
    ).catch(errorHandler);

    return json;
};
module.exports = { 
    get,
    post,
    put,
    del,
    createUser,
    getAllUser,
}; 