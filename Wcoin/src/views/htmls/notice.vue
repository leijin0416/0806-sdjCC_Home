<template>
<!-- 公告 -->
	<div class="page">
		<m-nav :navList="navList" />
		<div class="m-container">
			<div class="z_indexs">
				<Row type="flex" justify="center" class="code-row-bg">
					<Col span="19" offset="5">
						<div class="m-notice-title">公告</div>
					</Col>
					<Col span="4">
						<div class="m-notice-lf">
							<div class="notice-list" 
								v-for="(item, index) in noticeList"
								:key="index"
								:class="[{active : noticeListId === index}]"
								@click="OnNoticeClick(item, index)"
								>
								<h2 class="notice-list-title ellipsis-sm">{{item.admin_notice_problem}}</h2>
								<h4 class="notice-list-time">{{item.admin_notice_create_time}}</h4>
							</div>
						</div>
					</Col>
					<Col span="9">
						<div class="m-notice-rg">
							<h2 class="notice-rg-title">{{noticeListRg.admin_notice_problem}}</h2>
							<div class="notice-rg-text">
								{{noticeListRg.admin_notice_content}}
							</div>
							<h4 class="font-h4">
								<p v-if="noticeListRg.admin_notice_urgent">Wcoin <span v-if="noticeListRg.admin_notice_urgent === '1'">紧急</span></p>
								<p>{{noticeListRg.admin_notice_create_time}}</p>
							</h4>
						</div>
					</Col>
					<Col span="12" offset="8" style="margin-top: 15px">
						<!-- 分页 -->
						<Page :total="Pagetotal" :page-size="Pagesize" @on-change="changePages" show-total />
					</Col>
				</Row>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar"

import axios from '@/common/api/http.js'
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
			Pagetotal: 0,//总条数
			Pagesize: 7,//每页显示多少条
			historyData: [],//分页数据的盒子
			
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
					herf: "/industry"
				},
				{
					name: 'IEO',
                    herf: "/ieoinfo",
				},
			],
			noticeListId: '',
			noticeListRg: [],
			noticeList: [],
		}
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url"]),
	},
	//页面初始化
	mounted(){
		this.mapMutationsList();
		//console.log(sessionStorage.getItem('seesion'));
		
	},
	//监听click方法
	methods: {
		//传
		...mapMutations("localSession", ['handleUserName']),
		mapMutationsList() {
			
			axios.post('', {
				"func": "app.notice.findAdminNoticeLimit",
				"data": {
					"pagNumber": 0,
					"pagSize": 2000,
					"sumPag": 1,
				},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					let noticeList = res.data.data.date.date;
					this.noticeList = noticeList;
					
					// 分页-保存取到的所有数据到数组中
					this.historyData = noticeList;
					this.Pagetotal = noticeList.length; //获取数组长度
					// 初始化显示，小于每页显示条数，全部显示，大于每页显示条数，取前每页条数显示
					if(noticeList.length < this.Pagesize){
						//this.pageHouseTrue=true;
						this.noticeList = this.historyData;
					} else{
						this.noticeList = this.historyData.slice(0,this.Pagesize);
					}

					//console.log(this.noticeList);
					this.OnNoticeRgClick();
				}

				//console.log(res);
			})
			.catch( res => {console.log(res);})
		},
		//分页
		changePages(index) {
			var _start = ( index - 1 ) * this.Pagesize;
			var _end = index * this.Pagesize;
			this.noticeList = this.historyData.slice(_start,_end);
		},
		OnNoticeRgClick() {
			//console.log(item);
			let noticeList = this.noticeList;
			if (this.noticeListRg.length === 0) {
				this.noticeListRg = noticeList[0];
				//console.log(this.noticeListRg);
			}
		},
		OnNoticeClick(item, i) {
			//console.log(item);
			this.noticeListId = i;
			this.noticeListRg = item;
		},
	},
	
}
</script>

<style lang="scss" scoped>
.page {
	.m-container {
		padding-top: 72px;
		min-height: 900px;
		.z_indexs {
			padding: 50px 0;
			background-color: #fff;
		}
		.m-notice-title {
			position: relative;
			padding: 0 0 30px 40px;
			font-size: $font-size-base;
			font-weight: bold;
			&::before {
				content: ' ';
				position: absolute;
				bottom: 22px;
				left: 40px;
				width: 50px;
				height: 1px;
				background-color: $color-body-c;
				box-shadow: 0 1px 2px rgba(151, 151, 151, .6);
			}
		}
		.m-notice-lf {
			min-height: 626px;
			padding: 15px;
			border: 1px solid #eee;
			.notice-list {
				cursor: pointer;
				padding: 10px 0;
				border-bottom: 1px dashed #eee;
				&:last-child {border-bottom: none;}
				&:hover {
					.notice-list-title {color: $color-body-c;}
				}
				.notice-list-title {
					min-height: 46px;
					font-size: $font-size-base;
				}
				.notice-list-time {
					color: #727b95;
				}
			}
			.active .notice-list-title {color: $color-body-c;}
		}
		.m-notice-rg {
			min-height: 626px;
			padding: 15px 30px;
			margin-left: 20px;
			font-size: $font-size-sm;
			border: 1px solid #eee;
			.notice-rg-title {
				font-size: $font-size-md;
			}
			.notice-rg-text {
				min-height: 250px;
				padding: 20px 0;
				line-height: 1.75;
				color: #727b95;
			}
			.font-h4 {
				padding-top: 20px;
				line-height: 2;
			}
		}
	}
}




@media only screen and (max-width: 480px) {
	.g-main-wrapper {
	}
}
</style>
