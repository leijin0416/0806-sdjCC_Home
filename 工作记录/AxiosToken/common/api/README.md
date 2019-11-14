### 接口暴露- request() 方式

```js
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

```