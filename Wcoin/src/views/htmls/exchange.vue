<template>
<!-- 行情 -->
<div class="home">
	<m-nav v-bind:navList="navList" />
	<div class="m-container">
        <Row>
            <Col span="4" class="mod-left">
                <h2 class="font-h2">
                    <p>总资产折合：</p>
                    <p> <span>{{sumUstd}}</span> ≈￥ {{sumCNY}} CNY</p>
                </h2>
                <div class="mod-left-tab">
                    <div class="tab-hd">
                        <p 
                            v-for="(item, i) in OTCtabsData" 
                            :key="i" 
                            :class="[{onactive: OTCtabsDataIndex === i}]"
                            @click="OTCtabsDataClick(i)">{{item.name}}</p>
                    </div>
                    <div class="tab-content">
                        <div class="tab-ht">
                            <span class="currency">币种</span>
                            <span class="price">最新价</span>
                            <span class="rate">涨幅</span>
                        </div>
                        <ul class="tab-bd" v-if="OTCtabsContent.length != 0">
                            <li 
                                v-for="(item, i) in OTCtabsContent" 
                                :key="i" 
                                :class="[{onactive: OTCtabsKKIndex === i}]"
                                @click="OTCtabsDataKK(item, i)">
                                <span class="currency">{{item.market}}</span>
                                <span class="price">{{item.price}}</span>
                                <span :style="{color: (item.change >= 0 ? 'green' : 'red')}">
                                    {{item.change >= 0 ? `+${item.change}%` : `${item.change}%`}}
                                </span>
                            </li>
                        </ul>
                        <div class="no-data" v-else>
                            暂无数据
                        </div>

                    </div>
                </div>
            </Col>
            <!-- 中间 -->
            <Col span="16" class="mod-body">
                <div class="mod-dead">
                    <ul>
                        <li class="symbol-name">
                            <p>{{OTCfindQuotation.q_market}}/USTD</p>
                        </li>
                        <li class="price-container">
                            <p style="color:green">{{OTCfindQuotation.price}}</p>
                            <p>≈￥ {{OTCfindQuotation.price_rmb}} CNY</p>
                        </li>
                        <li class="change">
                            <p>
                                <span :style="{color: (OTCfindQuotation.change >= 0 ? 'green' : 'red')}">
                                    {{OTCfindQuotation.change >= 0 ? `+${OTCfindQuotation.change}%` : `${OTCfindQuotation.change}%`}}
                                </span>
                            </p>
                            <p>涨幅</p>
                        </li>
                        <li class="high">
                            <p>{{OTCfindQuotation.q_high}}</p>
                            <p>最高价</p>
                        </li>
                        <li class="low">
                            <p>{{OTCfindQuotation.q_low}}</p>
                            <p>最低价</p>
                        </li>
                        <li class="amount">
                            <p>{{OTCfindQuotation.q_count}} USTD</p>
                            <p>24H量</p>
                        </li>
                    </ul>
                    <div class="m-switch-box">
                        <i-Switch size="large" :value="true" @on-change='OnCheckmarkClick'>
                            <span slot="open">自由模式</span>
                            <span slot="close">解封模式</span>
                        </i-Switch>
                    </div>
                </div>
                <div class="m-iframe">
	                <iframe ref="iframe" id="bdIframe" :src="bdTokenUrl" frameborder="0" scrolling="no"></iframe>
                </div>
                <div class="mod-tabs">
                    <Tabs @on-click="OnTabsBBnameClick">
                        <TabPane label="未完成委托" name="name1" >
                            <div class="m-tabs-box">
                                <m-table 
                                    @showCollectionName="OnCancelDcKKClick"
                                    :contract="contract"
                                    :columns="freeColumns"
                                    :data="contractData" />
                            </div>
                        </TabPane>
                        <TabPane label="历史委托" name="name2">
                            <div class="m-tabs-box">
                                <m-table 
                                    :contract="contract"
                                    :columns="freeColumns"
                                    :data="contractData" />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </Col>
            <!-- end -->
            <Col span="4" class="mod-right">
                <div class="mod-right-hd">
                    <div class="tab-ht">
                        <span class="currency">币种</span>
                        <span class="price">价格（USTD）</span>
                        <span class="rate">数量</span>
                    </div>
                    <!-- 盘口 -->
                    <ul class="tab-bd">
                        <li 
                            v-for="(item, i) in OTCquotesRedData" 
                            @click="">
                            <span class="currency">{{item.market}}</span>
                            <span class="price">{{item.price}}</span>
                            <span style="color: red">
                                {{item.number}}
                            </span>
                        </li>
                        <li 
                            v-for="(item, i) in OTCquotesGreenData" 
                            @click="">
                            <span class="currency">{{item.market}}</span>
                            <span class="price">{{item.price}}</span>
                            <span style="color: green">
                                {{item.number}}
                            </span>
                        </li>
                    </ul>

                </div>
                <div class="mod-right-bd">
                    <h2 class="font-h2">
                        <p>可用： {{dcAmount}} USDT</p>
                        <p>冻结： {{dcFrozen}} USDT</p>
                    </h2>
                    <div class="tab-hd">
                        <p 
                            v-for="(item, i) in OTCtabsRight" 
                            :key="i" 
                            :class="[{onactive: OTCtabsRightIndex === i}]"
                            @click="OTCtabsRightClick(i)">{{item.name}}</p>
                    </div>
                    <div class="tab-content">
                        <div>
                            <Form :model="formItem" :label-width="60" class="form">
                                <FormItem label="买入价：" v-if="OTCtabsRightIndex === 0">
                                    <Input v-model="formItem.input1" placeholder="" :readonly="readonlyTrue"></Input>
                                    <span>/USDT</span>
                                </FormItem>
                                <FormItem label="买入价：" v-else>
                                    <Input v-model="formItem.input5" placeholder="" readonly></Input>
                                    <span>/USDT</span>
                                </FormItem>
                                <FormItem label="买入量：">
                                    <Input v-model="formItem.input2" placeholder="" @on-change="OnBBaddClick"></Input>
                                    <span>/{{OTCfindQuotation.q_market}}</span>
                                </FormItem>
                                <FormItem label="">
                                    <Progress :percent="formItem.percent1">
                                        <span>{{formItem.percent1}}%</span>
                                    </Progress>
                                    <ButtonGroup size="large">
                                        <Button icon="ios-add" @click="onPercentAddClick(1, 3)" class="btn-add"></Button>
                                        <Button icon="ios-remove" @click="onPercentMinusClick(1, 3)" class="btn-minu"></Button>
                                    </ButtonGroup>
                                </FormItem>
                                <p>交易金额: {{anumt1}} USDT</p>
                                <div v-if="fixedPriceTrue === 2">
                                    <Button class="m-btn-green" @click="OnpublishPurchaseClick(1)">买入</Button>
                                </div>
                                <div v-else>
                                    <Button class="m-btn-green" @click="OnsellCoinClick(1)">买入</Button>
                                </div>
                            </Form>
                            <div v-if="fixedPriceTrue === 2">
                                <Form :model="formItem" :label-width="60" class="form" >
                                    <FormItem label="卖出价：" v-if="OTCtabsRightIndex === 0">
                                        <Input v-model="formItem.input3" placeholder=""></Input>
                                        <span>/USDT</span>
                                    </FormItem>
                                    <FormItem label="卖出价：" v-else>
                                        <Input v-model="formItem.input6" placeholder="" readonly></Input>
                                        <span>/USDT</span>
                                    </FormItem>
                                    <FormItem label="卖出量：">
                                        <Input v-model="formItem.input4" placeholder="" @on-change="OnBBaddClick"></Input>
                                        <span>/{{OTCfindQuotation.q_market}}</span>
                                    </FormItem>
                                    <FormItem label="">
                                        <Progress :percent="formItem.percent2">
                                            <span>{{formItem.percent2}}%</span>
                                        </Progress>
                                        <ButtonGroup size="large">
                                            <Button icon="ios-add" @click="onPercentAddClick(2, 4)" class="btn-add"></Button>
                                            <Button icon="ios-remove" @click="onPercentMinusClick(2, 4)" class="btn-minu"></Button>
                                        </ButtonGroup>
                                    </FormItem>
                                    <p>交易金额: {{anumt2}} USDT</p>
                                    <Button class="m-btn-red" @click="OnpublishPurchaseClick(2)">卖出</Button>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</div>
