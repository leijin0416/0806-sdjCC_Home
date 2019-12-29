#### 移动端上拉加载和下拉刷新的vue插件： mescroll.js

- 1、完成上拉加载；
- 2、实现手动分页；
- 3、监听滚动事件 实现某元素吸顶或者固定位置显示；

```js

    // 监听滚动事件
    window.addEventListener('scroll', this.handleScroll);

```

```js

npm install --save mescroll.js      //不要使用cnpm安装

外部在引用 MescrollVue 组件时，也可以通过 <router-view></router-view> 的形式展示出来；

```

文档配置： http://www.mescroll.com/api.html#options

参考： https://www.jianshu.com/p/dfabe1661738?utm_source=oschina-app

ScreenList（m-list） 为数据的组件，MescrollVue 为加载的组件；

---

#### - 手动分页：
```js
    upCallback() {
        let pageHouseList = res.data.data.houses;  //后台数据
        
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
    },

    --------------
    // 当用户上拉时再分页，根据 upCallback 返回的 page.num 进行
    changePages(index) {
        let _start = ( index - 1 ) * this.Pagesize;
        let _end = index * this.Pagesize;
        let houses = this.historyData.slice(_start, _end);

        for (let i = 0; i < houses.length; i++) {
            let element = houses[i];
            this.articleList.push(element);  //将每次拿到的新数据存储到articleList中

        }
    },

```

#### - 当数据都加载完成后，会隐藏刷新的状态：

```js

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

```
#### - 优化滑动效果：
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

#### - 引入postcss-px-to-viewport插件 （vw适配）：

```
    npm install postcss-loader postcss-px-to-viewport --save
```

在vue.config.js文件中配置即可使用：
```js
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

---

#### - vue监听滚动事件 实现某元素吸顶或者固定位置显示

handleScroll() 监听元素到顶部的距离，并判断当 滚动的距离如果大于了 元素（#searchBar）到顶部的距离时，设置 searchBarFixed 为true,否则就是false

```js
    /**
    *  显示返回按钮
    */
    handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // 顶部
        let offsetTop = document.querySelector('#searchBar').offsetTop; // 元素

        if (scrollTop > offsetTop) {
            this.searchBarFixed = true;
        } else {
            this.searchBarFixed = false;
            //this.$emit('onSearchBarFixed', false)
        }
        // console.log(scrollTop);
        // console.log(offsetTop);
        
    },
    /**
    *  返回动画
    */
    searchBarClick() {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        // 实现滚动效果 
        const timeTop = setInterval(() => {
            document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
            if (top <= 0) {
                clearInterval(timeTop);
            }
        }, 10);
        //window.animate({scrollTop:0},500);
    },
```

参考文章：https://blog.csdn.net/qq_42221334/article/details/80969890

参考文章：https://blog.csdn.net/weixin_30642267/article/details/99667554