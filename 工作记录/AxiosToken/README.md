
### Api 管理

参考文章：https://juejin.im/post/5d22d6b1e51d45105d63a58e

- **common/util.js 为常用工具，如存储 localStorage；**

- api/common.js:
```js
    import request from '@/common/api/http'
||
    import { post } from '@/common/api/http'
    
    export const getAdminList = (params) => {
        return request('post', 'pCNotHomePage?type' + '=' + 5, params);
    }

```
#### 组件中调用方法：

- 1、方法暴露使用（common.js中使用方法二）：

```js
    import { getAdminList, apiAddress } from '@/api/common.js';// 导入我们的api接口

    onLoad() {
        // 调用api接口，并且提供了两个参数
        apiAddress({

        }).then(res => {
            console.log(res);
            // 获取数据成功后的其他操作
        })
    },
```

---

- **2、异步请求使用：**

async函数返回的是一个Promise对象，可以使用then函数添加回调函数。

参考文章：https://www.jianshu.com/p/6b626d72ea78

```js
    import { getAdminList, apiAddress } from '@/api/common.js';// 导入我们的api接口

    created () {
        this.getAdminList(); //异步
    },
    methods: {
        async getAdminList() {
            let res = await getAdminList();
            console.log(res);
        },
    }
```
- 【1】created：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。是加载DOM,html之后，就马上执行。

- 【2】mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作（DOM 初始化渲染好了）。是执行包括js之后，准备开始调用方法。

#### 【因为请求数据是异步的，为什么不可以放在beforeCreate，等请求完成啦Vue的data不就生成的吗？】 

- 可以的。但是你不能把你需要的初始化数据的请求放在一个Vue的 Methods 里面， 因为这个时候是无法获取到 Methods 的函数的。建议放在 created 里面
当如果把所有请求放在created里面的话，请求过多会，加载太慢会导致页面出现短暂的白屏情况。

---

变量暴露

```js
export default //是默认导出

export const //是命名导出
```