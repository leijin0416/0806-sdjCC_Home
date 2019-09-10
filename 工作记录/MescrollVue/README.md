#### 移动端上拉加载和下拉刷新的vue插件： mescroll.js

```js

npm install --save mescroll.js //不要使用cnpm安装

```

文档配置： http://www.mescroll.com/api.html#options
参考： https://www.jianshu.com/p/dfabe1661738?utm_source=oschina-app

ScreenList（m-list） 为数据的组件，MescrollVue 为加载的组件；

外部在引用 MescrollVue 组件时，也可以通过 <router-view></router-view> 的形式展示出来；

```css
// 设定高度
.mescroll {
    //-webkit-overflow-scrolling:touch;
    position: fixed;
    top: 2px;
    bottom: 0;
    height: auto;
}

```
当 position: fixed; 时返回顶部（toTop）才会生效；