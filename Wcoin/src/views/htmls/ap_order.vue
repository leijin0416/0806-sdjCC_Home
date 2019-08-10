<template>
<!-- OTC-tab -->
<div class="page">
	<m-nav v-bind:navList="navList" />
	<div class="m-container">
		<div class="container-otc">
            <h2 class="order-title">交易订单</h2>
            <div class="m-tabs-box">
                <div class="m-tabs-hd">
                    <p 
                        :class="{active : flagIndexOtc == index}" 
                        v-for="(item, index) in otcNameList"
                        :key="index"
                        @click="OnChangeOtc(item, index)">{{item}}</p>
                    <div class="m-balance-otc">
                        <div class="balance-otc-lf">
                        </div>
                        <div class="balance-otc-rg">
                        </div>
                    </div>
                </div>
                <div class="m-order-table">
                    <m-table 
                        :columns="freeColumns"
                        :data="freeData"
						@showOldersName="showOldersName" />
                </div>
				<!-- 分页 -->
				<Page :total="Pagetotal" :page-size="Pagesize" @on-change="changePages" show-total />
            </div>
		</div>
	</div>
	<router-view></router-view>
</div>
</template>

<script>
import axios from '@/common/api/http.js'
import NavBar from "@/components/NavBar"
import ivewTableSlots from "@/components/fromMarketList/ivewTableSlots"

import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { log } from 'util';

