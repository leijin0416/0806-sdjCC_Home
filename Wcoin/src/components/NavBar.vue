<template>
	<div class="nav">
		<div class="nav-content">
			<div class="container-wd">
				<Row>
					<Col :xs="22" :md="22" :lg="22" offset="1">
						<div class="logo-box">
							<router-link tag="a" to="/">
								<img class="img" src="@/assets/img/hk/logo.png" alt="logo.png">
							</router-link>
						</div>
						<ul class="m-navbar-list">
							<!-- 导航栏 -->
							<li v-for="(item , index) in navList" 
								:index="index" 
								:key="index" 
								:class="[
									{onactive : item.id === 1}
								]"
							>
								<router-link tag="a" :to="item.herf">
									<a class="navbar-item" > {{item.name}} </a>
								</router-link>
							</li>
						</ul>
						<!--  个人登录 -->
						<ul class="nav-login-r">
							<li v-if="seesionCode !== '0'">
								<router-link tag="a" class="login pad-right-sm" to="/login">
									<span>登录</span>
								</router-link>
								<router-link tag="a" class="login pad-right-sm" to="/register">
									<span>注册</span>
								</router-link>
							</li>
							<!-- 个人下拉 -->
							<li v-else>
								<div class="m-dropdowns-box">
									<Dropdown trigger="click" placement="left-start" style="margin-left: 20px" >
										<Icon type="ios-contact" size="20" />
										<span class="span">
											个人中心
										</span>
										<DropdownMenu slot="list" class="switch-list">
											<DropdownItem class="router-link-active"
												v-for="(item, i) in navCoreList" 
												:key="i">
												<router-link tag="a" class="login" :to="item.herf">
													<span>{{item.name}}</span>
													<Icon type="ios-arrow-forward" size="16" />
												</router-link>
											</DropdownItem>
											<DropdownItem class="router-link-active" >
												<div class="login" @click="onUserOutClick">
													<span>退出登录</span>
													<Icon type="ios-arrow-forward" size="16" />
												</div>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</div>
								<router-link tag="a" class="m-notice" to="/notice">
									<Icon type="md-notifications" />
									<span>公告</span>
								</router-link>
							</li>
							<li>

								<div class="m-dropdowns-box">
									<Dropdown trigger="click" placement="left-start" style="margin-left: 20px">
										<span class="span">
											切换语言
										</span>
										<Icon type="ios-arrow-down" size="20" />
										<DropdownMenu slot="list" class="switch-list">
											<DropdownItem class="router-link-active">
												<div class="login">
													<span>简体中文</span>
													<Icon type="ios-arrow-forward" size="16" />
												</div>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</div>
							</li>
						</ul>
					</Col>
				</Row>
				
			</div>
		</div>
	</div>
</template>

<script>
import axios from '../common/api/http.js'

import local from '../common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
	
export default {
	name: "",
	//组件
	components: {
	},
	//接收父组件传参
	props: {
		"navList": null,
		// "searchId": null,
	},
	data() {
		return {
			seesionCode: '',
			// 个人中心：
			navCoreList: [
				{
					name: '账号认证',
					herf: '/primary'
				},
				{
					name: '安全中心',
					herf: '/security'
				},
				{
					name: '我的资产',
					herf: '/assets'
				},
				{
					name: '收款方式',
					herf: '/collect'
				},
				{
					name: '我的邀请',
					herf: '/invite'
				},
				{
					name: '建议反馈',
					herf: '/feedback'
				},
				{
					name: '在线客服',
					herf: '/service'
				},
			],
			
			userName: '',
			userImg: '',
		}
	},
	//实时监听
	watch: {
		'user_SessionId': {
			handler: function(newer, older) {
				if (newer == null) {
					return
				} else {
					this.getUserSession(); // methods中定义好的获取数据列表的方法
					//alert(newer)
				}
			},
	　　　　deep: true
		},
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url", "user_SessionId"]),
	},
	//页面初始化
	mounted(){
		let seesionCode = local.get('user_SessionId');
		this.seesionCode = seesionCode;

		this.OnUserSessionId();
		//console.log(seesionCode);
		
	},
	//监听click方法
	methods: {
		//传
		...mapMutations("localSession", ['handleUserSession']),

		// 监听后台返回的seesion
		OnUserSessionId() {   
			let seesionId = sessionStorage.getItem('seesion'); 
			if (seesionId === '') {

			}
			
		},

		getUserSession() {
			let seesionCode = local.get('user_SessionId');  //login时存的值
			this.seesionCode = seesionCode;
		},

		//用户登出
		onUserOutClick() {
			// this.handleUserSession('1');
			axios.post('', {
				"func": "user.login.logout",
				"data": {},
			})
			.then( res => {
				this.loading = true;
				if (res.data.data.type == 200) {
					this.$Message.success({
						content: '您已成功退出登录',
						duration: 2,
						onClose: () => {
							this.$router.push({path: '/'});
							this.handleUserSession('1');
						}
					});
				} else {
					this.$Message.error({
						content: res.data.data.msg,
						duration: 2,
						onClose: () => {
						}
					});
				}
				//console.log(res);
			})
			.catch( res => {console.log('失败');})
		},
	},
	//页面离开时
	destroyed: function () {
		//console.log("我已经离开了！");
	},
	
}
</script>

