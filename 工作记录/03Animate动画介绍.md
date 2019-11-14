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