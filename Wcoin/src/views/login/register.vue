<template>
	<div class="login">
		<m-nav
			v-bind:navList="navList"
		>
		</m-nav>
		<div class="m-logo-box">
			<m-login
				:fromDatas='loginDatas'
				@showCityName="OnUserLoginClick"
			>
			</m-login>
		</div>
		
		<Spin size="large" fix v-if="loading"></Spin>
	</div>
</template>

<script>
import crypto from 'crypto'
import NavBar from "@/components/NavBar"
import loginAndRegister from "@/components/loginAndRegister/loginAndRegister"

import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'

export default {
	name: "",
	//组件
	components: {
		'm-nav': NavBar,
		'm-login': loginAndRegister,
	},
	//接收父组件传参
	data() {
		return {
			navList: [
				{
					name: '行情',
					herf: "/renting"
				},
				{
					name: '币币交易',
					herf: "/exchange"
				},
				{
					name: 'OTC',
					herf: "/industry"
				},
				{
					name: 'IEO',
                    herf: "/ieoinfo",
				},
			],
			loginDatas: {
				title: 'Wcoin',
				checkbox: true,
				isLogin: false,
				text: '立即注册',
				registerTabArr: [
					{
						
						title: '手机注册',
						registerInpArr: [
							{
								type: 'text',
								name: '请输入您的手机号',
								imgs: 'ios-contact',
								lenght: 11,
								value: '',
							},
							{
								type: 'number',
								name: '请输入验证码',
								imgs: 'md-checkbox',
								lenght: 6,
        						isLogin: true,
								value: '',
							},
							{
								type: 'password',
								name: '请输入登录密码',
								imgs: 'ios-lock',
								lenght: 18,
								value: '',
							},
							{
								type: 'password',
								name: '请输入6位交易密码',
								imgs: 'logo-usd',
								lenght: 6,
								value: '',
							},
							{
								type: 'text',
								name: '请输入邀请码',
								imgs: 'md-share',
								lenght: 6,
								value: '',
							}
						],
					},
					{
						
						title: '邮箱注册',
						registerInpArr: [
							{
								type: 'text',
								name: '请输入您的邮箱',
								imgs: 'ios-mail',
								lenght: 18,
								value: '',
							},
							{
								type: 'number',
								name: '请输入验证码',
								imgs: 'md-checkbox',
        						isLogin: true,
								lenght: 6,
								value: '',
							},
							{
								type: 'password',
								name: '请输入登录密码',
								imgs: 'ios-lock',
								lenght: 18,
								value: '',
							},
							{
								type: 'password',
								name: '请输入6位交易密码',
								imgs: 'logo-usd',
								lenght: 6,
								value: '',
							},
							{
								type: 'number',
								name: '请输入邀请码',
								imgs: 'md-share',
								lenght: 6,
								value: '',
							}
						],
					},
				],
			},

			loading: false,
		}
	},
	//页面初始化
	mounted(){
		
	},
	//监听click方法
	methods: {
		//接收子组件传值
		OnUserLoginClick(data, title) {
			if (title === '手机注册') {
				let pws = data.pws;
				let jymoney = data.jymoney;
				//密码加密
				let md5 = crypto.createHash('md5');
				md5.update(pws);
				let md5Pws = md5.digest('hex');
				
				let md5s = crypto.createHash('md5');
				md5s.update(jymoney);
				let md5Money = md5s.digest('hex');

				axios.post('', {
					"func": "user.instr.nstrUser",
					"data": {
						"user_mail": '',
						"user_phone": data.iphone,
						"user_password": md5Pws,
						"user_pay_password": md5Money,
						"user_account_extra": data.code,
						"user_extra": data.yqshare,
					},
				})
				.then( res => {
					this.loading = true;
					if (res.data.data.type == 200) {
						this.$Message.success({
							content: '注册成功，正在为您跳转',
							duration: 3,
							onClose: () => {
								this.loading = false;
								this.$router.push({path: '/login'})
							}
						});
					} else {
						this.$Message.error({
							content: res.data.data.msg,
							duration: 3,
							onClose: () => {
								this.loading = false;
							}
						});
					}
					//console.log(res);
				})
				.catch( res => {console.log('失败: ' + res.data.code);})

			}

			if (title === '邮箱注册') {
				//密码加密
				let md5 = crypto.createHash('md5');
				md5.update(data.pws);
				let md5Pws = md5.digest('hex');
				
				let md5s = crypto.createHash('md5');
				md5s.update(data.jymoney);
				let md5Money = md5s.digest('hex');

				axios.post('', {
					"func": "user.instr.nstrUser",
					"data": {
						"user_mail": data.iphone,
						"user_phone": '',
						"user_password": md5Pws,
						"user_pay_password": md5Money,
						"user_account_extra": data.code,
						"user_extra": data.yqshare,
					},
				})
				.then( res => {
					this.loading = true;
					if (res.data.data.type == 200) {
						this.$Message.success({
							content: '注册成功，正在为您跳转',
							duration: 3,
							onClose: () => {
								this.loading = false;
								this.$router.push({path: '/login'})
							}
						});
					} else {
						this.$Message.error({
							content: res.data.data.msg,
							duration: 3,
							onClose: () => {
								this.loading = false;
							}
						});
					}
					//console.log(res);
				})
				.catch( res => {console.log('失败: ' + res.data.code);})

			} 
			
			//console.log(data);
		}
	},
	
}
</script>

<style lang="scss" scoped>
@import "../../style/login.scss";
.login {
	position: relative;
	min-height: 91.7vh;
	background-color: $color-important;
	.m-logo-box {
		@include ct;
	}
}
</style>
