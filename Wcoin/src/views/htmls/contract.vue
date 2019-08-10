<template>
<div class="contract">
	<div class="m-tabs-box">
		<div class="m-tabs-hd">
			<p :class="{active : flagIndex == 1}" @click="changeNav(1)">USDT</p>
			<p :class="{active : flagIndex == 2}" @click="changeNav(2)">PEX</p>
		</div>
		<div v-if="flagIndex == 1">
			<m-table 
				:contract="contract"
				:columns="freeColumns"
				:data="freeData" />
		</div>
		<div v-if="flagIndex == 2">
			<m-table 
				:contract="contract"
				:columns="freeColumns"
				:data="freeData" />
		</div>
	</div>
</div>
</template>

<script>
import Zindex from "@/components/Zindex"
import fromMarketList from "@/components/fromMarketList/fromMarketList"

import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
	name: "",
	//组件
	components: {
		'm-container': Zindex,
		'm-table': fromMarketList,
	},
	//接收父组件传参
	props: {},
	data() {
		return {
			contract: true,
			flagIndex: 1,
            freeColumns: [
                {
                    title: "合约",
                    slot: "currency"
                },
                {
                    title: "最新价",
                    slot: "dollar"
                },
                {
                    title: "涨幅",
                    slot: "change"
                },
                {
                    title: "最低价",
                    slot: "lowPrice"
                },
                {
                    title: "最高价",
                    slot: "highPrice"
                },
                {
                    title: "24H量",
                    slot: "deaNumber"
                },
                {
                    title: "24H成交额",
                    slot: "deal"
                }
            ],
            freeData: [
                {
                    job: 12,
					currency: "BTC0607",
					row_time: '本周',
                    dollar: 18,
                    change: "91",
                    lowPrice: "北京市朝阳区芍药居",
                    highPrice: "919526400000",
                    deaNumber: 26,
                    deal: "北京市朝阳区芍药居",
                    low_price_rmb: 220,
                    price: 1.2,
                    high_price_rmb: 350,
                },
                {
                    currency: "BTC0607",
					row_time: '本周',
                    dollar: 25,
                    change: "696",
                    lowPrice: "北京市海淀区西二旗",
                    highPrice: "919526400000",
                    deaNumber: 26,
                    deal: "北京市朝阳区芍药居",
                    low_price_rmb: 220,
                    price: 1.2,
                    high_price_rmb: 350,
                },
                {
                    currency: "BTC0607",
					row_time: '本周',
                    dollar: 30,
                    change: "563",
                    lowPrice: "上海市浦东新区世纪大道",
                    highPrice: "919526400000",
                    deaNumber: 26,
                    deal: "北京市朝阳区芍药居",
                    low_price_rmb: 220,
                    price: 1.2,
                    high_price_rmb: 350,
                },
                {
                    currency: "BTC0607",
					row_time: '本周',
                    dollar: 26,
                    change: "-68",
                    lowPrice: "深圳市南山区深南大道",
                    highPrice: "919526400000",
                    deaNumber: 26,
                    deal: "北京市朝阳区芍药居",
                    low_price_rmb: 220,
                    price: 1.2,
                    high_price_rmb: 350,
                }   
            ],
		}
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url"]),
	},
	//页面初始化
	mounted(){
		//this.mapMutationsId();
	},
	//监听click方法
	methods: {
		//传
		...mapMutations("localSession", ['handleUserName']),
		mapMutationsId() {
			// let id = this.HouseName;
			// this.handleUserName(id);
		},
		//搜索栏
		OnSearchClick() {
			//alert('11');
		},
		changeNav(index) {
			if(index == 1){
				this.flagIndex = 1;
			} else if(index == 2){
				this.flagIndex = 2;
			} else if(index == 3){
				this.flagIndex = 3
			}
		},
	},
	
}
</script>

<style lang="scss" scoped>

/deep/.ivu-tabs-nav-scroll {
	text-align: left;
}
/deep/.ivu-tabs-nav-right {
	width: 300px;
	.ivu-input-search {
		border-color: $color-body-c !important;
		background-color: $color-body-c !important;
	}
}
/deep/.ivu-tabs-nav .ivu-tabs-tab .ivu-icon {margin: 0 0 4px;}
// ---------------------------------------下拉选择、购买按钮------------------------------------------------------------------- //


.contract {
	min-height: 800px;
	padding: 20px;
    border: 1px solid #dcdee2;
	background: #fff;
	.m-tabs-box {
		.m-tabs-hd{
			p {
				cursor: pointer;
				display: inline-block;
				min-width: 60px;
				padding: 4px 10px;
				text-align: center;
				border-radius: 50px;
				overflow: hidden;
				margin-right: 15px;
			}
			.active {
				color: $color-white;
				background-color: #6d7ecf;
			}
		}
	}
}




@media only screen and (max-width: 480px) {
	.g-main-wrapper {
	}
}
</style>
