<template>
<!-- ieo 列表 -->
<div class="page">
	<m-container v-bind:navList="navList" />
	<div class="m-container">
		<div class="m-banner-hd">
			<img src="@/assets/img/hk/ieo_banner.png" alt="banner.png" class="img">
		</div>
		<div class="m-container-box">
			<Row type="flex" justify="center" align="middle" class="code-row-bg">
				<Col span="14" offset="0">
					<div class="container-bd">
                        <div class="m-title-hd">
                            <p v-for="(item, i) in ieoTitleList" 
                            :key="i" 
                            :class="[{onactive : ieoTitleId === item.id}]"
                            @click="OnieoTitleClick(item.id)">{{item.name}}</p>
                        </div>
                        <div class="m-ieo-box">
                            <m-ieo
                                :ieoInfoDataID='ieoTitleId'
                                :ieoInfoDataList='ieoInfoDataList'
                                @showIeoInfoClick="showIeoInfoClick"
                            />
                            <h2 class="font-h2" v-if="!ieoInfoDataList"><Icon type="ios-jet-outline" size="22" /> <span>暂无数据</span></h2>

                        </div>
					</div>
                    <div class="m-pages">
                        <!-- 分页 -->
                        <Page :total="Pagetotal" :page-size="Pagesize" @on-change="changePages" show-total />

                    </div>
				</Col>
			</Row>
		</div>

	</div>
	<!-- 抽屉修改 -->
	<Drawer
		title="IEO"
		v-model="valueSecurity"
        :transfer="true"
		width="720"
	>
        <div class="m-text-box" v-if="ieoTitleId === 2">
            <div>
                <h2 class="font-h2">基本信息</h2>
                <p class="font-text">
                    <span>空头价格： {{ieoItemBuyList.ieo_item_price}} /USDT</span>
                    <span>本期放出的总量： {{ieoItemBuyList.ieo_item_coin_sum}}</span>
                    <span>剩余总量： {{ieoItemBuyList.ieo_item_coin_residue}}</span>
                    <!-- <span>接受币种： </span> -->
                </p>
                <Form ref="formInline" :model="formInline" >
                    <FormItem>
                        <Select v-model="formInline.city" placeholder="选择币种" style="width: 300px">
                            <Option 
                            v-for="(item, i) in cityDataList" 
                            :key="i"
                            :value="item.dcTypeCode">{{item.dcTypeCode}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Input type="number" v-model="formInline.user" @on-change="onChangeNumber" placeholder="请输入购买数量" style="width: 300px">
                            <span slot="append">{{formInline.city}}</span>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Input type="number" v-model="formInline.password" placeholder="可获得MultiVAC数量" readonly style="width: 300px">
                            <span slot="append">MultiVAC</span>
                        </Input>
                        <!-- <h4 class="font-h4">手续费: /{{formInline.city}}</h4> -->
                    </FormItem>
                </Form>
                <Button class="m-btn" @click="OnbuyIeoInfosClick">立即购买</Button>
            </div>

        </div>
        <div class="m-text-box" v-else>
             <!-- v-if="ieoTitleId === 4" -->
            <div class="text-title" v-if="ieoTitleId === 4">
                <h2 class="font-h2">我的参与</h2>
                <div class="font-text">
                    <p v-if="!getIeomyInfo.myPay">
                        花费数量： 0 /{{getIeomyInfo.ieo_sell_pay_dc_type_name}}
                    </p>
                    <p v-else>花费数量： {{getIeomyInfo.myPay}} /{{getIeomyInfo.ieo_sell_pay_dc_type_name}}</p>
                    <p>获得 {{getIeomyInfo.ieo_dc_type_name}} 数量：{{getIeomyInfo.myGet}}</p>
                </div>
            </div>
            <div>
                <h2 class="font-h2">发行说明</h2>
                <div class="font-text">
                    <!-- <span>代币名称： {{getIeoInfo.ieo_info_name}}</span> -->
                    <p>代币总量： {{getIeoInfo.coin_sum}}</p>
                    <!-- <span>限定价格： {{getIeoInfo.ieo_item_price}}</span> -->
                    <p>交易方式： {{getIeoInfo.deal_type === 1 ? '抢购': '交易所'}}</p>
                </div>

                <h2 class="font-h2">开放时间</h2>
                <p class="">
                   <Timeline>
                        <TimelineItem v-for="(item, i) in getIeoList" :class="[{colred : item.ieo_item_status === 3}]">
                            <p class="time">第 {{item.ieo_item_periods}} 期 
                                <span class="color-body-c" v-if="item.ieo_item_status === 1">即将开放</span>
                                <span class="color-body-c" v-if="item.ieo_item_status === 2">进行中</span>
                                <span v-if="item.ieo_item_status === 3">已结束</span>
                            </p>
                            <p class="content">{{item.ieo_item_price}} /USTD</p>
                            <p v-if="item.ieo_item_status === 1">开放时间： {{item.ieo_item_create_time}}</p>
                            <p v-if="item.ieo_item_status === 2">出售时间： {{item.ieo_item_open_time}}</p>
                            <p>结束时间： {{item.ieo_item_close_time}}</p>
                        </TimelineItem>
                    </Timeline>
                </p>
                <h2 class="font-h2">项目介绍</h2>
                <p class="font-text">
                   {{getIeoInfo.ieo_introduce}}
                </p>
            </div>
        </div>
	</Drawer>  
</div>
</template>

<script>
import axios from '@/common/api/http.js'
import NavBar from "@/components/NavBar"
import ieoList from "@/components/IEOinfoDataList/IEOinfoDataList"

import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
	name: "",
	//组件
	components: {
        'm-container': NavBar,
        'm-ieo': ieoList,
	},
	//接收父组件传参
	props: {},
	data() {
		return {
            //抽屉
            ieoModal: false,
            valueSecurity: false,
            //抽屉数据
            getIeoInfo: '',
            getIeoList: '',
            getIeomyInfo: '',
            ieoItemBuyList: '',
            dcTypeCode: '',  //购买币id
            dcPrice: '',

            formInline: {
                city: '',
                user: '',
                password:'',
            },
            cityDataList: [],
            
			Pagetotal: 1,   //当前列表数据总长度
			Pages: 0,   //第几页
			Pagesize: 4,  //条数
            
            ieoTitleId: 1,
            ieoTitleList: [
                {name: '即将开放',id: 1,},
                {name: '进行中',id: 2,},
                {name: '已结束',id: 3,},
                {name: '我参与的',id: 4,},
            ],
            ieoInfoDataList: [], //列表

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
                    id: 1,
				},
			],
			coinsPriceArr: [],
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
	//页面初始化
	mounted(){
		this.OnHomePageDistrict();
	},
	//监听click方法
	methods: {
		//传
        ...mapMutations("localSession", ['handleUserSession', ]),
        //数量换算
        onChangeNumber(event) {
            let value = parseFloat(event.target.value);
            let sum = parseFloat(this.ieoItemBuyList.ieo_item_price);

            let dcTypeId = this.formInline.city;
            let ieoBuyList = this.cityDataList;
            ieoBuyList.forEach( (item, i, arr) => {
                if (arr[i].dcTypeCode === dcTypeId) {
                    this.dcPrice =  arr[i].price;
                }
                
            });

            let price = parseFloat(this.dcPrice);
            //（币价*数）/ 当前价
            let password = ( price * value ) / sum;
            this.formInline.password = password.toFixed(4);
            

        },
        // 1.0、切换
        OnieoTitleClick(id) {
            this.ieoTitleId = id;
            if (id === 4) {
                this.OnMyIeoInfoList()
            } else {
                this.OnHomePageDistrict();
            }
        },
        // 2.0、ieo列表
		OnHomePageDistrict() {
            let id = this.ieoTitleId;
			axios.post('', {
				"func": "app.ieo.getIeoInfoList",
				"data": {
                    "ieo_info_status": id,
                    "pagNumber": this.Pages,
                    "pagSize": this.Pagesize,
                },
			})
			.then( res => {
				if (res.data.data.type == 200) {
                    let coinsPriceArr = res.data.data.date.date;
                    this.ieoInfoDataList = coinsPriceArr;
                    this.Pagetotal = res.data.data.date.pagCount;
                    
				}
				//console.log(res);
			})
        },
        // 分页
		changePages(index) {
			this.Pages = index-1;
			this.OnHomePageDistrict();
		},
        // 3.0、ieo详情
        showIeoInfoClick(data) {
            let infoId = data.ieo_info_id;
            let sellId = data.ieo_sell_id;
            let id = this.ieoTitleId;
            if (id === 4) {
                //我参与的
                axios.post('', {
                    "func": "app.ieo.getIeoItem",
                    "data": {
                        "showMyItem": 1,
                        "ieo_info_id": infoId,
                        "ieo_sell_id": sellId,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let coinsPriceArr = res.data.data.date;
                        this.getIeoInfo = coinsPriceArr.ieoInfo;
                        this.getIeoList = coinsPriceArr.itemList;
                        this.getIeomyInfo = coinsPriceArr.myJoinList[0];
                        
                    } else {
                        this.$Message.error({
                            content: res.data.data.msg,
                            duration: 3
                        });
                    }
                    console.log(res);
                })
			    .catch( res => {console.log('失败'); console.log(res);})

            } else {
                axios.post('', {
                    "func": "app.ieo.getIeoItem",
                    "data": {
                        "showMyItem": 2,
                        "ieo_info_id": infoId,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let coinsPriceArr = res.data.data.date;

                        this.getIeoInfo = coinsPriceArr.ieoInfo;
                        this.getIeoList = coinsPriceArr.itemList;
                        //this.getIeomyInfo = coinsPriceArr.myJoinList;
                        this.cityDataList = coinsPriceArr.ieoInfo.dcTypeList;
                        //币种
                        let itemList = coinsPriceArr.itemList;
                        itemList.forEach( (item, i, arr) => {
                            if (arr[i].ieo_item_status == 2) {
                                this.ieoItemBuyList = arr[i];
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
			    .catch( res => {console.log('失败'); console.log(res);})

            }
            this.valueSecurity = true;
        },
        //查询我参与
		OnMyIeoInfoList() {
			axios.post('', {
				"func": "app.ieo.getMyIeoInfoList",
				"data": {
                    "pagNumber": this.Pages,
                    "pagSize": this.Pagesize,
                },
			})
			.then( res => {
				if (res.data.data.type == 200) {
                    let coinsPriceArr = res.data.data.date;
                    this.ieoInfoDataList = coinsPriceArr;
                    this.Pagetotal = coinsPriceArr.length;
                    
				} else {
                    this.$Message.error({
                        content: res.data.data.msg,
                        duration: 3
                    });
                }
				console.log(res);
            })			    
            .catch( res => {console.log('失败'); console.log(res);})

        },
        //立即购买按钮
        OnbuyIeoInfosClick() {
            let itemId = this.ieoItemBuyList.ieo_item_id;
            let infoId = this.ieoItemBuyList.ieo_info_id;
            let dcTypeId = this.formInline.city.toString();
            let sum = this.formInline.user;
            //币种id、价格
            let ieoBuyList = this.cityDataList;
            ieoBuyList.forEach( (item, i, arr) => {
                if (arr[i].dcTypeCode === dcTypeId) {
                    this.dcTypeCode = arr[i].dcTypeId;
                    this.dcPrice =  arr[i].price;
                }
                
            });

            if (dcTypeId === '' || sum === '') {
                this.$Message.error({
                    content: '请输入购买信息',
                    duration: 3
                });

            } else {
                axios.post('', {
                    "func": "app.ieo.buyIeoInfo",
                    "data": {
                        "ieo_item_id": itemId,
                        "ieo_info_id": infoId,
                        "ieo_sell_pay_dc_type_id": this.dcTypeCode,
                        "ieo_sell_sum": sum,
                        "payDcTypePrice": this.dcPrice,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: '您已'+ res.data.data.msg + '购买本期',
                            duration: 3,
                            onClose: () => {
                                this.formInline.user='';
                                this.formInline.city='';
                                this.formInline.password='';
                                this.valueSecurity = false;
                            }
                        });
                        
                    } else {
                        this.$Message.error({
                            content: res.data.data.msg,
                            duration: 3,
                            onClose: () => {
                                this.formInline.user='';
                                this.formInline.city='';
                                this.formInline.password='';
                                this.valueSecurity = false;
                            }
                        });
                    }
                    console.log(res);
                })
			    .catch( res => {console.log('失败'); console.log(res);})
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
/deep/.ivu-drawer-right {
    .m-text-box {
        .font-h2 {
            padding: 15px 0;
            font-size: $font-size-base;
            font-weight: bold;
            color: $color-body-c;
        }
        .font-text {
            padding-bottom: 10px;
            p {
                display: inline-block;
                padding-right: 30px;
                vertical-align: middle;
            }
        }
        .colred .ivu-timeline-item-head-blue{
            border-color: red;
            color: red;
        }
        .time {
            padding-bottom: 5px;
        }
        .content {font-size: $font-size-sm;}
    }
    .ivu-form {
        padding-top: 30px;
        .ivu-input-group-append, .ivu-input-group-prepend {
            min-width: 75px;
        }
        .font-h4 {
            padding: 10px 0 20px;
        }
    }
}
// -----------------------------下拉选择、购买按钮-------------------------------- //


.page {
	.m-container {
		padding-top: 70px;
		.m-banner-hd {
			width: 100%;
			min-height: 410px;
			line-height: 0;
			.img {
				width: 100%;
				height: initial;
			}
		}
		.m-container-box {
            padding: 50px 0;
            background-color: #f8f9fe;
            .container-bd {
                border: 1px solid #eee;
                .m-title-hd {
                    padding: 0 30px;
                    background-color: #f8f9fe;
                    p {
                        cursor: pointer;
                        display: inline-block;
                        padding: 15px 20px;
                        font-size: $font-size-base;
                        &:hover {
                            color: $color-body-c;
                        }
                    }
                    .onactive {font-weight: bold; color: $color-body-c;}
                }
                .m-ieo-box {
                    min-height: 623px;
                    padding: 30px 50px;
                    background-color: #fff;
                    > .font-h2 {
                        padding-top: 25px;
                        font-size: $font-size-base;
                        text-align: center;
                        color: #666;
                        span {
                            display: inline-block;
                            vertical-align: middle;
                            padding-left: 10px;
                        }
                    }
                }
            }
            .m-pages {
                padding-top: 20px;
                text-align: right;
            }
		}
	}
}




@media only screen and (max-width: 480px) {
}
</style>
