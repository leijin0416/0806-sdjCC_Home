import axios from "axios"
import { setStore, getStore, removeStore } from '@/common/util'

axios.defaults.baseURL = 'http://47.112.115.82:8081/';
axios.defaults.timeout = 10000;
//cookie
axios.defaults.withCredentials = false;
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
};

// 在 request 拦截器实现
axios.interceptors.request.use(config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = getStore('token');
    token && (config.headers.Authorization = token);
	
    return config;
}, error => {
    return Promise.reject(error);
});

// 在 response 拦截器实现
axios.interceptors.response.use(response => {
    // 存储
    setStore('token', response.data.token);
    //console.log(response);
    
    return response;

}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求';
                break;
            case 401:
                err.message = '未授权，请重新登录';
                break;
            case 403:
                err.message = '拒绝访问';
                break;
            case 404:
                err.message = '请求错误,未找到该资源';
                break;
            case 405:
                err.message = '请求方法未允许';
                break;
            case 408:
                err.message = '请求超时';
                break;
            case 500:
                err.message = '服务器端出错';
                break;
            case 501:
                err.message = '网络未实现';
                break;
            case 502:
                err.message = '网络错误';
                break;
            case 503:
                err.message = '服务不可用';
                break;
            case 504:
                err.message = '网络超时';
                break;
            case 505:
                err.message = 'http版本不支持该请求';
                break;
            default:
                err.message = `连接错误${err.response.status}`
        }
    } else {
        err.message = "连接到服务器失败"
    }
    message.err(err.message);
    return Promise.resolve(err.response);
});


/**
* post方法，对应post请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    reject(err.data)
                }
            )
            .catch(err => {
                reject(err.data)
            })
    })
}

/**
* get方法，对应get请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
/**
 *  暴露 request 给我们好API 管理
 *  
 */
export default function request(method, url, data) {  
    method = method.toLocaleLowerCase();   //封装RESTful API的各种请求方式 以 post get delete为例
    if (method === 'post') {
        return axios.post(url, data)    //axios的post 默认转化为json格式

    } else if (method === 'get') {
        return axios.get(url, {
            params: data
        })

    } else if (method === 'delete') {
        return axios.delete(url, {
            params: data
        })
    }
}