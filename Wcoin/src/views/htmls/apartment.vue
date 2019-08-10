<template>
<!-- OTC- tab 入口 -->
<div class="page">
	<m-nav v-bind:navList="navList" />
	<div class="m-container">
		<div class="container-otc">
			<Tabs value="name1" @on-click="OnPurchaseClick">
				<TabPane label="购买" name="name1" >
					<div class="m-tabs-box">
						<div class="m-tabs-hd">
							<p 
								:class="{active : flagIndexOtc == index}" 
								v-for="(item, index) in otcNameList"
								:key="index"
								@click="OnChangeOtc(item, index)">{{item.dc_t_name}}</p>
							<div class="m-balance-otc">
								<div class="balance-otc-lf">
									可用 {{amount}}
									<span v-for="(item, index) in otcNameList"
								:key="index" v-if="flagIndexOtc === index">{{item.dc_t_name}}</span>
								</div>
								<div class="balance-otc-rg">
									冻结 {{frozen}}
									<span v-for="(item, index) in otcNameList"
								:key="index" v-if="flagIndexOtc === index">{{item.dc_t_name}}</span>
								</div>
							</div>
						</div>
						<div class="m-table-box">
							<m-table 
								:columns="freeColumns"
								:data="sellListData"
								@showPurchaseName="showPurchaseName" />
						</div>
						<!-- 分页 -->
						<Page :total="fPagetotal" :page-size="fPagesize" @on-change="changeFlagIndexOtc" show-total />
					</div>
				</TabPane>
				<TabPane label="出售" name="name2">
					<div class="m-tabs-box">
						<div class="m-tabs-hd">
							<p 
								:class="{active : flagIndexSellOtc == index}" 
								v-for="(item, index) in otcNameList"
								:key="index"
								@click="OnChangeSellOtc(item, index)">{{item.dc_t_name}}</p>
							<div class="m-balance-otc">
								<div class="balance-otc-lf">
									可用 {{amount}}
									<span v-for="(item, index) in otcNameList"
								:key="index" v-if="flagIndexSellOtc === index">{{item.dc_t_name}}</span>
								</div>
								<div class="balance-otc-rg">
									冻结 {{frozen}}
									<span v-for="(item, index) in otcNameList"
								:key="index" v-if="flagIndexSellOtc === index">{{item.dc_t_name}}</span>
								</div>
							</div>
						</div>
						<div class="m-table-box">
							<m-table 
								:columns="freeColumns"
								:data="sellListDataCs"
								@showPurchaseName="showPurchaseName" />
						</div>
						<!-- 分页 -->
						<Page :total="sPagetotal" :page-size="sPagesize" @on-change="changeFlagIndexSellOtc" show-total />
					</div>
				</TabPane>
				<TabPane label="发布" name="name3">
					<div class="m-tabs-box">
						<div class="m-tabs-hd">
							<p 
								:class="{active : flagIndexReleaseOtc == index}" 
								v-for="(item, index) in otcNameList"
								:key="index"
								@click="OnChangeReleaseOtc(item, index)">{{item.dc_t_name}}</p>
							<div class="m-balance-otc">
								<div class="balance-otc-lf">
									<span @click="OnSellOtcClick(1)">发布买入</span>
									<span @click="OnSellOtcClick(2)">发布卖出</span>
								</div>
								<div class="balance-otc-lf">
									可用 {{amount}}
									<span v-for="(item, index) in otcNameList"
								:key="index" v-if="flagIndexReleaseOtc === index">{{item.dc_t_name}}</span>
								</div>
								<div class="balance-otc-rg">
									冻结 {{frozen}}
									<span v-for="(item, index) in otcNameList"
								:key="index" v-if="flagIndexReleaseOtc === index">{{item.dc_t_name}}</span>
								</div>
							</div>
						</div>
						<div class="m-table-box">
							<m-table 
								:columns="freeColumns"
								:data="sellListDataCs"
								@showPurchaseName="showCancelOrder" />
						</div>
						<!-- 分页 -->
						<Page :total="Pagetotal" :page-size="Pagesize" @on-change="changePages" show-total />
					</div>
				</TabPane>
				<div class="m-order-box" slot="extra" @click="OnOrderClick">
					<!-- <Button @click="OnOrderClick" size="small" >增加</Button> -->
					<h2 class="order-title">
						<Icon type="ios-paper-outline" size="18" />
						交易订单</h2>
				</div>
			</Tabs>
		</div>
	</div>
	<!-- 抽屉修改 -->
	<Drawer
		title="OTC-发布"
		v-model="valueSecurity"
		width="720"
		:mask-closable="false"
		:transfer="false"
		@on-close=""
	>
		<!-- 发布买入 -->
		<div v-if="sellOtc === 1">
			<div class="m-otc-purchase">
				<h2 class="font-h2">发布买入</h2>
				<form ref="formReleaseInline" :model="formReleaseInline" action="" class="m-form-box">
					<span class="form-sp">
						<Select v-model="formReleaseInline.model3" style="width: 200px;" placeholder="请选择币种">
							<Option v-for="item in otcNameList" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
						</Select>
					</span>
					<span class="form-sp">
						<Select v-model="formReleaseInline.model4" style="width: 200px;" placeholder="请选择结算币种">
							<Option v-for="item in otcCurrencyList" :value="item.currency_id" :key="item.currency_id">{{ item.currency_name }}</Option>
						</Select>
					</span>
					<Input v-model="formReleaseInline.pices" style="width: 300px;margin-top: 20px;">
						<span slot="prepend">单价</span>
					</Input>
					<Input v-model="formReleaseInline.number" style="width: 300px;margin-top: 20px;">
						<span slot="prepend">数量</span>
					</Input>
					<Input v-model="formReleaseInline.least" style="width: 300px;margin-top: 20px;">
						<span slot="prepend">最小额度</span>
						<span slot="append">CNY</span>
					</Input>
					<Input v-model="formReleaseInline.most" style="width: 300px;margin-top: 20px;">
						<span slot="prepend">最大额度</span>
						<span slot="append">CNY</span>
					</Input>
					<Input v-model="formReleaseInline.textarea" type="textarea" :autosize="{minRows: 4,maxRows: 4}" style="width: 420px;margin-top: 50px;" placeholder="留言备注" />
					<div class="m-btn">
						<Button type="primary" style="width: 150px;" @click="OnInsertSellClick">立即发布</Button>
					</div>
				</form>
			</div>
		</div>
		<!-- 发布卖出 -->
		<div v-else-if="sellOtc === 2">
			<div class="m-otc-purchase">
				<h2 class="font-h2">发布卖出</h2>
				<form ref="formReleaseInline" :model="formReleaseInline" action="" class="m-form-box">
					<span class="form-sp">
						<Select v-model="formReleaseInline.model3" style="width: 200px;" placeholder="请选择币种">
							<Option v-for="item in otcNameList" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
						</Select>
					</span>
					<span class="form-sp">
						<Select v-model="formReleaseInline.model4" style="width: 200px;" placeholder="请选择结算币种">
							<Option v-for="item in otcCurrencyList" :value="item.currency_id" :key="item.currency_id">{{ item.currency_name }}</Option>
						</Select>
					</span>
					<Input v-model="formReleaseInline.pices" type="number" style="width: 300px; margin-top: 20px; ">
						<span slot="prepend">单价</span>
					</Input>
					<Input v-model="formReleaseInline.number" type="number" style="width: 300px; margin-top: 20px; ">
						<span slot="prepend">数量</span>
					</Input>
					<Input v-model="formReleaseInline.least" type="number" style="width: 300px; margin-top: 20px;">
						<span slot="prepend">最小额度</span>
						<span slot="append">CNY</span>
					</Input>
					<Input v-model="formReleaseInline.most" type="number" style="width: 300px; margin-top: 20px;">
						<span slot="prepend">最大额度</span>
						<span slot="append">CNY</span>
					</Input>
					<Input v-model="formReleaseInline.textarea" type="textarea" :autosize="{minRows: 4,maxRows: 4}" style="width: 420px;margin-top: 50px;" placeholder="留言备注" />
					<div class="m-btn">
						<Button type="primary" style="width: 150px;" @click="OnInsertSellClick">立即发布</Button>
					</div>
				</form>
			</div>

		</div>
	</Drawer>   
