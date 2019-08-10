<template>
    <!-- 中心-资产明细 -->
    <div class="assets">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">我的资产 > 资产明细</span> 
                </h2>
                
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-assets-box">
                    <!-- 信息 -->
                    <div class="m-assets-tab">
                        <div class="tab-list">
                            <m-table 
                                :columns="freeColumns"
                                :data="freeData" />
                        </div>
                    </div>
                    <!-- end -->
                </div>
            </Col>
        </Row>
    </div>
</template>


<script>
import ivewTableSlots from "@/components/fromMarketList/ivewTableSlots"

export default {
    data() {
        return {
            //购买表格
            freeColumns: [
                {
                    title: "时间",
                    key: 'currency',
                    slot: ""
                },
                {
                    title: "币种",
                    key: 'dollar',
                    slot: ""
                },
                {
                    title: "类型",
                    key: 'lowPrice',
                    slot: ""
                },
                {
                    title: "数量",
                    key: 'highPrice',
                    slot: ""
                },
            ],
            freeData: [],
        }
    },
    components: {
		'm-table': ivewTableSlots,

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        OnFeedbackClcik() {
            let assetsList = [
                {
                    name: '112',
                    ss: '255',
                },
                {
                    name: '112',
                    ss: '255',
                }
            ];
            let ss = [
                {
                    currency: '',
                    dollar: '',
                },
                {
                    currency: '',
                    dollar: '',
                },
            ];
            for (let index = 0; index < assetsList.length; index++) {
                ss[index].currency = assetsList[index].name;
                ss[index].dollar = assetsList[index].ss;
                this.freeData = ss;
                console.log(ss);
            }
        },
        //重新
        OnExamineAgainClcik() {},
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.OnFeedbackClcik();
    },
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
/deep/.ivu-tabs-nav-scroll {text-align: initial;}


.assets {
    .details-h2 {
        padding: 15px 30px;
        margin-bottom: 15px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
    }
    .m-assets-box {
        min-height: 600px;
        padding: 15px 30px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        .m-assets-text {
            position: relative;
            .font-h2 {
                padding: 10px 0;
                font-size: $font-size-base;
                span {
                    font-weight: bold;
                }
            }
            .btn {
                @include tb;
                right: 0;
            }
        }
    }
    .details-btn {
        padding-top: 50px;
        text-align: center;
        .btn {
            width: 230px;
            box-shadow: 0 2px 8px rgba(151, 151, 151, .4);
        }
    }
}

</style>