</template>

<script>
import fromMarketList from "@/components/fromMarketList/fromMarketList"
import axios from '@/common/api/http.js'
import NavBar from "@/components/NavBar"

import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
	name: "",
	//组件
	components: {
		'm-nav': NavBar,
		'm-table': fromMarketList,
	},
	//接收父组件传参
	props: {},
	data() {
		return {
            //自由模式
            switchTrue: true,
            readonlyTrue: false, //控制买入
            fixedPriceTrue: 2,  //控制卖出

            interval : null,

            userId: '',
            userName: '',
            OTCtabsKKIndex: '',
            OTCfindQuotation: '',

            // 左-tab
            OTCtabsData: [
                {name: '自选'},
                {name: 'USDT'},
            ],
            OTCtabsDataIndex: 0,
            OTCtabsContent: [],

            OTCquotesRedData: [], //盘口
            OTCquotesGreenData: [], //盘口

			bdTokenUrl: '',
			navList: [
				{
					name: '行情',
					herf: "/market",
				},
				{
					name: '币币交易',
					herf: "/exchange",
					id: 1,
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
            //委托
            contract: false,
            freeColumns: [
                {
                    title: "时间",
					key: 'sell_status_time',
                    slot: "",
                    width: '200px'
                },
                {
                    title: "方式",
					key: '',
                    slot: "dcTypeBB"
                },
                {
                    title: "委托单价",
					key: 'sell_unit_price',
                    slot: ""
                },
                {
                    title: "委托数量",
					key: 'sell_count',
                    slot: ""
                },
                {
					title: "累计售出",
					key: 'sell_sale_count',
                    slot: ""
                },
                {
                    title: "委托总额",
					key: 'sell_amount_max',
                    slot: "amountMax"
                },
                {
                    title: "操作",
					key: 'sell_status',
                    slot: "assetsInfo"
                },
			],
            contractData: [],
            OnTabsBBnameID: 1, //委托切换id

            sumCNY: '',
            sumUstd: '',
            dcAmount: '',
            dcFrozen: '',

            anumt1: '',  //金额
            anumt2: '',

            QuotesTypeId: '', // 盘口- 买/卖 币id
            OTCtabsRight: [
                {name: '限价交易'},
                {name: '市价交易'},
            ],
            OTCtabsRightIndex: 0,
            formItem: {
                input1: '',
                input2: '',
                percent1: 0,
                input3: '',
                input4: '',
                percent2: 0,
            },
		}
	},
	computed: {
		//取
		...mapGetters("localSession", ["global_url"]),
	},
	//页面初始化
	mounted(){
        //iframe满屏
		const oIframe = document.getElementById('bdIframe');
        const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        oIframe.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
        //oIframe.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差

        this.OnMarketDataList();  //交易对
        this.OnFreeDealChange(); //自由模式
  
        // 某些定时器操作
        this.interval=setInterval(this.OTCDataKK, 5000);
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
        // 1.0、判断自由模式
        OnFreeDealChange(){
            axios.post('', {
                "func": "app.relieveCoin.judgeOpenFreeDeal",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let judge = res.data.data.date.judge;
                    let fixedPrice = res.data.data.date.fixedPrice;
                    if (judge === true) {
                        //自由模式

                    } else {
                        //judge === false 限制买入价格
                        this.readonlyTrue = true;
                        this.formItem.input1 = fixedPrice;
                    }

                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})

        },
        // 2.0、 模式切换
        OnCheckmarkClick(id) {
            if (id === false) {
                this.fixedPriceTrue = 3;
                this.onDcSellBBList(this.OTCtabsContent);
                this.OTCDataKK();
                this.$Message.success({
                    content: '当前为解封模式',
                    duration: 3,
                    onClose: () => {
                    }
                });
            } else {
                this.fixedPriceTrue = 2;
                this.onDcSellBBList(this.OTCtabsContent);
                this.OTCDataKK();
                
                this.$Message.success({
                    content: '当前为自由模式',
                    duration: 3,
                    onClose: () => {
                    }
                });
            }
        },
        // <------------------- 自由模式 end ------------------------>
        // 左-切换
        OTCtabsDataClick(id) {
            this.OTCtabsDataIndex = id;
            this.OnMarketDataList();  // 查询交易对
        },
        // 查询交易对 - 左列表
        OnMarketDataList() {
            let id = this.OTCtabsDataIndex;
            
            // otc 总资产
            axios.post('', {
                "func": "dc.find.assets",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    this.sumCNY = res.data.data.date.sum_CNY;
                    this.sumUstd = res.data.data.date.sum_ustd;

                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})
            // 左-列表
            if (id === 0) {
                axios.post('', {
                    "func": "coin.find.market",
                    "data": {},
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let dataList = res.data.data.date;
                        this.OTCtabsContent = dataList;

                        this.OTCDataKK();
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);})

            } else {
                this.OTCtabsContent = [];
            }
        },
        // <------------------- 查询交易对 end ------------------------>
        // 1.0、点击K线
        OTCtabsDataKK(data, index) {
            // 拿到点击的id
            this.OTCtabsKKIndex = index;

			this.userId = data.dc_type_id;
            this.userName = data.dc_t_name;

            this.OTCtabsContentID = data;
            local.remove('OtcKK');  //删除传入的id

            this.OTCDataKK();
            this.onQuotesKK(data, 3);  //盘口

            let bblist = [];
            bblist.push(data);
            this.onDcSellBBList(bblist); //点击交易对执行委托
            
        },
        // 2.0、切换k线， 点击、默认、传入 -三种状态
        OTCDataKK() {
            // 传
            let localId = local.get('OtcKK');
            // 默认
            let ids = this.userId;
            let name = this.userName;

            let data = this.OTCtabsContent;
            //定义一个空对象, 数组转对象
            let obj={}; 
            //map循环方式
            data.map(function (e,item) {
                //拿到key对应的值
                obj = e; 
            });
            //console.log(obj); //拿到key对应的值
            
            if (localId) {
                //传入 
                this.onQuotesKK(localId, 1); //盘口
                axios.post('', {
                    "func": "app.coin.findQuotation",
                    "data": {
                        "dc_type_id": localId.id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let dataList = res.data.data.date;
                        this.OTCfindQuotation = dataList;    //中间头 -资产
                        //盘口 - 买/卖价
                        this.formItem.input1 = dataList.price;
                        this.formItem.input3 = dataList.price;
                        this.formItem.input5 = dataList.price;
                        this.formItem.input6 = dataList.price;
                        this.QuotesTypeId = localId.id;

                        //截取  
                        let mk = dataList.q_market.lastIndexOf('/'); //返回字符串索引值
                        let num = dataList.q_market.substring(0, mk);
                        this.OTCfindQuotation.q_market = num;

                        // 每5秒请求 -停用
                        // this.startInterval = setInterval(() => {
                        //     // 调用请求接口的方法
                        //     this.OTCDataKK();
                        //     this.OnMarketDataList(); //模式
                        // }, 6000);

                        this.onDcSellBBList(this.OTCtabsContent); //委托
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);});

                this.bdTokenUrl = 'http://39.105.201.42:8080/K/index_ws.html?dc_type_id=' + localId.id +'&&dc_type_name=' + localId.name;

                //console.log(this.bdTokenUrl);

            } else if (ids === '') {
                
                //默认
                local.remove('OtcKK');
                this.onQuotesKK(obj, 2);

                axios.post('', {
                    "func": "app.coin.findQuotation",
                    "data": {
                        "dc_type_id": obj.dc_type_id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let dataList = res.data.data.date;
                        this.OTCfindQuotation = dataList;       //中间头部 -资产
                        //盘口 - 买/卖价
                        this.formItem.input1 = dataList.price;
                        this.formItem.input3 = dataList.price;
                        this.formItem.input5 = dataList.price;
                        this.formItem.input6 = dataList.price;
                        this.QuotesTypeId = obj.dc_type_id;

                        //截取  
                        let mk = dataList.q_market.lastIndexOf('/'); //返回字符串索引值
                        let num = dataList.q_market.substring(0, mk);
                        this.OTCfindQuotation.q_market = num;
                        
                        this.onDcSellBBList(this.OTCtabsContent); //委托
                        
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);});
                // k线
                this.bdTokenUrl = 'http://39.105.201.42:8080/K/index_ws.html?dc_type_id=' + obj.dc_type_id +'&&dc_type_name=' + obj.dc_t_name;

                // console.log(this.bdTokenUrl);
                
            } else {
                local.remove('OtcKK');
                this.onQuotesKK(obj, 2);
                // 点击
                axios.post('', {
                    "func": "app.coin.findQuotation",
                    "data": {
                        "dc_type_id": ids,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let dataList = res.data.data.date;
                        this.OTCfindQuotation = dataList;    //中间头 -资产
                        //盘口 - 买/卖价
                        this.formItem.input1 = dataList.price;
                        this.formItem.input3 = dataList.price;
                        this.formItem.input5 = dataList.price;
                        this.formItem.input6 = dataList.price;
                        this.QuotesTypeId = ids;

                        //截取  
                        let mk = dataList.q_market.lastIndexOf('/'); //返回字符串索引值
                        let num = dataList.q_market.substring(0, mk);
                        this.OTCfindQuotation.q_market = num;
                        
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);});

                this.bdTokenUrl = 'http://39.105.201.42:8080/K/index_ws.html?dc_type_id=' + ids +'&&dc_type_name=' + name;

                // console.log(this.bdTokenUrl);
            }
        },
        // <-----------------------  k线 end  ---------------------->
        //1.0、委托
        OnTabsBBnameClick(name) {
            //console.log(name);
            if (name === 'name1') {
                this.OnTabsBBnameID = 1;
                this.onDcSellBBList(this.OTCtabsContent);
            } else {
                this.OnTabsBBnameID = 2;
                this.onDcSellBBList(this.OTCtabsContent);
            }
        },
        //2.0、委托
        onDcSellBBList(data) {
            let id = this.OnTabsBBnameID;
            let dMarket = data;
            let sellShelfType = this.fixedPriceTrue;
            
            //  查询可用usdt
            axios.post('', {
                "func": "app.coin.availableUsdt",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let dataList = res.data.data.date;
                    this.dcAmount = dataList.user_dc_amount;
                    this.dcFrozen = dataList.user_dc_frozen;

                }
                //console.log(res);
            })
            .catch( res => {console.log(res);});
            //---------------- end ------------------------------------
            if (id === 1) {
                //console.log(data);
                let sellStatus = '4';
                axios.post('', {
                    "func": "app.coin.historicalEntrustment",
                    "data": {
                        "sellStatus": sellStatus,
                        "market": dMarket[0].market,
                        "sellShelfType": sellShelfType,
                        "pagNumber": 0,
                        "pagSize": 30
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let dataList = res.data.data.date.date;
                        this.contractData = dataList;
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);});
            } else {
                // 已完成
                let sellStatus = '5,6,7';
                axios.post('', {
                    "func": "app.coin.historicalEntrustment",
                    "data": {
                        "sellStatus": sellStatus,
                        "market": dMarket[0].market,
                        "sellShelfType": sellShelfType,
                        "pagNumber": 0,
                        "pagSize": 30
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let dataList = res.data.data.date.date;
                        this.contractData = dataList;
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);});
            }
        },
        //委托取消
        OnCancelDcKKClick(item) {
            let data = item;
            axios.post('', {
                "func": "app.coin.cancelDcSell",
                "data": {
                    "sell_id": item.sell_id,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    this.$Message.success({
                        content: res.data.data.date,
                        duration: 3,
                        onClose: () => {
                            this.onDcSellBBList(this.OTCtabsContent);
                            this.onQuotesKK(this.OTCtabsContent);
                        }
                    });
                } else {
                    this.$Message.error({
                        content: res.data.data.msg,
                        duration: 3,
                    });
                }
                //console.log(res);
            })
            .catch( res => {console.log(res);});
        },
        //<------------------------   委托 end   ------------------------>
        // 盘口列表 -右侧
        onQuotesKK(data, id) {
            let item = data;
            if (id === 2) {
                //默认
                axios.post('', {
                    "func": "coin.find.quotes",
                    "data": {
                        "market": data.market,
                        "pagNumber": 0,
                        "pagSize": 30,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let date1 = res.data.data.date;
                        date1.forEach((item,i,array)=>{
                            //执行代码
                            if (i === 0) {
                                this.OTCquotesGreenData=item.date
                            }
                            
                        });
                        date1.forEach((item,i,array)=>{
                            if (i === 1) {
                                this.OTCquotesRedData=item.date
                            }
                            
                        });

                        // this.OTCquotesGreenData = res.data.data.date[0].date;
                        // this.OTCquotesRedData = res.data.data.date[1].date;
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);});

            } else if (id === 1) {
                //传
                axios.post('', {
                    "func": "coin.find.quotes",
                    "data": {
                        "market": data.market,
                        "pagNumber": 0,
                        "pagSize": 30,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        date1.forEach((item,i,array)=>{
                            //执行代码
                            if (i === 0) {
                                this.OTCquotesGreenData=item.date
                            }
                            
                        });
                        date1.forEach((item,i,array)=>{
                            if (i === 1) {
                                this.OTCquotesRedData=item.date
                            }
                            
                        });
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);});
                //console.log('1');

            } else {
                //点击
                axios.post('', {
                    "func": "coin.find.quotes",
                    "data": {
                        "market": data.market,
                        "pagNumber": 0,
                        "pagSize": 30,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        date1.forEach((item,i,array)=>{
                            //执行代码
                            if (i === 0) {
                                this.OTCquotesGreenData=item.date
                            }
                            
                        });
                        date1.forEach((item,i,array)=>{
                            if (i === 1) {
                                this.OTCquotesRedData=item.date
                            }
                            
                        });
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);});
            }
        },
        //数量变化
        OnBBaddClick(event) {
            this.formItem.percent1=0;
            this.formItem.percent2=0;

            let value = parseFloat(event.target.value);
            let pice = this.dcAmount;
            let ipt1 = this.formItem.input1;
            let ipt5 = this.formItem.input5;
            let pice1 = (pice / ipt1).toFixed(4);
            let pice5 = (pice / ipt5).toFixed(4);

            if (value > pice1 || value > pice5) {
                this.$Message.info({
                    content: '输入的数量超过可购买量',
                    duration: 3,
                });

            } else {
                this.anumt1 = (value * ipt1).toFixed(4);
                this.anumt1 = (value * ipt5).toFixed(4);
            }

        },
        // 1.0、发布买入、卖出
        OTCtabsRightClick(i) {
            this.OTCtabsRightIndex = i;
            this.formItem.input2 = '';
            this.formItem.percent1 = 0;
            this.formItem.percent2 = 0;
            this.anumt1 = '';
            this.anumt2 = '';
        },
        // 2.0 -减少
        onPercentMinusClick (id, num) {
            let ipt1 = this.formItem.input1;
            let ipt3 = this.formItem.input3;
            //市价
            let ipt5 = this.formItem.input5;
            let ipt6 = this.formItem.input6;

            let pice = this.dcAmount;
            //限价
            let pice1 = (pice / ipt1).toFixed(4);
            let pice3 = (pice / ipt3).toFixed(4);
            //市价
            let pice5 = (pice / ipt5).toFixed(4);
            let pice6 = (pice / ipt6).toFixed(4);
            //console.log(pice1);
            
            if (id === 1) {
                if (this.formItem.percent1 <= 0) {
                    return false;
                }
                this.formItem.percent1 -= 1;
                if (num === 3) {
                    this.formItem.input2 = ((this.formItem.percent1 / 100) * pice1).toFixed(4);
                    this.anumt1 = (this.formItem.input2 * ipt1).toFixed(4); //金额
                } else {
                    this.formItem.input4 = ((this.formItem.percent1 / 100) * pice3).toFixed(4);
                    this.anumt2 = (this.formItem.input4 * ipt1).toFixed(4); //金额
                }


            } else {
                if (this.formItem.percent2 <= 0) {
                    return false;
                }
                this.formItem.percent2 -= 1;
                if (num === 3) {
                    this.formItem.input2 = ((this.formItem.percent2 / 100) * pice1).toFixed(4);
                    this.anumt1 = (this.formItem.input2 * ipt1).toFixed(4); //金额
                } else {
                    this.formItem.input4 = ((this.formItem.percent2 / 100) * pice3).toFixed(4);
                    this.anumt2 = (this.formItem.input4 * ipt1).toFixed(4); //金额
                }


            }
        },
        // 2.1 滑动 -添加
        onPercentAddClick (id, num) {
            this.formItem.input2="";
            this.formItem.input4="";

            let ipt1 = this.formItem.input1;
            let ipt3 = this.formItem.input3;
            //市价
            let ipt5 = this.formItem.input5;
            let ipt6 = this.formItem.input6;

            let pice = this.dcAmount;
            //限价
            let pice1 = (pice / ipt1).toFixed(4);
            let pice3 = (pice / ipt3).toFixed(4);
            //市价
            let pice5 = (pice / ipt5).toFixed(4);
            let pice6 = (pice / ipt6).toFixed(4);
            //console.log(pice1);

            // let Pices = Math.round(pice1);
            
            if (id === 1) {
                if (this.formItem.percent1 >= 100) {
                    return false;
                }
                this.formItem.percent1 += 1;
                if (num === 3) {
                    this.formItem.input2 = ((this.formItem.percent1 / 100) * pice1).toFixed(4);
                    this.anumt1 = (this.formItem.input2 * ipt1).toFixed(4); //金额
                } else {
                    this.formItem.input4 = ((this.formItem.percent1 / 100) * pice3).toFixed(4);
                    this.anumt2 = (this.formItem.input4 * ipt1).toFixed(4); //金额
                }

            } else {
                if (this.formItem.percent2 >= 100) {
                    return false;
                }
                this.formItem.percent2 += 1;
                if (num === 3) {
                    this.formItem.input2 = ((this.formItem.percent2 / 100) * pice1).toFixed(4);
                    this.anumt1 = (this.formItem.input2 * ipt1).toFixed(4); //金额
                } else {
                    this.formItem.input4 = ((this.formItem.percent2 / 100) * pice3).toFixed(4);
                    this.anumt2 = (this.formItem.input4 * ipt1).toFixed(4); //金额
                }
            }
        },
        // 4.0 发布按钮
        OnpublishPurchaseClick(id) {
            let typeId = this.QuotesTypeId;
            let ids = this.OTCtabsRightIndex;
            let numId = id;

            let ipt1 = this.formItem.input1;
            let ipt2 = this.formItem.input2;
            let ipt3 = this.formItem.input3;
            let ipt4 = this.formItem.input4;
            //市价
            let ipt5 = this.formItem.input5;
            let ipt6 = this.formItem.input6;

            let pice1 = this.formItem.input1 * 1.05;
            let pice2 = this.formItem.input3 * 1.05;
            
            let pice3 = this.formItem.input1 * 0.95;
            let pice4 = this.formItem.input3 * 0.95;

            //console.log(typeId);
            //限价
            if (ids === 0) {
                if (ipt1 > pice1 || ipt1 < pice3) {
                    this.$Message.info({
                        content: '价格上下浮动为5%',
                        duration: 3,
                    });

                } else if (ipt3 > pice2 || ipt3 < pice4) {
                    this.$Message.info({
                        content: '价格上下浮动为5%',
                        duration: 3,
                    });

                } else {
                    //买入
                    if (numId === 1) {
                        if (ipt1 === '' || ipt2 === '') {
                            this.$Message.info({
                                content: '请输入发布信息',
                                duration: 3,
                            });
                        } else {
                            axios.post('', {
                                "func": "app.coin.publishPurchase",
                                "data": {
                                    "dc_type_id": typeId,
                                    "sell_count": ipt2,
                                    "sell_unit_price": ipt1,
                                },
                            })
                            .then( res => {
                                if (res.data.data.type == 200) {
                                    this.$Message.success({
                                        content: res.data.data.date,
                                        duration: 3,
                                        onClose: () => {
                                            this.onDcSellBBList(this.OTCtabsContent);
                                        }
                                    });
                                } else {
                                    this.$Message.error({
                                        content: res.data.data.msg,
                                        duration: 3,
                                        onClose: () => {
                                        }
                                    });
                                    
                                }
                                //console.log(res);
                            })
                            .catch( res => {console.log(res);})

                        }
                    } else {
                        if (ipt3 === '' || ipt4 === '') {
                            this.$Message.info({
                                content: '请输入发布信息',
                                duration: 3,
                            });
                        } else {
                            axios.post('', {
                                "func": "app.coin.sellingVirtualCurrency",
                                "data": {
                                    "dc_type_id": typeId,
                                    "sell_count": ipt4,
                                    "sell_unit_price": ipt3,
                                },
                            })
                            .then( res => {
                                if (res.data.data.type == 200) {
                                    this.$Message.success({
                                        content: res.data.data.date,
                                        duration: 3,
                                        onClose: () => {
                                            this.onDcSellBBList(this.OTCtabsContent);
                                        }
                                    });
                                } else {
                                    this.$Message.error({
                                        content: res.data.data.msg,
                                        duration: 3,
                                        onClose: () => {
                                        }
                                    });
                                }
                                //console.log(res);
                            })
                            .catch( res => {console.log(res);})

                        }

                    }

                }
                
            } else { //市价
                //买入
                if (numId === 1) {
                    if (ipt2 === '') {
                        this.$Message.info({
                            content: '请输入发布信息',
                            duration: 3,
                        });
                    } else {
                        axios.post('', {
                            "func": "app.coin.publishPurchase",
                            "data": {
                                "dc_type_id": typeId,
                                "sell_count": ipt2,
                                "sell_unit_price": ipt5,
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                this.$Message.success({
                                    content: res.data.data.date,
                                    duration: 3,
                                    onClose: () => {
                                        this.onDcSellBBList(this.OTCtabsContent);
                                    }
                                });
                            } else {
                                this.$Message.error({
                                    content: res.data.data.msg,
                                    duration: 3,
                                    onClose: () => {
                                    }
                                });
                            }
                            //console.log(res);
                        })
                        .catch( res => {console.log(res);})

                    }
                } else {
                    if (ipt4 === '') {
                        this.$Message.info({
                            content: '请输入发布信息',
                            duration: 3,
                        });
                    } else {
                        axios.post('', {
                            "func": "app.coin.sellingVirtualCurrency",
                            "data": {
                                "dc_type_id": typeId,
                                "sell_count": ipt4,
                                "sell_unit_price": ipt6,
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                this.$Message.success({
                                    content: res.data.data.date,
                                    duration: 3,
                                    onClose: () => {
                                        this.onDcSellBBList(this.OTCtabsContent);
                                    }
                                });
                            } else {
                                this.$Message.error({
                                    content: res.data.data.msg,
                                    duration: 3,
                                    onClose: () => {
                                    }
                                });
                            }
                            //console.log(res);
                        })
                        .catch( res => {console.log(res);})

                    }

                }

            }
        },
        //解封模式下的买入
        OnsellCoinClick(id) {
            let typeId = this.QuotesTypeId; //当前id
            let ids = this.OTCtabsRightIndex; //当前市价、限价
            let numId = id;

            let ipt1 = this.formItem.input1;
            let ipt2 = this.formItem.input2;
            let ipt3 = this.formItem.input3;
            let ipt4 = this.formItem.input4;

            //console.log(typeId);
            //限价
            if (ids === 0) {
                //买入
                if (numId === 1) {
                    if (ipt2 === '') {
                        this.$Message.info({
                            content: '请输入发布信息',
                            duration: 3,
                        });
                    } else {
                        //console.log('限价买入');
                        axios.post('', {
                            "func": "app.relieveCoin.sellCoin",
                            "data": {
                                "dc_type_id": typeId,
                                "sell_count": ipt2,
                                "sell_unit_price": ipt1,
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                this.$Message.success({
                                    content: res.data.data.date,
                                    duration: 3,
                                    onClose: () => {
                                        this.onDcSellBBList(this.OTCtabsContent);
                                    }
                                });
                            } else {
                                this.$Message.error({
                                    content: res.data.data.msg,
                                    duration: 3,
                                    onClose: () => {
                                    }
                                });
                            }
                            //console.log(res);
                        })
                        .catch( res => {console.log(res);})

                    }
                }
                
            } else { //市价
                //买入
                if (numId === 1) {
                    if (ipt2 === '') {
                        this.$Message.info({
                            content: '请输入发布信息',
                            duration: 3,
                        });
                    } else {
                        //console.log('市价买入');
                        axios.post('', {
                            "func": "app.relieveCoin.sellCoin",
                            "data": {
                                "dc_type_id": typeId,
                                "sell_count": ipt2,
                                "sell_unit_price": ipt1,
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                this.$Message.success({
                                    content: res.data.data.date,
                                    duration: 3,
                                    onClose: () => {
                                        this.onDcSellBBList(this.OTCtabsContent);
                                    }
                                });
                            } else {
                                this.$Message.error({
                                    content: res.data.data.msg,
                                    duration: 3,
                                    onClose: () => {
                                    }
                                });
                            }
                            //console.log(res);
                        })
                        .catch( res => {console.log(res);})
                        

                    }
                }
            }

        },

    },
    beforeDestroy() {
        if(this.interval) { //如果定时器还在运行 或者直接关闭，不用判断
            clearInterval(this.interval); //关闭
        }
    },
	//页面离开时
	destroyed: function () {
        local.remove('OtcKK');
        this.formItem.input1 = '';
        this.formItem.input2 = '';
        this.formItem.input3 = '';
        this.formItem.input4 = '';
        //市价
        this.formItem.input5 = '';
        this.formItem.input6 = '';
	},
	
}
</script>

