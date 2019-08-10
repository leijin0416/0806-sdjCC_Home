<template>
    <!-- ieo 列表 -->
   <div class="ieo-box">
       <div class="ieo-list" v-for="(item, i) in ieoInfoDataList" :key="i">
           <div class="m-list-bd">
               <h2 class="font-h2 ellipsis-xs">{{item.ieo_info_name}}</h2>
               <div class="m-list-text"><p class="ellipsis-sm">{{item.ieo_introduce}}</p></div>
               <div class="m-list-ft">
                   <div class="text-time">
                       <!-- 我参与 -->
                       <div v-if="ieoInfoDataID === 4">
                           <p>已参与第 {{item.ieo_item_periods}} 期 {{item.ieo_info_sell_time}}
                               <span class="pad-left-sm" v-if="item.ieo_item_status === 1">即将开放</span>
                               <span class="pad-left-sm" v-if="item.ieo_item_status === 2">进行中</span>
                               <span class="pad-left-sm color-reg" v-if="item.ieo_item_status === 3">已结束</span>
                               </p> 
                       </div>
                       <div v-else>
                            <p v-if="item.ieo_info_status === 1">  第 {{item.ieo_info_periods}} 期 {{item.ieo_info_sell_time}} <span class="pad-left-sm">即将开放</span> </p>
                            <p v-else-if="item.ieo_info_status === 2">  第 {{item.ieo_info_periods}} 期 {{item.ieo_info_sell_time}} <span class="pad-left-sm">进行中</span>   </p>
                            <p v-else-if="item.ieo_info_status === 3">  第 {{item.ieo_info_periods}} 期 {{item.ieo_info_sell_time}} 
                            <span class="pad-left-sm color-reg">已结束</span> </p>
                            
                       </div>
                       
                   </div>
                   <div class="m-btn">
                       <div v-if="item.ieo_info_status === 2">
                           <div v-if="ieoInfoDataID === 4">
                                <Button type="info" @click="OnieoInfoDataClick(item)">查看详情</Button>
                           </div>
                           <div v-else>
                                <Button type="info" @click="OnieoInfoDataClick(item)">立即购买</Button>
                           </div>
                       </div>
                       <div v-else>
                            <Button type="info" @click="OnieoInfoDataClick(item)">查看详情</Button>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
export default {
    props: {
		ieoInfoDataList: {
			type: null,
			default: ""
        },
		ieoInfoDataID: {
			type: null,
			default: ""
        },
    },
    data() {
        return {

        }
    },
    components: {

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        OnieoInfoDataClick(id) {
            this.$emit('showIeoInfoClick', id)
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
.ieo-box {
    .ieo-list {
        padding-top: 10px;
        border-bottom: 1px solid #eee;
        .m-list-bd {
            .font-h2 {
                font-size: $font-size-base;
            }
            .m-list-text {
                min-height: 56px;
                padding-top: 10px;
                color: #999;
            }
            .m-list-ft {
                position: relative;
                .text-time {
                    padding: 15px 0;
                    font-size: $font-size-sm;
                    color: $color-body-c;
                }
                .m-btn {
                    @include tb;
                    right: 0;
                }
            }
        }
        &:last-child {border-bottom: none;}
    }
}

</style>