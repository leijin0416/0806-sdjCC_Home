<template>
	<div class="g-footer-box">
		<div class="container-wd">
			<Row type="flex" justify="center" class="code-row-bg">
				<Col span="3" class="footer-list">
					<div class="footer-box-lf">
						<div class="img-box">
							<img src="@/assets/img/hk/logo.png" alt="logo.png" class="img">
						</div>
						<p>© 2019 Wcoin</p>
						<h2 class="font-h2">
							<a href="/" target="_blank" rel="noopener noreferrer" class="aback">
								<img src="@/assets/img/hk/icon-wb.png" alt="logo.png" class="img">
							</a>
							<a href="https://www.facebook.com/huo.niao.77" target="_blank" rel="noopener noreferrer" class="aback">
								<img src="@/assets/img/hk/icon-facebook.png" alt="logo.png" class="img">
							</a>
							<a href="https://twitter.com/pexphoenix999?s=05" target="_blank" rel="noopener noreferrer" class="aback">
								<img src="@/assets/img/hk/icon-twitter.png" alt="logo.png" class="img">
							</a>
							<a href="/" target="_blank" rel="noopener noreferrer" class="aback">
								<img src="@/assets/img/hk/icon-youtube.png" alt="logo.png" class="img">
							</a>
						</h2>
						<div class="footer-box-rg">
							<h2 class="font-h2">
								<img src="@/assets/img/hk/icon-QR_code.png" alt="app.png" class="img">
								<p>Wcoin客服微信</p>
							</h2>
						</div>
					</div>
				</Col>
				<Col span="9" class="footer-list">
					<div class="footer-box-bd">
						<div class="text-list">
							<h2 class="font-h2">联系我们</h2>
							<ul class="u-list">
								<li>
									<a href="/" target="_blank" rel="noopener noreferrer" class="text">商户合作</a>
								</li>
								<li>
									<a href="/" target="_blank" rel="noopener noreferrer" class="text">上币申请</a>
								</li>
							</ul>
						</div>
						<div class="text-list">
							<h2 class="font-h2">帮助中心</h2>
							<ul class="u-list">
								<li>
									<a href="/" target="_blank" rel="noopener noreferrer" class="text">新手入门</a>
								</li>
								<li>
									<a href="/" target="_blank" rel="noopener noreferrer" class="text">法币OTC交易</a>
								</li>
								<li>
									<a href="/" target="_blank" rel="noopener noreferrer" class="text">币币交易</a>
								</li>
								<li>
									<a href="/" target="_blank" rel="noopener noreferrer" class="text">合约交易</a>
								</li>
							</ul>
						</div>
						<div class="text-list">
							<h2 class="font-h2">关于我们</h2>
							<ul class="u-list">
								<li>
									<router-link tag="a" to="/" class="text" >费率说明</router-link>
								</li>
								<li>
									<router-link tag="a" to="/" class="text" >公司简介</router-link>
								</li>
							</ul>
						</div>
						<div class="text-list">
							<h2 class="font-h2">用户支持</h2>
							<ul class="u-list">
								<li>
									<router-link tag="a" to="/" class="text" >用户协议</router-link>
								</li>
								<li>
									<router-link tag="a" to="/" class="text">免责声明</router-link>
								</li>
							</ul>
						</div>
					</div>
				</Col>
				<Col span="5" class="footer-list">
					<div class="footer-box-rg">
						<h2 class="font-h2">
							<img src="@/assets/img/hk/icon-ios.jpg" alt="app.png" class="img">
							<p>IOS</p>
						</h2>
						<h2 class="font-h2">
							<img src="@/assets/img/hk/icon-az.jpg" alt="app.png" class="img">
							<p>安卓</p>
						</h2>
					</div>
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
	name: "",
	//组件
	components: {
		
	},
	//接收父组件传参
	props: {},
	data() {
		return {
		}
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url"]),
	},
	//页面初始化
	mounted(){},
	//监听click方法
	methods: {
	},
	
}
</script>

<style lang="scss" scoped>
	.g-footer-box {
		padding: 50px 0;
		color: $color-gray;
		background: $color-important;
		.footer-list {
			position: relative;
			color: #aeb2cc;
			a {color: #d2d6ec;}
			.footer-box-lf {
				padding: 0 10px;
				.img-box {
					padding-bottom: 15px;
				}
				.font-h2 {
					padding-top: 15px;
					.aback {
						display: inline-block;
						margin-right: 15px;
						.img {width: 22px;}
					}
				}
				.footer-box-rg .font-h2 {padding: 10px 0;}
			}
			.footer-box-rg {
				padding: 10px 0;
				.font-h2 {
					display: inline-block;
    				padding: 0 40px;
					text-align: center;
					.img {
						display: inline-block;
						width: 100px;
						overflow: hidden;
						line-height: 0;
					}
					p {padding-top: 15px;}
				}
			}
			.footer-box-bd {
				text-align: center;
				.text-list {
					display: inline-block;
					width: 170px;
					vertical-align: top;
					.font-h2 {
						font-size: 16px;
						padding-bottom: 15px;
					}
					ul li {
						padding: 5px;
						.text {
							display: block;
							font-size: 14px;
						}
					}
				}
			}
		}
	}
//小于1024
@media only screen and (max-width: 1440px) {
	.g-footer-box {
		.footer-list {
			.footer-box-lf .footer-box-rg .font-h2{text-align: left;}
			.footer-box-bd .text-list {width: 120px;}
			.footer-box-rg .font-h2 {
				padding: 0 20px 10px;
				width: 140px;
			}
		}
	}
}
</style>
