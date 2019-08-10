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

import axios from '../../common/api/http.js'
import local from '../../common/api/localSession.js'

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
				isLogin: false,
				text: '立即修改',
				registerTabArr: [
					{
						
						title: '重置密码',
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
        						isLogin: true,
								lenght: 6,
								value: '',
							},
							{
								type: 'password',
								name: '请输入新登录密码',
								imgs: 'ios-lock',
								value: '',
							},
							{
								type: 'password',
								name: '请确认新登录密码',
								imgs: 'ios-lock',
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
			//console.log(data);
			if (title === '手机') {
				let pws = data.pws;
				//密码加密
				let md5 = crypto.createHash('md5');
				md5.update(pws);
				let md5Pws = md5.digest('hex');

				axios.post('', {
					"func": "user.password.update.loginBySMSCode",
					"data": {
						"user_phone": data.iphone,
						"new_password": md5Pws,
						"send_SMS": data.code,
					},
				})
				.then( res => {
					this.loading = true;
					if (res.data.data.type == 200) {
						this.$Message.success({
							content: '修改成功，正在为您跳转',
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
				.catch( res => {console.log('失败')})

			}

			if (title === '邮箱') {
				//密码加密
				let md5 = crypto.createHash('md5');
				md5.update(data.pws);
				let md5Pws = md5.digest('hex');

				axios.post('', {
					"func": "user.password.update.loginBySMSCode",
					"data": {
						"user_mail": data.iphone,
						"new_password": md5Pws,
						"send_SMS": data.code,
					},
				})
				.then( res => {
					this.loading = true;
					if (res.data.data.type == 200) {
						this.$Message.success({
							content: '修改成功，正在为您跳转',
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
				.catch( res => {console.log('失败')})

			} 
			
			//console.log(data);
		},
		//判断登录
		toLoading () {
			let userPhone = this.formItem.userphone;
            let userPassword = this.formItem.userpassword;
			let userCheckbox = this.formItem.checkbox;

			//密码加密
			let md5 = crypto.createHash('md5');
			md5.update(userPassword);
			let md5password = md5.digest('hex');
			
			let myReg = myreg.test(userPhone); //手机
			//alert(this.userId)
			
			if (userPhone === "" && userPassword === "") {
				this.$Message.info({
					content: '登录信息有误！',
					duration: 3
				});
			} else if (!myReg) {
				this.$Message.info({
					content: '手机号码格式不正确',
					duration: 3
				});
				return false
				
			} else if (userPassword === "") {
				this.$Message.info({
					content: '请输入您的登录密码',
					duration: 3
				});
				return false
			} else if (/[^A-z0-9]/.test(userPassword)) {
				this.$Message.info({
					content: '请勿输入特殊字符',
					duration: 3
				});
				return false
			} else if (userCheckbox !== true) {
				this.$Message.info({
					content: '请勾选拍居客服务协议',
					duration: 3
				});
				return false
			} else {
				//手机获取验证码
				axios.post('pcUser/loginByPhone', {
					"phone": userPhone,
					"loginPassword": md5password,
				})
				.then( res => {
					this.spinShow = true;
					if (res.data.code == 200) {
						
						this.$Message.info({
							content: '登录成功，正在为您跳转...',
							duration: 2,
							onClose: () => {
								this.spinShow = false;
								this.$router.replace({path:'/'})
							}
						});
						// setTimeout(() => {
						// }, 1000);  
						//console.log(res);
						
					} else {
						this.$Message.info({
							content: res.data.msg,
							duration: 2
						});
						this.spinShow = false;
						//console.log(res);
						console.log('失败了');
					}
				}) 
				.catch( res => {
					console.log('请求出错了');
				})
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
