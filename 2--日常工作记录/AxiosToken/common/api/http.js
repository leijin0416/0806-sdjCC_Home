import axios from "axios"
import { Message } from 'view-design'
import CryptoJS from '@/filters/md5Test'  // 3des字符串加密
import { removeStore, getStore } from '@/common/localUtil'

axios.defaults = {
    baseURL: '',
    timeout: 5000,
    withCredentials: true,
    headers: {'X-Requested-With': 'XMLHttpRequest'}
}

/**
 *  在 request 拦截器实现    -给后台
 *  每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
 *  即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
 */
axios.interceptors.request.use( config => {
    const token = getStore('token');
    token && (config.headers.Authorization = token);
	
    return config;
}, error => {
    
    return Promise.reject(error);
});

/**
 *  在 response 拦截器实现   -拿后台
 */
axios.interceptors.response.use( response => {
    // 存储
    setStore('token', response.data.token);
    if (response.data.code === -1) {
        Message.error({
            content: '系统未检测到您的信息，请登录！',
            background: true,
            duration: 3
        })
        removeStore('hasSessionToken')
        removeStore('hasUserName')
        // window.location.href = '/login';
    }
    // window.location.href = '/login';

    return response;

}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求';
                break;
            case 404:
                err.message = '请求错误,未找到该资源';
                break;
            case 500:
                err.message = '服务器端出错';
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
    return Promise.resolve(err.response);
});

export default {
    // get请求
    get(url, param) {
        return new Promise( (resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param
            })
            .then( res => {
                resolve(res)
            })
            .catch( err => {
                reject(err)
            })
        })
    },
    // post请求
    post(url, param) {
        return new Promise( (resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param
            })
            .then( res => {
                resolve(res);
            })
            .catch( err => {
                reject(err)
            })
        })
    }
}
