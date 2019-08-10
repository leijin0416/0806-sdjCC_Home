<template>
<!-- 行情 -->
<div class="home">
	<m-nav v-bind:navList="navList" />
	<div class="m-container">
		<Menu mode="horizontal" active-name="1">
			<MenuItem name="1" to="/market">
				币币
			</MenuItem>
			<!-- <MenuItem name="2" to="/contract">
				合约
			</MenuItem> -->
		</Menu>
		<div class="m-container-bd">
			<router-view></router-view>
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
		'm-nav': NavBar,
	},
	//接收父组件传参
	props: {},
	data() {
		return {

			navList: [
				{
					name: '行情',
					herf: "/market",
					id: 1,
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

			searchUSDT: '',
			model1: 'USDT',
			cityList: [
				{
					value: 'USDT',
				},
				{
					value: 'ETH',
				},
			],
		}
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url"]),
	},
	//页面初始化
	mounted(){
		
	},
	//实时监听
	watch: {
		'global_url': {
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
		...mapMutations("localSession", ['handleUserName']),
		mapMutationsId() {
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
			}
		},
	},
	//页面离开时
	destroyed: function () {
		local.remove('user_Region');
		local.remove('user_Place');
		local.remove('user_Pices');
		local.remove('user_Search');
        //console.log("我已经离开了！");
	},
	
}
</script>

<style lang="scss" scoped>
/deep/.ivu-menu-light {
	padding: 0 30px;
	background-color: transparent !important;
}
/deep/.ivu-menu-light.ivu-menu-horizontal {
	&::after {opacity: 0;}
	.ivu-menu-item-active, .ivu-menu-item:hover {color: $color-body-c !important; border-color: #f8f9fe !important;}
	.ivu-menu-item-active {font-weight: bold;}
}
/deep/.ivu-menu-item {font-size: $font-size-base; }
/deep/.ivu-menu-item>i {
    margin-right: 0;
}
// ---------------------------------------下拉选择、购买按钮------------------------------------------------------------------- //


.home {
	.m-container {
		padding-top: 80px;
		background-color: #f8f9fe;
		.m-container-bd {padding: 0 30px 30px;}
	}
}




@media only screen and (max-width: 480px) {
}
</style>
