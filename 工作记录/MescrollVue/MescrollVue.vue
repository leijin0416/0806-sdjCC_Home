<template>
    <div class="page" id="searchBar">
        <mescroll-vue 
            ref="mescroll" 
            :down="mescrollDown" 
            :up="mescrollUp" 
            @init="mescrollInit" class="scrollView">
            
            <m-list 
                @OnshowInfoClick="OnshowInfoClick"
                :HouseList="articleList" />

        </mescroll-vue>
        <!-- 返回顶部 -->
        <div class="m-top-img"
            id="toTop" 
            :class="searchBarFixed == true ? 'isFixed' :''"
            @click="searchBarClick">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568196620635&di=fd19064dc428e841bc5fd51aee4177ff&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F31%2F21%2F5810a9d3c190f_610.jpg" alt="top.png" class="img">
        </div>
    </div>
</template>

<script>
import axios from '@/common/api/http.js'
import MescrollVue from 'mescroll.js/mescroll.vue'

import ScreenList from '@/components/sassAnimation/sassAnimation'

export default {
    name: 'mescroll',
    data() {
        return {
            mescroll: null, 
            mescrollDown:{}, 
            mescrollUp: { 
                callback: this.upCallback, // 上拉回调
                page: {
                    num: 0, //当前页 默认0,回调之前会加1; 
                    size: 10 //每页数据条数
                },
                noMoreSize: 5, 
                htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新</p>', 
                htmlNodata: '<p class="upwarp-nodata">-- 我是有底线的 --</p>',
                isBounce: true,
            },
            articleList: [], // 列表数据

			Pagetotal: 0,//总条数
			Pagesize: 5,//每页显示多少条
            historyData: [],//分页数据的盒子
            
            searchBarFixed: false,
        }
    },
    props:{
        step:{ //此数据是控制动画快慢的
            type:Number,
            default:50
        }
    },
    beforeRouteEnter (to, from, next) { 
        next(vm => {
            vm.$refs.mescroll.beforeRouteEnter(); 
            // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
            
        })
    },
    beforeRouteLeave (to, from, next) { 
        this.$refs.mescroll.beforeRouteLeave(); 
        // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
        next()
    },
    components: {
		'm-list': ScreenList,
        MescrollVue // 注册mescroll组件
    },
    //监听属性 类似于data概念
    computed: {
        
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        upCallback(page, mescroll) {
            // 更新的页数
            let num = page.num;
            setTimeout(() => {
                axios.post('pCNotHomePage?categoryId' + '=' + 0 + 
                    '&' + 'type' + '=' + 6, {
                    // "categoryId": 0,
                    "pageNum": page.num,
                })
                .then( res => {
                    //console.log(res);
                    if (res.data.code == 200) {
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

                    } else {mescroll.endErr();console.log(res.data.msg);}
                }) 
                .catch( res => {console.log('请求出错了');})
            }, 2000);
        },
		/**
         *  changePages 手动控制分页
         *  - 因为每次滑动到底部都会触发 upCallback 访问接口的事件，所以用changePages做分页
         *  - houses 为每次滑动的不同数据，然后通过for循环遍历里面的数据，最后通过 push 添加到 articleList数组中
         *  - 
         */
		changePages(index) {
            let _start = ( index - 1 ) * this.Pagesize;
            let _end = index * this.Pagesize;
            let houses = this.historyData.slice(_start, _end);

            for (let i = 0; i < houses.length; i++) {
                let element = houses[i];
                this.articleList.push(element);  //将每次拿到的新数据存储到articleList中

            }
                
            // console.log(this.articleList);
        },
        OnshowInfoClick() {},
        /**
         *  显示返回按钮
         */
        handleScroll () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let offsetTop = document.querySelector('#searchBar').offsetTop;

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
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // 设置监听
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        // 移除监听
        window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类
*/
.page {
    position: relative;
    background-color: #fff;
    .m-top-img {
        z-index: 999;
        position: fixed;
        bottom: 70px;
        right: 15px;
        opacity: 0;
        transition: all .4s linear;
        .img {
            width: 45px;
            height: 45px;
            overflow: hidden;
            border-radius: 50%;
            box-shadow: 0 4px 6px #ddd;
            border: 6px solid #f6f6f6;
            background-color: #f6f6f6;
        }
    }
    .isFixed {
        opacity: 1;
    }
    .mescroll {
        -webkit-overflow-scrolling:touch;
    }
}
</style>