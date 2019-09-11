import axios from "axios"
import md5 from 'js-md5'
import local from '@/common/api/localSession.js'
import { Notice } from 'iview'

let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

axios.defaults.baseURL = 'xxxx';
axios.defaults.timeout = 10000;
//cookie
axios.defaults.withCredentials = false;

/*
*  1.0、添加一个请求拦截器，添加token
*/
axios.interceptors.request.use(config => {

    let tokenId = local.get('token');
    if (tokenId == null && router.currentRoute.path == '/login') {
        // 本地无token,未登录 跳转至登录页面
        router.push('/login');

    } else {
        if (config.data === undefined) {
            config.data = {
                "token": tokenId
            }
        } else {
            // 添加
            Object.assign(config.headers, { 'token': tokenId });
        }
    }
    return config;

}, error => {
    
    return Promise.reject(error);
});

/*
*  2.0、添加一个返回拦截器, 拿后台返回的token值
*/
axios.interceptors.response.use(response => {
    // 存储
    local.set('token', response.data.token);
    let tokenId = local.get('token');
    // 拦截
    if (tokenId === undefined) {
        //window.location.href = '/';

        return Promise.reject(response);
    } else{
        
    }
    // console.log(response.data.token);
    
    return response;
}, error => {
    if (error.data) {
        switch (error.response.status) {
            case 400:
                // 返回 401 清除token信息并跳转到登录页面
                // store.commit("del_token");
                router.push({
                    path: "/",
                    query: {}
                });
                break;
            case 404:
                router.push({ path: "/" });
                break;

        }
    }
    return Promise.reject(error);
});


export default {
    //get请求
    get(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            })
            .then(res => {
                resolve(res)
            })
            .catch(res => {
                console.log('后台接口请求失败')
                reject(res)
            })
        })
    },
    //post请求
    post(url, param) {
        // console.log(url);
        // console.log(param);
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            })
            .then(res => {
                resolve(res);
            })
            .catch(res => {
                console.log('后台接口请求失败');
                
                reject(res)
            })
        })
    }
}