<template>
<div class="home">
	<m-container v-bind:navList="navList" />
	<div class="m-container">
		<div class="m-banner-hd">
			<img src="@/assets/img/hk/banner.png" alt="banner.png" class="img">
			<!-- <img :src="global_url + 'banner.png'" alt="banner.png" class="img"> -->
		</div>
		<div class="m-search-box">
			<Row type="flex" justify="center" align="middle" class="code-row-bg">
				<Col span="3" offset="1">
					<div class="search-list">
						<div class="search-list-lf">
							<p>闪电交易 一键买币</p>
						</div>
					</div>
				</Col>
				<Col span="10" offset="1">
					<div class="search-list">
						<div class="search-list-bd">
							<Input type="number" v-model="searchUSDT" placeholder="请输入购买总金额">
								<span slot="append">CNY</span>
							</Input>
						</div>
						<div class="search-list-rg">
							<Select v-model="model1" class="list-select" >
								<Avatar :src="global_url + 'icon-usdt.png'" slot="prefix" size="small" />
								<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
							</Select>
							<Button type="success" class="list-btn" @click="OnCurrencyClick">一键买币</Button>
						</div>
					</div>
				</Col>
			</Row>

		</div>
		<!-- 币种类型 -->
		<div class="m-conainer-row"  style="position: relative;">
			<Row type="flex" justify="center" align="middle" class="code-row-bg">
				<Col span="4" v-for="(item, i) in coinsPriceArr" :key="i">
					<div class="text-currency-price">
						<h3 class="font-h3">
							<span>{{item.q_market}}</span>
							<span :style="{color: (item.change >= 0 ? 'green' : 'red')}">
								{{item.change >= 0 ? `+${item.change}%` : `${item.change}%`}}
							</span>
						</h3>
						<h2 class="font-h2">
							{{item.price}}
							<span>≈ {{item.price_rmb}} CNY</span> 
						</h2>
						<h4 class="font-h4"> 24H 量 {{item.q_count}}</h4>
					</div>
				</Col>
				<Spin fix v-if="loadingIns"></Spin>
			</Row>
		</div>
		<div class="m-conainer-text">
			<h2 class="font-h2">WCOIN 全球站，全球领先的比特币虚拟货币金融服务商</h2>
			<h4 class="font-h4">为全球超过130个国家的数百万用户提供安全、可信赖的数字资产交易及资产管理服务</h4>
		</div>

	</div>
</div>
</template>

<script>
import axios from '@/common/api/http.js'
import NavBar from "@/components/NavBar"

import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
	name: "",
	//组件
	components: {
		'm-container': NavBar,
	},
	//接收父组件传参
	props: {},
	data() {
		return {
			loadingIns: false,

			navList: [
				{
					name: '行情',
					herf: "/market"
				},
				{
					name: '币币交易',
					herf: "/exchange"
				},
				{
					name: 'OTC',
					herf: "/apartment"
				},
				{
					name: 'IEO',
                    herf: "/ieoinfo",
				},
			],
			coinsPriceArr: [],
			searchUSDT: '',
			model1: 'USDT',
			cityList: [
				{
					value: 'USDT',
				},
			],
		}
	},
	computed: {
		//取
		...mapGetters("localSession", [ "global_url",]),
	},
	//页面初始化
	mounted(){
		this.OnHomePageDistrict();

	},
	//实时监听
	watch: {
		'uglobal_url': {
			handler: function(newer, older) {
				if (newer == null) {
					return
				} else {
					//this.getList(); // methods中定义好的获取数据列表的方法
					//alert(newer)
				}
			},
	　　　　deep: true
		},
	},
	//监听click方法
	methods: {
		//传
		...mapMutations("localSession", [
			'handleUserSession', ]),

		OnHomePageDistrict() {
			this.loadingIns = true;
			axios.post('', {
				"func": "home.market.getMarket",
				"data": {},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					let coinsPriceArr = res.data.data.date;
					this.coinsPriceArr = coinsPriceArr.slice(0, 4); //截取前四个

					this.loadingIns = false;
					for (let index = 0; index < coinsPriceArr.length; index++) {
						//this.coinsPriceArr = coinsPriceArr[index];
					}
				} else {this.loadingIns = false;}
				//console.log(res);
			})
			.catch( res => {this.loadingIns = false; console.log('失败'); console.log(res);})
		},
		// 购买
		OnCurrencyClick() {
			let searchUsdt = this.searchUSDT;
			let searchModel = this.model1;
			if (searchUsdt === '') {
				this.$Message.info({
					content: '请输入购买金额',
					duration: 3
				});
			} else {
				//跳转otc
				this.$router.push({path: '/apartment'});
			}
		},
		
	},
	//页面离开时
	destroyed: function () {
        //console.log("我已经离开了！");
	},
	
}
</script>

<style lang="scss" scoped>
/deep/.ivu-select-visible {
	.ivu-select-selection {
		box-shadow: initial !important;
		border-color: transparent !important;
	}
}
/deep/.ivu-select-single .ivu-select-selection:hover {border-color: transparent !important;}
/deep/.ivu-avatar>img {
	width: auto;
	height: auto;
	padding-bottom: 4px;
	vertical-align: middle;
}
/deep/.ivu-spin-fix {background-color: transparent;}
// ---------------------------------------下拉选择、购买按钮------------------------------------------------------------------- //


.home {
	.m-container {
		padding-top: 70px;
		background-color: $color-important;
		.m-banner-hd {
			width: 100%;
			min-height: 410px;
			line-height: 0;
			.img {
				width: 100%;
				height: initial;
			}
		}
		.m-search-box {
			padding: 30px 0;
			border-bottom: 1px solid #20204b;
			.search-list {
				.search-list-lf {
					text-align: center;
					font-size: 16px;
					color: #fff;
				}
				.search-list-bd, .search-list-rg {
					display: inline-block;
					vertical-align: middle;
					padding: 0 5px;
				}
				.search-list-bd {
					width: 320px;
				}
				.search-list-rg {
					.list-select, .list-btn {
						display: inline-block;
						vertical-align: middle;
						width: 100px;
						margin: 0 5px;
					}
					.list-btn {
						background-color: $color-body-c !important;
						border-color: $color-body-c !important;
						&:hover {opacity: .9;}
					}
				}
					
			}
		}
		// 币种类型
		.m-conainer-row {
			min-height: 170px;
			padding: 20px 0;
			color: $color-common;
			.ivu-col-span-4:nth-child(1) .text-currency-price {border-left: 1px solid #20204b;}
			.text-currency-price {
				padding: 0 30px;
				border-right: 1px solid #20204b;
				.font-h3 {
					font-size: $font-size-sm;
					span {
						display: inline-block;
						vertical-align: middle;
						&:nth-child(1) {min-width: 200px; font-size: $font-size-md;}
					}
				}
				.font-h2 {
					padding: 5px 0;
					font-size: $font-size-mds;
					font-weight: bold;
					color: #d2d6ec;
					span {
						display: block;
						padding: 5px 0;
						font-size: $font-size-sm;
						font-weight: initial;
						color: #7b8eb5;
					}
				}
				.font-h4 {
					color: #61698a;
				}
			}
		}
		.m-conainer-text {
			padding: 60px 0;
			text-align: center;
			background-color: #fff;
			.font-h2 {padding-bottom: 15px; font-size: 2.167rem; font-weight: bold; color: $color-important;}
			.font-h4 {color: #a6aeb8;}
		}
	}
}




@media only screen and (max-width: 480px) {
}
</style>
