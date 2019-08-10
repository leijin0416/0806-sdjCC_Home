<template>
<!-- 行情-tab -->
<div class="market">
	<Tabs value="name1">
        <TabPane label="自选" name="name1" icon="md-star" >
			<div class="m-tabs-box">
				<m-table 
					@showRowDateClick="showRowDateClick"
					@showCollectionName="showCollectionDelete"
					:contract="contract"
					:columns="freeColumns"
					:data="collectionData" />
			</div>
		</TabPane>
        <TabPane label="全部行情" name="name2">
			<div class="m-tabs-box">
				<div class="m-tabs-hd">
					<p :class="{active : flagIndex == 1}" @click="changeNav(1)">USDT</p>
				</div>
				<div v-if="flagIndex == 1">
					<m-table 
						@showRowDateClick="showRowDateClick"
						@showCollectionName="showCollectionName"
						:contract="contract"
						:columns="freeColumns"
						:data="contractData" />
				</div>
			</div>
		</TabPane>
        <TabPane label="涨幅榜" name="name3">
			<div class="m-tabs-box">
				<m-table 
					@showRowDateClick="showRowDateClick"
					@showCollectionName="showCollectionName"
					:contract="contract"
					:columns="freeColumns"
					:data="rankingData" />
			</div>
		</TabPane>
		<!-- <div slot="extra">
			<Input search enter-button="搜索" placeholder="请输入搜索币种" @on-search="OnSearchClick" />
		</div> -->
    </Tabs>
</div>
</template>

<script>
import fromMarketList from "@/components/fromMarketList/fromMarketList"
import axios from '@/common/api/http.js'

import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
	name: "",
	//组件
	components: {
		'm-table': fromMarketList,
	},
	//接收父组件传参
	props: {},
	data() {
		return {
			contract: false,
			flagIndex: 1,
            freeColumns: [
                {
					title: "交易对",
					key: 'q_market',
                    slot: "currency"
                },
                {
                    title: "最新价",
					key: 'price',
                    slot: "dollar"
                },
                {
                    title: "涨幅",
					key: 'change',
                    slot: "change"
                },
                {
                    title: "最低价",
					key: 'q_low',
                    slot: "lowPrice"
                },
                {
                    title: "最高价",
					key: 'q_high',
                    slot: "highPrice"
                },
                {
                    title: "24H量",
					key: 'q_count',
                    slot: ""
                },
                {
                    title: "24H成交额",
					key: 'q_amount',
                    slot: "deal"
                },
			],
			contractData: [],
			rankingData: [],
			collectionData: [],

		}
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url"]),
	},
	//页面初始化
	mounted(){
		//this.mapMutationsId();
		this.OnHomePageDistrict();
		this.OnUserCollectionData();
	},

	//监听click方法
	methods: {
		//传
		...mapMutations("localSession", ['handleUserName', 'handleOtcKK']),
		mapMutationsId() {
			// let id = this.HouseName;
			// this.handleUserName(id);
		},
		// 行情跳转 K线
		showRowDateClick(data) {
			let typeId = data.q_dc_type_l;
			let market = data.q_market;
			//截取  
			let mk = data.q_market.lastIndexOf('/'); //返回字符串索引值
			let num = data.q_market.substring(0, mk);
			
			let list = {
				//id: data.dc_type_id,
				id: typeId,
				name: num,
				q_market: data.market
			}
			this.handleOtcKK(list);
			this.$router.push({path:'/exchange'});

			//console.log(data);
			
		},
		// 行情列表
		OnHomePageDistrict() {
			axios.post('', {
				"func": "home.market.getMarket",
				"data": {},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					let dataList = res.data.data.date;
					this.contractData = dataList;

					//涨幅榜
					for (let index = 0; index < dataList.length; index++) {
						if (dataList[index].change >= 0) {
							this.rankingData.push(dataList[index]);
							this.rankingData.sort(this.OnCompare('change'))
							//console.log(dataList[index]);
						}
					}					
					
				}
				//console.log(res);
			})
			.catch( res => {console.log(res);})
		},
		//otc涨幅排序
		OnCompare(property){
			return function(a,b){
				var value1 = a[property];
				var value2 = b[property];
				return value2 - value1;
			}
			
		},
		//usdt切换
		changeNav(index) {
			if(index == 1){
				this.flagIndex = 1;
			} else if(index == 2){
				this.flagIndex = 2;
			} else if(index == 3){
				this.flagIndex = 3
			}
		},
		//otc点击收藏
		showCollectionName(data) {
			let user_collection_name = data.q_market;
			axios.post('', {
				"func": "app.collection.findUserCollectionByName",
				"data": {
					"user_collection_name": user_collection_name,
				},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					this.$Message.success({
						content: res.data.data.date,
						duration: 3,
						onClose: () => {
						}
					});
					
				} else {
					this.$Message.error({
						content: res.data.data.msg + ', 请重新登录',
						duration: 3,
						onClose: () => {
						}
					});
				}
				//console.log(res);
			})
			.catch( res => {console.log(res);})
			
		},
		//otc收藏列表
		OnUserCollectionData() {
			axios.post('', {
				"func": "app.collection.findUserCollectionByUserIdAndNameList",
				"data": {
					"pagNumber": 0,
					"pagSize": 30,
					"sumPage": 0
				}
			})
			.then( res => {
				//console.log(res);
				if (res.data.data.type == 200) {
					let dataList = res.data.data.date.date;
					this.collectionData = dataList;

				} else {
					console.log("错误");
				}
			})
			.catch( res => {console.log(res);})
		},
		//移除收藏
		showCollectionDelete(data) {
			
		},
		//搜索栏
		OnSearchClick() {
			//alert('11');
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


.market {
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
