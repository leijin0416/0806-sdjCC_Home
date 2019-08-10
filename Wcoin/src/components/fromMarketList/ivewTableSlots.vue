<template>
    <!-- 新版 -->
    <div class="table">
        <Table :columns="columns" :data="data" disabled-hover>
            <!-- 昵称 -->
            <template 
                slot-scope="{ row, index }" 
                slot="currency">
                <div class="table-name"> <span>{{ row.user_name }}</span></div>
                <div class="table-name">{{ row.user_name }}</div>
            </template>
            <template 
                slot-scope="{ row, index }" 
                slot="dollar">
                <span>{{ row.sell_lave_count }} {{row.dc_t_name}}</span>
            </template>
            <template 
                slot-scope="{ row, index }" 
                slot="lowPrice">
                <span>{{ row.sell_amount_min }} ~ {{ row.sell_amount_max }}</span>
                <span>{{row.currency_name}}</span>
            </template>
            <!-- 单价 -->
            <template 
                slot-scope="{ row, index }" 
                slot="highPrice">
                <span>{{ row.sell_unit_price }} </span>
                <span>{{row.currency_name}}</span>
            </template>
            <!-- 支付方式 -->
            <template 
                slot-scope="{ row, index }" 
                slot="otcmode">
                <div v-if="row.sell_pay_type === 1" class="m-play-img">
                    <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png">
                </div>
                <div v-if="row.sell_pay_type === 2" class="m-play-img">
                    <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png">
                </div>
                <div v-if="row.sell_pay_type === 3" class="m-play-img">
                    <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png">
                    <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png">
                </div>
                <div v-if="row.sell_pay_type === 4" class="m-play-img">
                    <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png">
                </div>
                <div v-if="row.sell_pay_type === 5" class="m-play-img">
                    <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png">
                    <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png">
                </div>
                <div v-if="row.sell_pay_type === 6" class="m-play-img">
                    <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png">
                    <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png">
                </div>
                <div v-if="row.sell_pay_type === 7" class="m-play-img">
                    <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png">
                    <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png">
                    <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png">
                </div>
            </template>
             <!-- otc 购买\卖出 -->
            <template 
                slot-scope="{ row, index }" 
                slot="deaNumber">
                <div v-if="otcYouself === '1'">
                    <Button type="success" style="" @click="OnShowOtc(row)" >取消</Button>
                    <Button style="margin-left: 15px;opacity: .8;" v-if="row.sell_type === 1" disabled>买入</Button>
                    <Button style="margin-left: 15px;opacity: .8;" v-if="row.sell_type === 2" disabled>卖出</Button>

                </div>
                <div v-else>
                    <Button type="success" style="" @click="OnShowOtc(row)" v-if="row.sell_type === 1">买入</Button>
                    <Button type="success" style="" @click="OnShowOtc(row)" v-if="row.sell_type === 2">卖出</Button>
                </div>
            </template>
            <!-- 交易记录-数量 -->
            <template 
                slot-scope="{ row, index }" 
                slot="ordersnumber">
                <span>{{ row.ordersnumber }} </span>
                <span>BTC</span>
            </template>
            <!-- 交易记录- 状态 -->
            <template 
                slot-scope="{ row, index }" 
                slot="status">
                <span 
                    :class="[
                        { colorRed : row.orderStatusName === '已取消'},
                        { colorRed : row.orderStatusName === '待付款'},
                        { colorBlue : row.orderStatusName === '已支付'},
                        { colorBody : row.orderStatusName === '待放行'}
                    ]">
                    {{row.orderStatusName}}
                </span>
            </template>
            <!-- 交易记录- 查看详情 -->
            <template 
                slot-scope="{ row, index }" 
                slot="oldercancel">
                <Button type="success" style="" @click="OnOldersOtc(row)">详情</Button>
            </template>
            <!-- 个人中心-我的资产 -->
            <template 
                slot-scope="{ row, index }" 
                slot="assetsMode">
                <Button type="success" size="small" class="btn" @click="OnAssetsCharge(row)" v-if="assetsCharge === true
                ">
                    <p>充币</p>
                </Button>
                <Button type="success" size="small" class="btn" @click="OnAssetsCarry(row)" v-if="assetsCarry === true
                ">
                    <p>提币</p>
                </Button>
                <Button type="success" size="small" class="btn" @click="OnAssetsTurn(row)" v-if="assetsTurn === true
                ">
                    <p>划转</p>
                </Button>
                <p v-else>无</p>
            </template>
            <!-- 个人中心-我的资产 - 明细--> 
            <template 
                slot-scope="{ row, index }" 
                slot="assetsInfo">
                <Button type="success" size="small" class="btn" @click="OnAssetsInfo(row)" >
                    <p>查看</p>
                </Button>
            </template>
            <!-- 锁仓 -->
            <template 
                slot-scope="{ row, index }" 
                slot="dcType">
                <p v-if="row.user_dc_type === 1">BB钱包</p>
                <p v-if="row.user_dc_type === 2">合约钱包</p>
                <p v-if="row.user_dc_type === 3">OTC钱包</p>
                <p v-if="row.user_dc_type === 4">锁仓钱包</p>
            </template>
        </Table>
    </div>
</template>
<script>
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    props: { 
        "columns": null,
        "data": null,
        "assetsCharge": null, //判断
        "assetsCarry": null,
        "assetsTurn": null,
    },
    data() {
        return {
            otcYouselfs: '',
        };
    },
    //监听属性 类似于data概念
    computed: {
		//取
		...mapGetters("localSession", ["otcYouself"]),
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //console.log(local.get('otcYouself'));
        
    },
    methods: {
        //星星关注
        outlineClick(i) {
            let comment = i;
            let tableStar = true;
            //comment.push(tableStar);
            this.data.splice(i, {tableStar: true});
            //console.log(i);
            //this.data[i].tableStar = true;
        },
        OnShowOtc(index) {
            this.$emit('showPurchaseName', index);
            //console.log(index);
        },
        // 交易记录-查看详情
        OnOldersOtc(index) {
            this.$emit('showOldersName', index);
        },
        // 我的资产-按钮
        OnAssetsCharge(index) {
            this.$emit('showAssetsName', index, 1);
        },
        OnAssetsCarry(index) {
            this.$emit('showAssetsName', index, 2);
        },
        OnAssetsTurn(index) {
            this.$emit('showAssetsName', index, 3);
        },
        OnAssetsInfo(index) {
            this.$emit('showAssetsName', index, 4);
        },
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/ivewTable.scss";
// ---------------------------------------下拉选择、购买按钮------------------------------------------------------------------- //

.table {
    font-size: 16px;
    span {
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle;
    }
    .table-name {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
        &:nth-child(1) {
            width: 30px;
            height: 30px;
            overflow: hidden;
            line-height: 29px;
            font-size: 1rem;
            text-align: center;
            border-radius: 50%;
            color: $color-white;
            background-color: $color-body-c;
            span {
                display: inline-block;
                width: 12px;
                overflow: hidden;
                white-space: nowrap;
                letter-spacing: 10px;
                margin: 0;
                font-weight: bold;
            }
        }
    }
    .btn {margin-right: 10px;}
    .m-play-img {
        img {
            display: inline-block;
            margin: auto 5px;
        }
    }
}

@media only screen and (max-width: 480px) {
  .g-main-wrapper {
  }
}
</style>