export default {
	name: "",
	//组件
	components: {
		'm-nav': NavBar,
		'm-table': ivewTableSlots,
	},
	//接收父组件传参
	props: {},
	data() {
		return {
			sumPage: 0,
			Pages: 1,
			Pagetotal: 1,
			Pagesize: 10,
			historyData: [],

			purchaseOtc: true,

			navList: [
				{
					name: '行情',
					herf: "/market",
				},
				{
					name: '币币交易',
					herf: "/exchange"
				},
				{
					name: 'OTC',
					herf: "/apartment",
					id: 1,
				},
				{
					name: 'IEO',
                    herf: "/ieoinfo",
				},
			],

			contract: false,
			flagIndexOtc: 0,
			otcNameList: ['未完成', '已完成', '已取消',],

			//购买表格
            freeColumns: [
                {
                    title: "时间",
                    key: 'au_create_time',
                    slot: ""
                },
                {
                    title: "数量",
                    key: 'otc_tran_num',
                    slot: "dollar"
                },
                {
                    title: "单价",
                    key: 'otc_tran_unit_price',
                    slot: "highPrice"
                },
                {
                    title: "金额",
                    key: 'otc_tran_amount',
                    slot: "highPrice"
                },
                {
                    title: "状态",
                    key: 'status',
                    slot: "status"
                },
                {
                    title: "查看详情",
                    key: 'oldercancel',
                    slot: "oldercancel"
                },
            ],
            freeData: [],
			codeTypeId: 2,  //状态
		}
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url"]),
	},
	//页面初始化
	mounted(){
		//this.mapMutationsId();
		this.OnCurrencyList();     //订单列表
	},
	//监听click方法
	methods: {
		//传
		...mapMutations("localSession", ['handleOtcTransactionInfo']),
		mapMutationsId() {
			// let id = this.HouseName;
			// this.handleUserName(id);
		},
		// 切换 
		OnChangeOtc(data, index) {
			//console.log(data);
			this.flagIndexOtc = index;
			if (data === '已完成') {
				this.codeTypeId = 1;
				this.OnCurrencyList();
			} else if (data === '未完成') {
				this.codeTypeId = 2;
				this.OnCurrencyList();
			} else {
				this.codeTypeId = 3;
				this.OnCurrencyList();
			}
		},
		// 判断各个付款状态
		OnCurrencyList() {
			let codeTypeId = this.codeTypeId;
			axios.post('', {
				"func": "app.currency.findOtcTransactionList",
				"data": {
					"pagNumber": this.Pages,
					"pagSize": this.Pagesize,
					"sumPage": this.sumPage,
					"codeType": codeTypeId,
				},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					let otcList = res.data.data.date.date;
					this.freeData = otcList;
					
					otcList.forEach( (item, i, arr) => {
						let sell_type = arr[i].sell_type;		//类型： 买入 、 卖出
						let orderStatus = arr[i].orderStatus;	//类型： 用户、售卖者
						let otc_audit_status = arr[i].otc_audit_status; 	//5种审核
						let otc_tran_status = arr[i].otc_tran_status;		//5种创建

						if (sell_type == 1 && orderStatus == 0) {
							if (otc_tran_status == 2 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "待支付";
								otcList[i].orderBtnName = "确认支付";
								otcList[i].orderBtnNameDel = "取消订单";
								//console.log(otcList[i]);
								return
							} else if (otc_tran_status == 3 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "待放行";
								otcList[i].orderBtnName = null;
								return
							} else if (otc_tran_status == 4 && (otc_audit_status == 1 || otc_audit_status == 2)) {
								otcList[i].orderStatusName = "后台审核中";
								otcList[i].orderBtnName = "后台审核中";
								return
							} else if (otc_tran_status == 4 && otc_audit_status == 3) {
								otcList[i].orderStatusName = "后台审核成功";
								otcList[i].orderBtnName = "审核成功";
								return
							} else if (otc_tran_status == 4 && otc_audit_status == 4) {
								otcList[i].orderStatusName = "后台审核失败";
								otcList[i].orderBtnName = "审核失败";
								return
							} else if (otc_tran_status == 8 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "重新支付";
								otcList[i].orderBtnName = "重新确认支付";
								otcList[i].orderBtnNameDel = "平台述讼";
								return
							} else if (otc_tran_status == 5 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "已支付";
								otcList[i].orderBtnName = null;
								return
							} else if (otc_tran_status == 7)  {
								otcList[i].orderStatusName = "已取消";
								otcList[i].orderBtnName = "已取消";
								return
							}
						} else if (sell_type == 1 && orderStatus == 1) {
							if (otc_tran_status == 2 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "待收款";
								otcList[i].orderBtnName = "等待发布者支付";
								return
							} else if (otc_tran_status == 3 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "待放行";
								otcList[i].orderBtnName = "确认放行";
								otcList[i].orderBtnNameDel = "支付有误(驳回)";
								return
							} else if (otc_tran_status == 4 && (otc_audit_status == 1 || otc_audit_status == 2)) {
								otcList[i].orderStatusName = "后台审核中";
								otcList[i].orderBtnName = "后台审核中";
								return
							} else if (otc_tran_status == 4 && otc_audit_status == 3) {
								otcList[i].orderStatusName = "后台审核成功";
								otcList[i].orderBtnName = "审核成功";
								return
							} else if (otc_tran_status == 4 && otc_audit_status == 4) {
								otcList[i].orderStatusName = "后台审核失败";
								otcList[i].orderBtnName = "审核失败";
								return
							} else if (otc_tran_status == 8 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "等待重新支付";
								otcList[i].orderBtnName = "重新确认支付";
								otcList[i].orderBtnNameDel = "平台述讼";
								return
							} else if (otc_tran_status == 5 && otc_audit_status == 5) {//无任何操作
								otcList[i].orderStatusName = "已支付";
								otcList[i].orderBtnName = null;
								return
							} else if (otc_tran_status == 7) {
								otcList[i].orderStatusName = "已取消";
								otcList[i].orderBtnName = "已取消";
								return
							}
						} else if (sell_type == 2 && orderStatus == 0) {
							if (otc_tran_status == 2 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "待收款";
								otcList[i].orderBtnName = null;
								return
							} else if (otc_tran_status == 3 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "待放行";
								otcList[i].orderBtnName = "确认放行";
								otcList[i].orderBtnNameDel = "支付有误(驳回)";
								return
							} else if (otc_tran_status == 4 && (otc_audit_status == 1 || otc_audit_status == 2)) {
								otcList[i].orderStatusName = "后台审核中";
								otcList[i].orderBtnName = "后台审核中";
								return
							} else if (otc_tran_status == 4 && otc_audit_status == 3) {
								otcList[i].orderStatusName = "后台审核成功";
								otcList[i].orderBtnName = "审核成功";
								return
							} else if (otc_tran_status == 4 && otc_audit_status == 4) {
								otcList[i].orderStatusName = "后台审核失败";
								otcList[i].orderBtnName = "审核失败";
								return
							} else if (otc_tran_status == 8 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "等待重新支付";
								otcList[i].orderBtnName = null;
								return
							} else if (otc_tran_status == 5 && otc_audit_status == 5) {//无任何操作
								otcList[i].orderStatusName = "已支付";
								otcList[i].orderBtnName = null;
								return
							} else if (otc_tran_status == 7) {
								otcList[i].orderStatusName = "已取消";
								otcList[i].orderBtnName = "已取消";
								return
							}
						} else if (orderStatus == 1 && sell_type == 2) {
							if (otc_tran_status == 2 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "待支付";
								otcList[i].orderBtnName = "取消订单";
								otcList[i].orderBtnNameDel = "确认支付";
								return
							} else if (otc_tran_status == 3 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "待放行";
								otcList[i].orderBtnName = null;
								return
							} else if (otc_tran_status == 4 && (otc_audit_status == 1 || otc_audit_status == 2)) {
								otcList[i].orderStatusName = "后台审核中";
								otcList[i].orderBtnName = "后台审核中";
								return
							} else if (otc_tran_status == 4 && otc_audit_status == 3) {
								otcList[i].orderStatusName = "后台审核成功";
								otcList[i].orderBtnName = "审核成功";
								return
							} else if (otc_tran_status == 4 && otc_audit_status == 4) {
								otcList[i].orderStatusName = "后台审核失败";
								otcList[i].orderBtnName = "审核失败";
								return
							} else if (otc_tran_status == 8 && otc_audit_status == 5) {
								otcList[i].orderStatusName = "重新支付";
								otcList[i].orderBtnName = "平台述讼";
								otcList[i].orderBtnNameDel = "重新确认支付";
								return
							} else if (otc_tran_status == 5 && otc_audit_status == 5) {//无任何操作
								otcList[i].orderStatusName = "已支付";
								otcList[i].orderBtnName = null;
								return
							} else if (otc_tran_status == 7) {
								otcList[i].orderStatusName = "已取消";
								return
							}
						}

					});

				} else {
					this.$Message.info({
						content: '检测登录信息已过期',
						duration: 3
					});
				}
				//console.log(res);
			})
			.catch( res => {console.log(res);})

		},
		changePages(index) {
			this.Pages = index-1;
			this.OnCurrencyList();
		},
		//详情
		showOldersName(data) {
			let id = data.sell_type;
			this.handleOtcTransactionInfo(data);
			this.$router.push({path:'/details', query: {payid: id}});
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
/deep/.ivu-tabs-bar {
	position: relative;
	.m-order-box {
		@include tb;
		right: 0;
		font-size: $font-size-sm;
	}
}

// --------------------------------------- ivew ------------------------------------------------------------------- //


.page {
	background-color: #f8f9fe;
	.m-container {
		min-height: 800px;
		padding: 100px 30px 30px;
        .order-title {
            padding: 25px 0 20px;
            font-size: $font-size-base;
            font-weight: bold;
        }
		.container-otc {min-height: 800px;padding: 0 30px 30px;background-color: #fff;}
		.m-tabs-box {
			.m-tabs-hd{
				position: relative;
				.m-balance-otc {
					@include tb;
					right: 0;
					.balance-otc-lf, .balance-otc-rg {
						display: inline-block;
						vertical-align: middle;
						margin: 0 5px 0 20px;
                        font-size: $font-size-sm;
                        font-weight: bold;
					}
				}
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
			.m-otc-purchase {
				padding-top: 30px;
				.m-btn {padding-top: 50px;}
            }
            .m-order-table {min-height: 620px;padding-top: 30px;}
		}
	}
}

</style>
