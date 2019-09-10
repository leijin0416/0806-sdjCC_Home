<template>
    <div class="page">
        <mescroll-vue 
            ref="mescroll" 
            :down="mescrollDown" 
            :up="mescrollUp" 
            @init="mescrollInit" class="scrollView">
            
            <m-list 
                @OnshowInfoClick="OnshowInfoClick"
                :HouseList="articleList" />

        </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'  //引用插件
import axios from '@/common/api/http.js'

import ScreenList from '@/components/ScreenList/ScreenList'

export default {
    name: '',
    components: {
		'm-list': ScreenList,
        MescrollVue // 注册mescroll组件
    },
    data() {
        return {
            mescroll: null, 
            mescrollDown:{}, 
            mescrollUp: { 
                callback: this.upCallback, // 上拉回调
                page: {
                    num: 0, //当前页 默认0,
                    size: 10 //每页数据条数,默认10
                },
                htmlNodata: '<p class="upwarp-nodata">-- 我是有底线的 --</p>',
                noMoreSize: 5, 
                toTop: {
                    //回到顶部按钮
                    src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568112696184&di=191290f61e6130a5929bdd6289a7cf9a&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F65%2F15%2F5895b559e9620_610.jpg", 
                    offset: 600,
                    warpClass: 'mescroll-totop'
                },
                htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>', 
				empty: {
					//列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
					warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
					icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
					tip: "暂无相关数据~" //提示
				}
            },
            articleList: [], // 列表数据

			Pagetotal: 0,//总条数
			Pagesize: 5,//每页显示多少条
			historyData: [],//分页数据的盒子
        }
    },
    //监控data中的数据变化
    watch: {

    },
    //监听属性 类似于data概念
    computed: {

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
                         *  获取当前总页数 -手动分页
                         */
                        let page=Math.ceil(this.Pagetotal/this.Pagesize);
                        
                        /**
                         *  数据渲染成功后, 最后一页隐藏下拉刷新的状态， 后台接口有返回列表的总页数 page
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
         *  changePages -手动分页
         * 
         *      - 因为每次滑动到底部都会触发 upCallback 访问接口的事件，所以用changePages 事件来做分页；
         *      - houses 为每次滑动后的当前数据，然后通过for循环遍历里面的数据，最后通过 push 将数据添加到 articleList数组中；
         *      - 
         */ 
		changePages(index) {
            let _start = ( index - 1 ) * this.Pagesize;
            let _end = index * this.Pagesize;
            let houses = this.historyData.slice(_start, _end);

            for (let i = 0; i < houses.length; i++) {
                let element = houses[i];
                this.articleList.push(element);  //将每次拿到的新数据 push添加到 articleList 数组中

            }
                
            // console.log(this.articleList);
        },
        OnshowInfoClick() {},
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
.page {
    overflow-y: auto;
}
// 设定高度
.mescroll {
    -webkit-overflow-scrolling:touch;
    // position: absolute;
    // top: 262px;
    // bottom: 0;
    // height: auto;
}
.mescroll-totop {
    
}
</style>