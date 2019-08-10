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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

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
				isLogin: true,
				text: '立即登录',
				registerTabArr: [
					{
						
						title: '账号登录',
						registerInpArr: [
							{
								type: 'text',
								name: '请输入手机号/邮箱',
								imgs: 'ios-contact',
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
								value: '',
							}
						],
					},
				],
			},
			
			loading: false,
			seesionCode: null,
		}
	},
	//页面初始化
	mounted(){
		let seesionCode = local.get('user_SessionId');
	},
	//监听click方法
	methods: {
		//传
		...mapMutations("localSession", ['handleUserSession']),

		//接收子组件传值
		OnUserLoginClick(data, title) {
			// console.log(title);
			// console.log(data);
			if (title === "手机登录") {
				let pws = data.pws;
				//密码加密
				let md5 = crypto.createHash('md5');
				md5.update(pws);
				let md5Pws = md5.digest('hex');

				this.loading = true;
				axios.post('', {
					"func": "user.login.byPhone",
					"data": {
						"user_phone": data.iphone,
						"user_password": md5Pws,
						"version_code": '1.0.0',
					},
				})
				.then( res => {
					this.loading = true;
					if (res.data.data.type == 200) {
						this.$Message.success({
							content: '登录成功，正在为您跳转',
							duration: 3,
							onClose: () => {
								this.loading = false;
								this.$router.push({path: '/'});
								this.handleUserSession('0');
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
			if (title === "邮箱登录") {
				let pws = data.pws;
				//密码加密
				let md5 = crypto.createHash('md5');
				md5.update(pws);
				let md5Pws = md5.digest('hex');

				this.loading = true;
				axios.post('', {
					"func": "user.login.byMail",
					"data": {
						"user_phone": data.iphone,
						"user_password": md5Pws,
						"version_code": '1.0.0',
					},
				})
				.then( res => {
					this.loading = true;
					if (res.data.data.type == 200) {
						this.$Message.success({
							content: '登录成功，正在为您跳转',
							duration: 3,
							onClose: () => {
								this.loading = false;
								this.$router.push({path: '/'})
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
		},
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