<style lang="scss" scoped>
/deep/.ivu-switch-large {
    width: 95px;
    height: 28px;
    line-height: 26px;
    &.ivu-switch-checked:after {
        left: 68px;
    }
    &:after {
        top: 4px;
    }
}

/deep/.ivu-tabs-nav-scroll {
	text-align: left;
}
/deep/.ivu-tabs {
    min-height: 300px;
    .ivu-table-body {
        height: 336px;
        overflow: hidden;
        overflow-y: auto;
    }
    .ivu-tabs-bar, .ivu-table td, .ivu-table th {
        margin-bottom: 0;
        border-bottom-color: rgb(47, 50, 65);
        color: #98a7c1;
    }
    .ivu-table, .ivu-table td {
        background-color: transparent;
    }
}
/deep/.ivu-tabs-nav-right {
	width: 300px;
	.ivu-input-search {
		border-color: $color-body-c !important;
		background-color: $color-body-c !important;
	}
}
/deep/.ivu-tabs-nav .ivu-tabs-tab .ivu-icon {margin: 0 0 4px;}
// ---------------------------ivew-------------------------------------- //
.g-footer-box {
    border-top: 2px solid rgb(47, 50, 65);
}
.home {
	.m-container {
        height: 100%;
        padding-top: 71px;
        border-bottom: 2px solid rgba(48, 60, 117, .7);
        background-color: $color-important;
        .mod-left {
            color: #98a7c1;
            >.font-h2 {
                padding: 15px 15px 0;
                font-size: $font-size-mini;
                border-bottom: 2px solid rgb(47, 50, 65);
                p {
                    padding-bottom: 10px;
                    &:nth-child(1) {
                        font-size: $font-size-base;
                    }
                }
                span {font-size: 14px; color: #fff;}
            }
            .mod-left-tab {
                padding: 5px 0 15px;
                .tab-hd {
                    padding: 5px 15px;
                    font-size: $font-size-sm;
                    p {
                        display: inline-block;
                        padding: 5px 10px;
                        cursor: pointer;
                    }
                    .onactive {
                        border-bottom: 2px solid $color-body-c;
                        color: $color-body-c;
                    }
                }
                .tab-content {
                    .tab-ht, .tab-bd > li {
                        padding: 5px 15px;
                        span {
                            display: inline-block;
                            width: 33.333%;
                            text-align: right;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }
                    .tab-ht {
                        span:nth-child(1) {text-align: left;}
                    }
                    .tab-bd {
                        li {
                            cursor: pointer;
                            padding: 10px 15px;
                            line-height: 1.1;
    
                            &:hover {
                                background-color: #232842;
                            }
                            span:nth-child(1) {text-align: left;}
                        }
                        .onactive {background-color: #232842;}
                    }

                }
                .no-data {
                    padding-top: 50px;
                    font-size: $font-size-base;
                    text-align: center;
                }

            }
        }
        .mod-right {
            padding: 5px 0;
            color: #98a7c1;
            .mod-right-hd {
                .tab-ht, .tab-bd > li {
                    padding: 5px 15px;
                    span {
                        display: inline-block;
                        width: 33.333%;
                        text-align: right;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
                .tab-ht {
                    border-bottom: 2px solid rgb(47, 50, 65);
                    span:nth-child(1) {text-align: left;}
                }
                .tab-bd {
                    height: 512px;
                    overflow: hidden;
                    overflow-y: auto;
                    border-bottom: 2px solid rgb(47, 50, 65);
                    li {
                        cursor: pointer;
                        padding: 10px 15px;
                        line-height: 1.1;

                        &:hover {
                            background-color: #232842;
                        }
                        span:nth-child(1) {text-align: left;}
                    }
                    .onactive {background-color: #232842;}
                }
            }
            .no-data {
                height: 516px;
                padding-top: 50px;
                font-size: $font-size-base;
                text-align: center;
                border-bottom: 2px solid rgb(47, 50, 65);
            }
            .mod-right-bd {
                padding: 10px 5px;
                > .font-h2 {
                    p {padding: 5px 10px;}
                }
                .tab-hd {
                    padding: 5px 15px;
                    font-size: $font-size-sm;
                    p {
                        display: inline-block;
                        width: 50%;
                        padding: 5px 0;
                        text-align: center;
                        cursor: pointer;
                    }
                    .onactive {
                        border-bottom: 2px solid $color-body-c;
                        color: $color-body-c;
                    }
                }
                .tab-content {
                    padding: 0 10px;
                    height: 312px;
                    overflow: hidden;
                    overflow-y: auto;
                    /deep/.ivu-form-item {
                        .ivu-form-item-label {color: #98a7c1; }
                            
                        .ivu-input {color: #fff; background-color: rgba(255, 255, 255, 0.2); border: 0;}
                        .ivu-input-wrapper {
                            width: 65%;
                            margin-right: 15px;
                        }
                    }
                    .form {
                        padding: 15px 0;
                        &:last-child {padding-bottom: 0;}
                    }
                    .btn-add, .btn-minu {
                        padding: 2px 30px;
                        background-color: transparent !important;
                    }
                    .m-btn-green {
                        width: 100%;
                        margin-top: 15px;
                        border-color: #1aad8a !important;
                        background-color: #1aad8a !important;
                    }
                    .m-btn-red {
                        width: 100%;
                        margin-top: 15px;
                        border-color: #f34747 !important;
                        background-color: #f34747 !important;
                    }
                }
            }

        }
        //中间k线
        .mod-body {
            .m-iframe {
                height: 478px;
                background-color: rgb(47, 50, 65);
                iframe {
                    width: 100%;
                    height: 100%;
                }
            }
            .mod-dead {
                position: relative;
                border: 6px solid rgb(47, 50, 65);
                border-top: none;
                .price-container {
                    p:nth-child(1) {font-size: $font-size-base;}
                }
                .m-switch-box{
                    z-index: 9;
                    @include tb;
                    right: 0;
                    width: 100px;
                }
                ul {
                    padding: 15px 0;
                    li {
                        display: inline-block;
                        padding: 0 20px;
                        vertical-align: middle;
                        font-size: $font-size-sm;
                        color: #cbd7f0;
                        p:nth-child(2) {
                            color: $color-common;
                            font-size: $font-size-mini;
                        }
                    }
                    .symbol-name {
                        font-size: $font-size-md;
                    }
                    .price-container {
                        p:nth-child(2) {
                            color: #cbd7f0;
                        }
                    }
                }
            }
            .mod-tabs {
                position: relative;
                min-height: 450px;
                padding-top: 15px;
                margin-top: -15px;
                border: 6px solid  rgb(47, 50, 65);
                border-top: none;
                border-bottom: none;
                .m-tabs-box {
                    .m-tabs-hd{
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
                }
            }
            
        }
	}
}




@media only screen and (max-width: 480px) {
}
</style>

