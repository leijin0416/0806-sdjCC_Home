import axios from "axios"
import md5 from 'js-md5'
import { Notice } from 'iview'
import local from '@/common/api/localSession.js'


let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

axios.defaults.baseURL = 'http://localhost:8085/';

axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
};
axios.defaults.timeout = 10000;
//解决seesion不一致
axios.defaults.withCredentials = true;

// 2.0、在 request 拦截器实现
axios.interceptors.request.use(config => {
    // 请求头中添加 seesion
    let seesionId = sessionStorage.getItem('seesion');

    config.data.session = seesionId;
    config.data.hash = md5((new Date()).valueOf() + config.data.func);

    return config;
}, error => {
    return Promise.reject(error);
});

// 1.0、在 response 拦截器实现, 拿后台返回
axios.interceptors.response.use(response => {
    // 存储 seesion
    sessionStorage.setItem('seesion', response.data.session);
    let seesionId = sessionStorage.getItem('seesion');
    // 拦截 seesion
    if (seesionId === null) {
        //window.location.href = '/';
        Notice.warning({
            title: '系统通知',
            desc: '您的登录信息已过期，请重新登录！',
            duration: 5,
            onClose: () => {
                sessionStorage.removeItem('seesion');
                local.remove('user_SessionId');
            }
        });

        return Promise.reject(response);
    }
    
    
    return response
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
                break

        }
    }
    return Promise.reject(error);
});


export default {
    //patch请求
    patch(url, func, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                params: {
                    func,
                    data
                },
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
                console.log('后台接口请求失败')
                reject(res)
            })
        })
    }
}