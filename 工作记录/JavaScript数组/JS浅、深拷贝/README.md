如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

### 深拷贝方法

所谓深拷贝，就是能够实现真正意义上的数组和对象的拷贝，我们通过递归调用浅拷贝的方式实现。

参考1：https://juejin.im/post/5d8aab2af265da5b932e550e

参考2：https://www.cnblogs.com/echolun/p/7889848.html

#### util.js：

- 声明方法 （一）

**【手动实现原理】**
- 遍历待拷贝对象

- 判断当前值类型，如果是object类型且不是null(null也是object)，则递归调用拷贝函数

- 如果当前值类型时null或者非object类型，直接return，退出本次递归
```js
/*
 *  纯JS方法来深拷贝对象
 *  - 暴露 keepCloning() 方法
*/

export const keepCloning = (objectpassed) => {
    if (objectpassed === null || typeof objectpassed !== 'object') {
        return objectpassed;
    }

    // 临时存储原始的obj的构造
    var temporary_storage = objectpassed.constructor();
    // 递归操作
    for (var key in objectpassed) {
        temporary_storage[key] = keepCloning(objectpassed[key]);
    }
    return temporary_storage;
}
```
---

![JS](https://github.com/leijin0416/0806-Record_sdj.cc_Home/blob/master/%E5%B7%A5%E4%BD%9C%E8%AE%B0%E5%BD%95/JavaScript%E6%95%B0%E7%BB%84/JS%E6%B5%85%E3%80%81%E6%B7%B1%E6%8B%B7%E8%B4%9D/%E6%B7%B1%E6%8B%B7%E8%B4%9D.png) 

- 声明方法 （二）-函数可以深拷贝 对象和数组

参考3：https://www.zhihu.com/question/23031215
```js
/*
 *  函数可以深拷贝 对象和数组
 *  - 暴露 keepCloning() 方法
*/

export const keepCloning = (obj) => {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;

    } else if (window.JSON) {
        // newobj = JSON.parse(JSON.stringify(obj))
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原

    } else {
        for (var i in obj) {
            // 判断ojb子元素是否为对象，如果是，递归复制
            newobj[i] = typeof obj[i] === 'object' ?
                cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
}
```

#### 使用：

- 组件引用
```js

import {keepCloning} from '@/common/util'

export default {
   //方法集合
   methods: {

        OnPagesUserId() {
            let userid = this.userId;
            axios.post('management/staff', {
                // "categoryId": 0,
            })
            .then( res => {
                if (res.data.code == 200) {
                    let all = res.data.data.all;

                    let employeeDetailsDuplicate = keepCloning(all);
                    employeeDetailsDuplicate.name = "前端大治";

                    all.forEach( (item, i, arr) => {
                        arr[i].loginPwd='******'

                        // 格式化手机数据
                        // arr[i].phone=arr[i].phone.substr(0, 1) + '****' + arr[i].phone.substr(5, '');
                        //console.log(item);
                    });

                    console.log(employeeDetailsDuplicate);
                    console.log(all);

                }
            }) 
            .catch( res => {console.log(res)})
        },
   },
}

```

#### substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符

- stringObject.substr(start,length)

|参数|描述|
|--|--|
|start | 必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。|
|length | 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。|