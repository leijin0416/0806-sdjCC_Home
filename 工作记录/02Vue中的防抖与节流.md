### 函数防抖(debounce)：

在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时；典型的案例就是输入搜索：输入结束后n秒才进行搜索请求，n秒内又输入的内容，就重新计时。

### 函数节流(throttle)：

规定在一个单位时间内，只能触发一次函数，如果这个单位时间内触发多次函数，只有一次生效； 典型的案例就是鼠标不断点击触发，规定在n秒内多次点击只有一次生效。

[参考git演示](https://www.cnblogs.com/yalong/p/10556665.html)

### 作用：

1、防抖函数和节流函数均属于一种性能优化方案，有效的使用可以提升程序性能，提升用户体验；

2、防抖函数可适用于点赞、输入框校验、取消点赞、创建订单等不可让用户同一时间内频繁进行操作的场景；

---

[参考 2](https://blog.csdn.net/qq_34764577/article/details/82952368)

```js
/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
    let delay = t || 500;
    let timer;
    console.log(fn)
    console.log(typeof fn)
    return function () {
        let args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
};
/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }
};

methods:{
    // 注意这里也需要是对象的形式来调用
	getAliyunData:Throttle(function() {
	    ...
	},1000),
}
```