<style lang="scss" scoped>
/deep/.ivu-dropdown-rel {
	.ivu-icon {color: #7b8eb5;}
	&:hover {
		.ivu-icon {color: $color-body-c;}
	}
}
.nav {
	position: relative;
	// 导航栏
	.nav-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		box-shadow: 0 2px 6px rgba(0, 0, 0, .6);
		background-color: $color-important;
	}
	.container-wd {
		//垂直居中
		.logo-box,.nav-login-r {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		//logo
		.logo-box {
			left: 0;
			width: 42px;
			box-sizing: content-box;
			padding-left: 1.25rem;
			overflow: hidden;
			line-height: 0;
			.img {
				width: 100%;
			}
		}
		//contnet内容
		.m-navbar-list {
			padding-left: 80px;
			font-size: 0;
			li {
				display: inline-block;
				padding: 0 2rem;
				vertical-align: middle;
				a {font-size: $font-size-base;}
			}
			//导航栏
			.navbar-item {
				position: relative;
				display: block;
				padding: 2rem 0;
				color: #727b95;
				&::before {
					content: ' ';
					position: absolute;
					bottom: 0;
					left: 50%;
					display: block;
					width: 0;
					height: 2px;
					background: $color-body-c;
					transform: translateX(-50%);
					transition: all .3s linear;
				}
				&:hover {
					color: $color-body-c;
				}
				&:hover::before {
					width: 75%;
				}
			}
			.dropdowns {
				position: relative;
				font-size: $font-size-base;
				color: $color-white;
			}
			.onactive a, 
			.onactive_s:nth-child(2) a,
			.onactive_z:nth-child(3) a,
			.onactive_x:nth-child(4) a,
			.onactive_g:nth-child(5) a,
			.onactive_g:nth-child(6) a {
				color: $color-body-c;
				&::before {width: 75%;}
			}
		}
		//个人登录
		.nav-login-r {
			right: 0;
			li:last-child {
				/deep/.ivu-dropdown-rel {border-right: none;}
			}
			> li {
				display: inline-block;
				vertical-align: middle;
				line-height: 1;
				/deep/.ivu-dropdown-rel {border-right: 1px solid $color-common;}
				a {
					font-size: $font-size-base;
					color: #727b95;
					&:hover {color: $color-body-c;}
				}
				.m-dropdowns-box {
					display: inline-block;
					margin-right: 0.833rem;
					vertical-align: middle;
					text-align: center;
					.ivu-dropdown {margin: 0!important;}
					.span {
						min-width: 7.333rem;
						overflow: hidden;
						white-space: nowrap;
						&::after {top: .4rem;}
					}
					.switch-list {z-index: 999;top: 3.3rem;}
				}
				.login-c {
					display: inline-block;
					min-width: 86px;
					min-height: 38px;
					padding: 1rem 1.25rem;
					vertical-align: middle;
					font-size: $font-size-sm;
					border-radius: 0.5rem;
					box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
					color: $color-white;
					background-color: $color-body-c;
					
					span {color: $color-white;}
					&:hover {box-shadow: 0 2px 6px rgba(0, 0, 0, .3); color: #fff;}
				}
				.m-notice {
					display: inline-block;
					vertical-align: middle;
					padding: 2px 15px 2px 10px;
					border-right: 1px solid $color-common;
					font-size: $font-size-base;
					color: #727b95;
					span {
						display: inline-block;
						min-width: 50px;
						text-align: center;
					}
				}
			}
		}
		//个人 PC下拉菜单
		.m-dropdowns-box {
			position: relative;
			min-width: 8.333rem;
			.span {
				cursor: pointer;
				position: relative;
				display: inline-block;
				vertical-align: middle;
				font-size: $font-size-base;
				color: #727b95;
				&:hover {color: $color-body-c;}
			}
			.switch-list {
				position: absolute;
				top: 3.6rem;
				min-width: 10rem;
				padding: 0 2rem;
				text-align: center;
				border-radius: 5px;
				box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
				background-color: #fff;
				// 退出登录
				.router-link-active {
					width: 100%;
					padding: 0;
					border-bottom: 1px solid #eee;
					span {
						display: inline-block;
						padding: 1rem 0;
						vertical-align: middle;
						font-size: $font-size-sm;
						&:hover {
							color: $color-body-c;
						}
					}
					&:last-child {
						border-bottom: 0;
					}
					&:hover {
						background-color: transparent;
					}
				}
			}
		}
	}
	
}

//小于1024
@media only screen and (max-width: 1024px) {

}
</style>
