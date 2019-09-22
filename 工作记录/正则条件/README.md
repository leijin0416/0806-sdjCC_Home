### filters 正则用法

![filters](https://leijin0416.coding.me/images/08_04/icon-hd_0921_2.jpg) 

- filters/index.js -全局过滤器 常用方法

- filters/regExps.js -正则方法

- filters/md5Test.js -md5加密方法

```js
/**
 *  man.js
 *  全局过滤器
 */
import filters from './filters'

Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})

/**
 *  然后在其他的.vue 文件中就可愉快地使用这些我们定义好的全局过滤器了
 *  
 */

<p>千分位分隔符：{{123456 | toThousands}}</p> // 返回 123，456

```

#### VUE 全局过滤器 filter： https://www.jianshu.com/p/6ead0ed825da

---

### 正则验证

- **组件引用：**

```js
// 使用 (模块中引入)：
    import {regs, regex, reEmail, myreg, regNum} from '@/assets/js/regExps.js' .

// 判断：
    if (!regNum.test(showKeyValue))   //不为纯数字时
    

```
- **js 转换：**


```js
/*
 *  toFixed() -四舍五入;
*/
( num * value ).toFixed(4);  

/*
 *  parseFloat() -转换为数值;
*/
parseFloat(this.otcList.sell_lave_count); 

/*
 *  Math.ceil() -两个数相除取整;
*/
Math.ceil(this.Pagetotal/this.Pagesize);  

/*
 *  reverse() -方法用于颠倒数组中元素的顺序;
*/
let messageData = this.historyData.reverse();

```

- **forEach() 用法：**

```js
/*
 *  forEach() 
*/
all.forEach( (item, i, arr) => {
    arr[i].loginPwd='******'

    //console.log(item);
});

```

---

### md5加密 暴露方法

```js
//下载
npm install --save js-md5
```

- main.js

```js
// 全局调用
import test from './assets/js/md5Test.js'

Vue.use(test)
```

- 组件引用：

```js
let aa = '123456';
this.$md5(aa);

console.log(this.$md5(aa));
```