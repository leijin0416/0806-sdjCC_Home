<template>
    <div class="table">
        <Table :columns="columns" :data="data" @on-row-click="OnRowDateClick" disabled-hover>
            <template slot-scope="{ row, index }" slot="currency">
                <div v-if="contract === true">
                    <span>{{ row.currency }} · {{ row.row_time }}</span>
                </div>
                <div v-else>
                    <Icon type="ios-star" v-if="row.tableStar === true" />
                    <Icon type="ios-star-outline" v-else />
                    <span class="table-outline" @click="outlineClick(row)">{{ row.q_market }}</span>
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="dollar">
                <span>{{ row.price }}</span>
                <p class="price-rmb">≈￥{{Math.round(row.price_rmb)}}</p>
            </template>
            <template slot-scope="{ row, index }" slot="change">
                <span 
                    :class="row.change >= 0 ? 'price-ries' : 'price-drop'"
                >
                <span v-if="row.change > 0">+</span> {{ row.change }}%
                </span>
            </template>
            <template slot-scope="{ row, index }" slot="lowPrice">
                <span>{{ row.q_low }}</span>
                <p class="price-rmb">≈￥{{( (row.price_rmb / row.price) * row.q_low ).toFixed(4) }}</p>
            </template>
            <template slot-scope="{ row, index }" slot="highPrice">
                <span>{{ row.q_high }}</span>
                <p class="price-rmb">≈￥{{( (row.price_rmb / row.price) * row.q_high ).toFixed(4)}}</p>
            </template>
            <!-- 24h成交额 -->
            <template slot-scope="{ row, index }" slot="deal">
                <span>￥{{ row.q_amount }}</span>
            </template>
            <!-- kk -->
            <template 
                slot-scope="{ row, index }" 
                slot="dcTypeBB">
                <p style="color: green" v-if="row.sell_type === 1">买入</p>
                <p style="color: red" v-if="row.sell_type === 2">卖出</p>
            </template>
            <!-- kk - 委托 --> 
            <template 
                slot-scope="{ row, index }" 
                slot="assetsInfo">
                <div v-if="row.sell_status === 4">
                    <Button type="success" size="small" class="btn" @click="OnAssetsInfo(row)" >
                        <p>取消</p>
                    </Button>
                </div>
                <div v-if="row.sell_status === 6">
                    <Button type="success" size="small" class="btn" disabled >
                        <p>已完成</p>
                    </Button>
                </div>
                <div v-if="row.sell_status === 5 || row.sell_status === 7">
                    <Button type="success" size="small" class="btn" disabled >
                        <p>已取消</p>
                    </Button>
                </div>
            </template>
            <!-- kk - 委托 --> 
            <template 
                slot-scope="{ row, index }" 
                slot="amountMax">
                <div v-if="!row.sell_amount_max">
                    <span>0</span>
                </div>
                <div v-else>
                    <span>{{ row.sell_amount_max }}</span>
                </div>
            </template>

        </Table>
    </div>
</template>
<script>
export default {
    props: { 
        "columns": null,
        "data": null,
        "contract": null,
    },
    data() {
        return {
            tableStar: '',
            editIndex: -1, // 当前聚焦的输入框的行数
            editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
            editAge: "", // 第二列输入框
            editBirthday: "", // 第三列输入框
            editAddress: "" // 第四列输入框
        };
    },
    methods: {
        OnRowDateClick(index) {
            this.$emit('showRowDateClick', index);
        },
        //otc点击收藏
        OnRowTableClick(data, index){
            //console.log(data);
            this.$emit('showCollectionName', data);
        },
        // kk - 委托取消
        OnAssetsInfo(data){
            //console.log(data);
            this.$emit('showCollectionName', data);
        },

    }
};
</script>

<style lang="scss" scoped>
@import "../../style/ivewTable.scss";
// ---------------------------------------下拉选择、购买按钮------------------------------------------------------------------- //

.table {
    font-size: 16px;
    .price-rmb {
        font-size: 12px;
        color: #727b95;
    }
    .table-outline {
        display: inline-block;
        vertical-align: middle;
        padding-left: 5px;
    }
    .price-ries, .price-drop {
        display: inline-block;
        padding: 4px 8px;
        min-width: 70px;
        text-align: center;    
        border-radius: 50px;
        font-size: 12px;
    }
    .price-drop {
        color: #ef5656;
        background-color: #ffeeee;
    }
    .price-ries {
        color: #3ca88b;
        background-color: #e6f6f3;
    }
}

@media only screen and (max-width: 480px) {
  .g-main-wrapper {
  }
}
</style>