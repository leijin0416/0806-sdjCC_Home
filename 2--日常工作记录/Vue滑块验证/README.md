我们知道验证码的目的 是为了验证到底是人还是机器。

[1、vue+ts 模板参考](https://github.com/2384830985/-vue-ts-vuecli3.0-elementUi/tree/master/src)

[2、vue+ts 模板参考](https://github.com/wlx200510/typescript-vue)

### 用法：

粗陋版

```html
<div class="authen-warp-div1 m-verify">
    <div class="authen-warp-div2 hc-color1">滑块验证</div>
    <div class="authen-warp-div3 m-verify-box">
        <v-verify 
            @onVerfiyTrue="onVerfiyTrue" />
    </div>
</div>

<script>
import Verify from '@/components/Verify/dragVerify'

components: {
    "v-verify":Verify,
},
methods: {
    /**
     *  滑块验证
     */
    onVerfiyTrue(ids) {
        let that=this;
        if(ids == true) {
            console.log(ids);
        } else {
            console.log('验证失败');
        }
    },
}
</script>
```

### 参考文章：

[1、简书具体介绍（pc+h5）](https://www.jianshu.com/p/f5bf9ba0b27e?tdsourcetag=s_pcqq_aiomsg)

### 怎样阻止移动端浏览器左右翻页?

```js
document.getElementsByTagName('html')[0].addEventListener('touchmove',this.mouseMoveFn);
document.getElementsByTagName('html')[0].addEventListener('touchend',this.moseUpFn)
```

---

## 第二种 vue-drag-verify实现滑动解锁效果：

[2、具体介绍](http://www.hehaibao.com/vue-drag-verify-demo)

[3、回调用法](https://blog.csdn.net/milli236/article/details/81358308)

[4、演示效果](https://ashleylv.github.io/vue-drag-verify)

适合pc端，api比较友好，移动端没有处理左右滑动的问题