</div>
</template>

<script>
import NavBar from "@/components/NavBar"
import ivewTableSlots from "@/components/fromMarketList/ivewTableSlots"

import local from '@/common/api/localSession.js'
import axios from '@/common/api/http.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

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
			fsumPage: 0,
			fPages: 1,
			fPagetotal: 1,//总页数
			fPagesize: 12,//每页显示多少条
			fHistoryData: [],//分页数据的盒子

			sumPages: 0,
			sPages: 1,
			sPagetotal: 1,
			sPagesize: 12,
			sHistoryData: [],

			sumPage: 0,
			Pages: 1,
			Pagetotal: 1,
			Pagesize: 12,
			historyData: [],
			
			valueSecurity: false, //抽屉
			sellOtc: '',

			purchaseOtc: 1, //买入、卖出
			frozen: '',
			amount: '', //可用

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
			sellListData: [],   //买入
			sellListDataCs: [],

			contract: false,
			//otc资产切换
			flagIndexOtc: 0,
			flagIndexSellOtc: 0,
			flagIndexReleaseOtc: 0,

			otcNameId: '',   //id
			otcNameList: [], //币种
			otcCurrencyList: [], //结算币种
			
			otcNameRelease: ['发布买入', '发布卖出',],
			//发布买入
			formReleaseInline: {
				model3: '',
				model4: '',
				number: '',
				pices: '',
				least: '',
				most: '',
				textarea: '',
			},

			//购买\出售
            freeColumns: [
                {
                    title: "昵称",
                    key: 'user_name',
                    slot: "currency"
                },
                {
                    title: "数量",
                    key: 'sell_lave_count',
                    slot: "dollar"
                },
                {
                    title: "限额",
                    key: 'lowPrice',
                    slot: "lowPrice"
                },
                {
                    title: "单价",
                    key: 'sell_unit_price',
                    slot: "highPrice"
                },
                {
                    title: "支付方式",
                    key: 'otcmode',
                    slot: "otcmode"
                },
                {
                    title: "交易",
                    key: 'deaNumber',
                    slot: "deaNumber"
                },
			],
		}
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url",]),
	},
	//页面初始化
	mounted(){
		this.OnCurrencyList();  //总币
		//this.OnDCBySellList(); //总资产
		//this.OnDCByCurrencyId();
	},
	//监听click方法
	methods: {
		//传
		...mapMutations("localSession", ["handleOtcSellList", "handleOtcYouself"]),
		// tab 切换 - 获取 买入 / 卖出 状态
		OnPurchaseClick(name) {
			//console.log(name);
			// 清空
			if(name === 'name1') {
				this.otcNameId="";
				this.purchaseOtc = 1;
				this.flagIndexOtc = 0;
				this.fsumPage = 0;		//分页

				//this.OnDCBySellList();		//查表格
				this.handleOtcYouself('0');	//缓存按钮
				this.OnCurrencyList();  //1、查id

			} else if (name === 'name2') {
				this.otcNameId="";
				this.sumPages = 0;   //分页
				this.purchaseOtc = 2;
				this.flagIndexSellOtc = 0;

				//this.OnDCBySellList();		//查表格
				this.handleOtcYouself('0');  //缓存按钮
				this.OnCurrencyList();  //1、查id
			} else {
				this.otcNameId="";
				this.sumPage = 0; //分页
				this.purchaseOtc = 3;
				this.flagIndexReleaseOtc = 0;

				//this.OnDCBySellList();	//查表格
				this.OnCurrencyList();  //1、查id
			}
		},
		//otc子栏切换 - 获取币id
		OnChangeOtc(data, index) {
			//买入
			this.flagIndexOtc = index;
			this.otcNameId = data.dc_type_id; //当前币id
			//console.log(this.flagIndexOtc);
			
			this.OnDCByCurrencyId();
			this.OnDCBySellList();

		},
		OnChangeSellOtc(data, index) {
			//卖出
			this.flagIndexSellOtc = index;
			this.otcNameId = data.dc_type_id; //币id
			//console.log(this.otcNameId);
			
			this.OnDCByCurrencyId();
			this.OnDCBySellList();
		},
		OnChangeReleaseOtc(data, index) {
			//console.log(index);
			//发布
			this.flagIndexReleaseOtc = index;
			this.otcNameId = data.dc_type_id; //币id
			//console.log(this.otcNameId);
			
			this.OnDCByCurrencyId();
			this.OnDCBySellList();
		},
//--------------------- 切换币种结束 ------------------------
		//交易订单
		OnOrderClick() {
			this.$router.push({path:'/order'});
		},
		// 买入/ 卖出 -按钮
		showPurchaseName(data) {
			let user = data;
			let accountId = JSON.stringify(user.sell_type);
			this.$router.push({path:'/purchase', query: {judgeText: accountId}});
			this.handleOtcSellList(data); //存数据
		},
		// 1、下架(取消)发布的订单
		showCancelOrder(data) {
			let user = data;
			//console.log(user);
			axios.post('', {
				"func": "app.order.cancelOrder",
				"data": {
					"sell_id": user.sell_id,
				},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					this.$Message.success({
						content: res.data.data.date,
						duration: 3,
						onClose: () => {
							this.OnDCBySellList();
							this.purchaseOtc = 3;
						}
					});

				} else {
					this.$Message.error({
						content: res.data.data.msg,
						duration: 3
					});
				}
				//console.log(res);
			})
			.catch( res => {console.log(res);})

		},
		//2、发布上架订单-抽屉
		OnSellOtcClick(id) {
			this.sellOtc = id;
			this.valueSecurity = true;
			//2.1、查询结算币种
			axios.post('', {
				"func": "app.currency.settlementCurrencyList",
				"data": {
					"pagNumber": 0,
					"pagSize": 30,
					"sumPage": null
				},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					let data = res.data.data.date.date;
					this.otcCurrencyList = data;
				} 
				//console.log(res);
			})
			.catch( res => {console.log(res);})
		},
		// 3、发布上架订单
		OnInsertSellClick() {
			let id = this.sellOtc;
			let typeId = this.formReleaseInline.model3; //币种
			let currencyId = this.formReleaseInline.model4; //币种
			let count = this.formReleaseInline.number; //数量
			let unitPrice = this.formReleaseInline.pices; //单价
			let amountMin = this.formReleaseInline.least; //最小
			let amountMax = this.formReleaseInline.most; //最大
			let message = this.formReleaseInline.textarea; //留言

			//console.log(typeId, currencyId, count, unitPrice, amountMin, amountMax, message);
			
			if (typeId === "" || count === "" || unitPrice === "" || amountMin === "" || amountMax === "" || message === "" ) {
				this.$Message.error({
					content: '请填写发布订单信息',
					duration: 3
				});
			} else if (parseFloat(amountMin) > parseFloat(amountMax)) {
				this.$Message.error({
					content: '请输入正确额度',
					duration: 3
				});
			} else {
				if (id === 1) {
					axios.post('', {
						"func": "otc.insert.sell",
						"data": {
							"dc_type_id": typeId,
							"currency_id": currencyId,
							"sell_type": id,
							"sell_shelf_type": 1,
							"sell_count": count,
							"sell_unit_price": unitPrice,
							"sell_amount_min": amountMin,
							"sell_amount_max": amountMax,
							"sell_auto_message": message,
						},
					})
					.then( res => {
						if (res.data.data.type == 200) {
							this.$Message.success({
								content: res.data.data.date,
								duration: 3,
								onClose: () => {
									this.valueSecurity = false;
									this.formReleaseInline = '';
									this.sellOtc="";
								}
							});
						} else {
							this.$Message.error({
								content: res.data.data.msg,
								duration: 3,
								onClose: () => {
									this.valueSecurity = false;
									this.formReleaseInline = '';
									this.sellOtc="";
								}
							});
						}
						//console.log(res);
					})
					.catch( res => {console.log(res);})

				} else {
					axios.post('', {
						"func": "otc.insert.sell",
						"data": {
							"dc_type_id": typeId,
							"currency_id": currencyId,
							"sell_type": id,
							"sell_shelf_type": 1,
							"sell_count": count,
							"sell_unit_price": unitPrice,
							"sell_amount_min": amountMin,
							"sell_amount_max": amountMax,
							"sell_auto_message": message,
						},
					})
					.then( res => {
						if (res.data.data.type == 200) {
							this.$Message.success({
								content: res.data.data.date,
								duration: 3,
								onClose: () => {
									this.valueSecurity = false;
									this.formReleaseInline = '';
									this.sellOtc="";
								}
							});

						} else {
							this.$Message.error({
								content: res.data.data.msg,
								duration: 3,
								onClose: () => {
									this.valueSecurity = false;
									this.formReleaseInline = '';
									this.sellOtc="";
								}
							});
						}
						//console.log(res);
					})
					.catch( res => {console.log(res);})

				}

			}
		},
		// -------------------------- 发布end -----------------------
		// 1、查询所有币种（ustd）
		OnCurrencyList() {
			axios.post('', {
				"func": "dc.find.otcDcType",
				"data": {},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					let otcNameList = res.data.data.date;
					this.otcNameList = otcNameList;

					//如果币种为空
					if (this.otcNameId === '') {
						this.otcNameId = otcNameList[0].dc_type_id;
						this.OnDCByCurrencyId();
						this.OnDCBySellList();
						//console.log(this.otcNameId);
					}

				}
				//console.log(res);
			})
			.catch( res => {console.log(res);})

		},
		//2、查询资产总列表(表格)
		OnDCBySellList() {
			let otcNameId = this.otcNameId;  //当前币id
			let purchaseOtc = this.purchaseOtc;  //当前 买入 / 卖出 切换的状态
			//console.log(otcNameId);
			
			if (purchaseOtc === 1) {
				//console.log('购');
				axios.post('', {
					"func": "app.currency.findDcSellList",
					"data": {
						"pagNumber": this.fPages,
						"pagSize": this.fPagesize,
						"sumPage": this.fsumPage,
						"dc_type_id": otcNameId,
						"sell_type": purchaseOtc,
						"sell_shelf_type": 1,
					},
				})
				.then( res => {
					if (res.data.data.type == 200) {
						let dataList = res.data.data.date.date;
						this.sellListData = dataList;
                        // 分页-保存取到的所有数据到数组中
                        this.fPagetotal = res.data.data.date.pagCount; //获取数组长度
                        this.fsumPage = res.data.data.date.sumPage;
					} else {
						this.$Message.info({
							content: '检测登录信息已过期',
							duration: 3
						});
					}
					//console.log(res);
				})
				.catch( res => {console.log(res);})
			} else if (purchaseOtc === 2) {
				axios.post('', {
					"func": "app.currency.findDcSellList",
					"data": {
						"pagNumber": this.sPages,
						"pagSize": this.sPagesize,
						"sumPage": this.sumPages,
						"dc_type_id": otcNameId,
						"sell_type": purchaseOtc,
						"sell_shelf_type": 1,
					},
				})
				.then( res => {
					if (res.data.data.type == 200) {
						let dataList = res.data.data.date.date;
						this.sellListDataCs = dataList;
                        // 分页-保存取到的所有数据到数组中
                        this.sPagetotal = res.data.data.date.pagCount; //获取数组长度
                        this.sumPages = res.data.data.date.sumPage;
					} else {
						this.$Message.info({
							content: '检测登录信息已过期',
							duration: 3
						});
					}
					//console.log(res);
				})
				.catch( res => {console.log(res);})
			} else {
				this.handleOtcYouself('1');
				axios.post('', {
					"func": "app.currency.findDcSellList",
					"data": {
						"pagNumber": this.Pages,
						"pagSize": this.Pagesize,
						"sumPage": this.sumPage,
						"dc_type_id": otcNameId,
						"youself": 1,
					},
				})
				.then( res => {
					if (res.data.data.type == 200) {
						let dataList = res.data.data.date.date;
						// this.sellListDataCs = dataList;
						
                        // 分页-保存取到的所有数据到数组中
                        this.sellListDataCs = dataList;
                        this.Pagetotal = res.data.data.date.pagCount; //获取数组长度
                        this.sumPage = res.data.data.date.sumPage;
					} else {
						this.$Message.info({
							content: '检测登录信息已过期',
							duration: 3
						});
					}
					//console.log(res);
				})
				.catch( res => {console.log(res);})

			}
		},
		//分页
		changeFlagIndexOtc(index) {
			this.fPages = index-1;
			this.OnDCBySellList();
		},
		changeFlagIndexSellOtc(index) {
			this.sPages = index-1;
			this.OnDCBySellList();
		},
		changePages(index) {
			this.Pages = index-1;
			this.OnDCBySellList();
		},

		//3、根据id查询资产(1)
		OnDCByCurrencyId() {
			let otcNameId = this.otcNameId;
			//console.log(id);
			axios.post('', {
				"func": "app.currency.findDCByCurrencyId",
				"data": {
					"dc_type_id": otcNameId,
				},
			})
			.then( res => {
				if (res.data.data.type == 200) {
					let otcNameList = res.data.data.date;
					this.amount = otcNameList[0].user_dc_amount;
					this.frozen = otcNameList[0].user_dc_frozen;
				}
				//console.log(res);
			})
			.catch( res => {console.log(res);})
		},
	},
	//页面离开时
	destroyed: function () {
        //console.log("我已经离开了！");
        local.remove('otcYouself');
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
	.ivu-tabs-nav-right {
		z-index: 99;
		@include tb;
		right: 0;
		font-size: $font-size-sm;
		text-align: right;
		.order-title {cursor: pointer;}
	}
}

// --------------------------------------- ivew ------------------------------------------------------------------- //


.page {
	background-color: #f8f9fe;
	.m-container {
		min-height: 800px;
		padding: 100px 30px 30px;
		.container-otc {min-height: 800px;padding: 0 30px 30px;background-color: #fff;}
		.m-tabs-box {
			.m-tabs-hd{
				position: relative;
				min-height: 30px;
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
					.balance-otc-lf {
						&:nth-child(1) {
							span {
								display: inline-block;
								cursor: pointer;
								padding: 0 10px;
							}
						}
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
			//表格
			.m-table-box {
				min-height: 652px;
			}
		}
	}
}
// 抽屉盒子
/deep/.ivu-drawer {
	.m-otc-purchase {
		.m-btn {padding-top: 50px;}
		.font-h2 {
			padding: 15px 0;
			font-size: $font-size-base;
		}
		.m-form-box {
			.form-sp {
				display: inline-block;
				padding-right: 15px;
			}
		}
	}

}




@media only screen and (max-width: 480px) {
	.g-main-wrapper {
	}
}
</style>
