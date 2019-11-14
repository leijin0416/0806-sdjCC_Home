## 两种方式管理 公共接口

1、 Request.post() 方式 -现采用

(params: string) -ts写法

```js
/**
 * 请求统一管理
 */
import Request from '@/common/utils/http';

/* Common */
export const rankGender = (params: string) => Request.post('/api/pcUser/loginByPhone', params);
```
2、 request() 方式，axios 引入会不同

```js
/**   
 *  [ api接口统一管理 ]   
 *     
 */
import request from '@/common/api/http';

/**
 *  Common.js
 * 
 */
export const getAdminList = (params) => {
    return request('post', 'pCNotHomePage?type' + '=' + 5, params);
}
```