#### 移动端上拉加载和下拉刷新的vue插件： mescroll.js

- 1、完成上拉加载；
- 2、完成图标返回顶部；

```js

npm install --save mescroll.js      //不要使用cnpm安装

外部在引用 MescrollVue 组件时，也可以通过 <router-view></router-view> 的形式展示出来；

```

文档配置： http://www.mescroll.com/api.html#options

参考： https://www.jianshu.com/p/dfabe1661738?utm_source=oschina-app

ScreenList（m-list） 为数据的组件，MescrollVue 为加载的组件；

---

#### 手动分页：
```js
<script>

    let pageHouseList = res.data.data.houses;
    
    // 分页-保存取到的所有数据到数组中
    this.historyData = res.data.data.houses;
    this.Pagetotal = res.data.data.houses.length; //获取数组长度
    // 初始化显示，小于每页显示条数，全部显示，大于每页显示条数，取前每页条数显示
    if(res.data.data.houses.length < this.Pagesize){
        this.articleList = this.historyData;

    } else{
        if (num === 1) {
            this.articleList = this.historyData.slice(0,this.Pagesize);
        } else {
            this.changePages(num);
        }
        
    }

    --------------

    
    changePages(index) {
        let _start = ( index - 1 ) * this.Pagesize;
        let _end = index * this.Pagesize;
        let houses = this.historyData.slice(_start, _end);

        for (let i = 0; i < houses.length; i++) {
            let element = houses[i];
            this.articleList.push(element);  //将每次拿到的新数据存储到articleList中

        }
    },

<script>
```

#### 当数据都加载完成后，会隐藏刷新的状态：

```js
<script>

    /**
        *  获取当前总页数,取整数
        */
    let page=Math.ceil(this.Pagetotal/this.Pagesize);
    
    /**
        *  数据渲染成功后, 隐藏下拉刷新的状态， 后台接口有返回列表的总页数 page
        */
    this.$nextTick(() => {
        mescroll.endByPage(this.Pagetotal, page);
    });

</script>
```
#### 优化滑动效果：
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

---

#### 引入postcss-px-to-viewport插件 （vw适配）：

```
    npm install postcss-loader postcss-px-to-viewport --save
```

在vue.config.js文件中配置即可使用：
```
    css: {
		extract: true, 
        loaderOptions: {
            sass: {
                data: `
                @import "@/style/mixin.scss";
                @import "@/style/_var.scss";
                `
            },
            postcss: {
                plugins: [
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px",
                        viewportWidth: 750,
                        unitPrecision: 5,
                        propList: [ "*" ],
                        viewportUnit: "vw",
                        fontViewportUnit: "vw",
                        selectorBlackList: [],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,
                    })
                ]
            },
        },
    },
```

参考文章：https://www.jianshu.com/p/9af556e0f2fc