## animate动画

[参考动画效果实例- 全](http://www.jq22.com/yanshi819)

- 1、npm 下载，main全局安装

```js

import VueWechatTitle from 'vue-wechat-title'; // title 
import animated from 'animate.css';

Vue.use(animated)   // 动画
Vue.use(VueWechatTitle)

```

- 2、组件- 下载并引用wow.js

```js
<div v-wechat-title="'拍居客- ' + this.HouseTitle" 
     class="m-text-bg wow fadeInLeft" 
     data-wow-duration="1s" >

</div>

import { WOW } from 'wowjs'
data() {
    return {
        HouseTitle: '标题',
    }
},
//页面初始化
mounted(){
    let wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true
    })
    wow.init();
},
```
---

## vue 元素吸顶效果

```html
<div class="container" ref="d_jump">
</div>

<script>
 /**
  * 三目运算
  * 两个高度比较
  * 如果滑动距离 > 吸顶元素到页面顶端距离  动态添加
  * 
  * scrollTop >= this.offsetTop ? (this.scrollFixed = true, this.text = '已吸顶') : (this.scrollFixed = false, this.text = '需要吸顶');
  */
data: {
    return: {
        offsetHeight: '',
        offsetTop: '',
        headerFixed: 0
    }
},
mounted() {
    this.$nextTick(() => {
        // 0、d_jump- 吸顶元素的ID
        let headr = this.$refs.d_jump;
        this.offsetTop = headr.offsetTop;
        this.offsetHeight = headr.offsetHeight;  // 元素的高度
        console.log("offsetHeight:" + this.offsetHeight);
    });
    window.addEventListener('scroll', this.handleScroll);
},
methods: {
    handleScroll() {
        let that = this;
        // 1、得到页面滚动的距离
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||document.body.scrollTop;						
        // 2、判断页面滚动的距离是否大于吸顶元素的位置
        that.headerFixed = scrollTop > (that.offsetHeight * 2);

        /* 当滚动的距离（scrollTop）大于 元素（offsetHeight）高度/位置时，返回 true */
        console.log(this.headerFixed); 
    },
},
// 离开清除
destroyed(){
    window.removeEventListener('scroll', this.handleScroll);
},
</script>

```

---

## 视频用法

```js
import Video from 'video.js'
// video视频
Vue.prototype.$video = Video

<video id="myVideo"
       class="video-js"
       x5-video-player-type="h5" >
    <source
        :src="video"
        type="video/mp4"
    >
</video>

data() {
    return {
        video: require('@/assets/img/hk/eth.mp4'),
    }
},
//监听click方法
methods: {
    initVideo() {
        //初始化视频方法
        let myPlayer = this.$video(myVideo, {
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            //autoplay: "muted",
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "100%",
            //设置视频播放器的显示高度（以像素为单位）
            height: "300px"
        });
    },
},
```