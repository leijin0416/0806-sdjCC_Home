<template>
    <!-- 中心-资产明细 -->
    <div class="assets">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">我的资产</span> 
                </h2>
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-assets-box">
                    <div class="m-assets-text">
                        <p class="font-h2"><span>总资产折合</span> ： <span class="font-wb color-body-c font-md">{{sumUstd}} BTC</span>  ≈ {{sumCNY}} CNY</p>
                        <div class="btn">
                            <div>
                                Hi~ <span class="font-wb color-body-c">{{userName}}</span>
                            </div>
                            <!-- <Button type="success" to="/assetslist">
                                <p>财务明细</p>
                            </Button> -->
                        </div>
                    </div>
                    <!-- 信息 -->
                    <div class="m-assets-tab">
                        <Tabs value="name1"  @on-click="OnFeedbackClcik">
                            <TabPane label="币币账户" name="name1">
                                <div class="tab-list">
                                    <m-table 
                                        @showAssetsName="OnAssetsCharge"
                                        :assetsTurn="assetsTurnOne"
                                        :assetsCarry="assetsCarryOne"
                                        :assetsCharge="assetsChargeOne"
                                        :columns="freeColumns"
                                        :data="freeInviteData" />
                                </div>
                            </TabPane>
                            <TabPane label="合约账户" name="name2">
                                <div class="tab-list">
                                    <m-table 
                                        @showAssetsName="OnAssetsCharge"
                                        :columns="freeColumns"
                                        :data="freeInviteData" />
                                </div>
                                
                            </TabPane>
                            <TabPane label="OTC账户" name="name3">
                                <div class="tab-list">
                                    <m-table 
                                        @showAssetsName="OnAssetsCharge"
                                        :columns="freeColumns"
                                        :data="freeInviteData" />
                                </div>
                            </TabPane>
                            <TabPane label="锁仓账户" name="name4">
                                <div class="tab-list">
                                    <m-table 
                                        @showAssetsName="OnAssetsCharge"
                                        :columns="freeColumnsName4"
                                        :data="freeInviteLockData" />
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    <!-- end -->
                    <!-- 分页 -->
                    <Page :total="Pagetotal" :page-size="Pagesize" @on-change="changePages" show-total />
                </div>
                
            </Col>
        </Row>
         <Modal
            v-model="modalCode"
            :scrollable="true"
            width="300"
            title="充币二维码">
                <div class="m-code">
                    <div id="qrCode" ref="qrCodeUrl" class="code"></div>
                </div>
                <div class="m-footer" slot="footer">
                    <p>请用 app 扫描二维码完成充币</p>
                </div>
        </Modal>
        <Modal
            v-model="modalInvite"
            :scrollable="true"
            title="添加提现地址"
            @on-ok="OninviteOk">
            <p style="padding-bottom: 15px">请输入提现地址:</p>
            <p>
                <Input v-model="inviteValue" placeholder="请输入提现地址" style="width: 300px" />
            </p>
        </Modal>
        <!-- 抽屉修改 -->
        <Drawer
            v-model="valueAssets"
            width="720"
            :mask-closable="false"
            :scrollable="true"
            :transfer="false"
            @on-close="handleSubmit"
        >
            <h2 slot="header" class="font-header">我的资产 - {{valueAssetsTitle}}</h2>
            <div class="m-treaty-box" v-if="OnChargeOne === true">
                <Row>
                    <Col span="18">
                        <div class="m-radio">
                            <span class="font-title">选择币种：</span>
                            <Select v-model="model1" style="width:200px" @on-change="modalChangeAddress">
                                <Option v-for="item in freeInviteData" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
                            </Select>
                        </div>
                        <div class="m-radio">
                            <span class="font-title">链接：</span>
                            <span class="tag-read">{{codeAddress}}</span>
                            <span>
                                <Button type="success" size="small" class="btn"  v-clipboard:copy="codeAddress"  v-clipboard:success="OnCopyClick" @click="" >
                                    复制
                                </Button>
                            </span>
                        </div>
                        <div class="m-radio">
                            <span class="font-title">二维码 :</span>
                            <span>
                                <Button type="success" class="btn" @click="modalCodeAddress" >
                                    立即查看
                                </Button>
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="m-treaty-box" v-if="OnCarryOne === true">
                <Row>
                    <Col span="18">
                        <div class="m-input-wrapper">
                            <Form :model="formLeftCarry" label-position="left" :label-width="100">
                                <FormItem label="选择币种：">
                                    <Select v-model="model1" style="width:200px" @on-change="modalInviteData">
                                        <Option v-for="item in freeInviteData" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="提币地址：">
                                    <Select v-model="model2" style="width:200px">
                                        <Option v-for="item in inviteDataList" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.withdrow_number }}</Option>
                                    </Select>
                                    <span style="margin-left: 30px">
                                        <Button type="success" class="btn" @click="OnInviteDataClick" >
                                            添加地址
                                        </Button>
                                    </span>
                                </FormItem>
                                <h2 class="font-h2">
                                    <!-- 可用：<span class="color-body-c">2225</span> 
                                    限额：<span class="color-body-c">2225</span> -->
                                </h2>
                                <FormItem label="数量：">
                                    <Input v-model="formLeftCarry.input2" @on-change="OnInviteNumberClick"></Input>
                                </FormItem>
                                <FormItem label="手续费：">
                                    <Input v-model="formLeftCarry.input3" disabled>
                                        <div slot="append" style="width: 100px" class="m-select" disabled>
                                            <Select v-model="model1" disabled>
                                                <Option v-for="item in freeInviteData" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
                                            </Select>
                                        </div>
                                    </Input>
                                </FormItem>
                                <FormItem label="到账数量：">
                                    <Input v-model="formLeftCarry.input4" class="m-select" disabled>
                                        <div slot="append" style="width: 100px">
                                            <Select v-model="model1" disabled>
                                                <Option v-for="item in freeInviteData" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
                                            </Select>
                                        </div>
                                    </Input>
                                </FormItem>
                            </Form>
                        </div>
                        <div class="details-btn">
                            <Button type="success" class="btn" @click="OnWithdrawNewList">立即提币</Button>
                        </div>
                        
                    </Col>
                </Row>
            </div>
            <div class="m-treaty-box" v-if="OnTurnOne === true">
                <Row>
                    <Col span="18">
                        <div class="m-input-wrapper">
                            <Row>
                                <Col span="24">
                                    <h2 class="font-h2 font-text">选择币种：</h2>
                                    <div class="text pad-sm">
                                        <!-- modalInviteData 手续费 -->
                                        <Select v-model="model1" style="width:200px" @on-change="modalInviteData">
                                            <Option v-for="item in freeInviteData" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
                                        </Select>
                                    </div>
                                </Col>
                                <Col span="9" offset="4">
                                    <span class="text">从</span>
                                    <Select v-model="modelTurn1" style="width:150px">
                                        <Option v-for="item in cityTurnList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                                    </Select>
                                </Col>
                                <Col span="2">
                                    <div class="m-icon" @click="OnTurnClick">
                                        <Icon type="md-repeat" class="color-body-c" size="22" />
                                    </div>
                                </Col>
                                <Col span="9">
                                    <span class="text">到</span>
                                    <Select v-model="modelTurn2" style="width:150px">
                                        <Option v-for="item in cityTurnLists" :value="item.value" :key="item.value">{{ item.value }}</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Form :model="formLeftTurn" label-position="left" :label-width="100">
                                <h2 class="font-h2">
                                    <!-- 可用：<span class="color-body-c">{{OtcNumber}}</span>  -->
                                </h2>
                                <FormItem label="数量：">
                                    <Input v-model="formLeftTurn.input1" type="number" @on-change=""></Input>
                                </FormItem>
                                <FormItem label="交易密码：">
                                    <Input type="password" v-model="formLeftTurn.input2"></Input>
                                </FormItem>
                                <FormItem label="手续费：">
                                    <Input v-model="formLeftTurn.input3" class="m-select" disabled>
                                        <div slot="append" style="width: 100px">
                                            <Select v-model="model1" disabled>
                                                <Option v-for="item in freeInviteData" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
                                            </Select>
                                        </div>
                                    </Input>
                                </FormItem>
                                <FormItem label="到账数量：">
                                    <Input v-model="formLeftTurn.input4" class="m-select" disabled>
                                        <div slot="append" style="width: 100px">
                                            <Select v-model="model1" disabled>
                                                <Option v-for="item in freeInviteData" :value="item.dc_type_id" :key="item.dc_type_id">{{ item.dc_t_name }}</Option>
                                            </Select>
                                        </div>
                                    </Input>
                                </FormItem>
                            </Form>
                        </div>
                        <div class="details-btn">
                            <Button type="success" class="btn" @click="OnNumberFocusClick">立即划转</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <!-- 资产列表 -->
            <div class="m-treaty-box" v-if="OnInfoOne === true">
                <Row>
                    <Col span="24">
                        <div class="m-input-wrapper">
                            <m-table 
                                :columns="freeInfoColumns"
                                :data="freeInfoData" />
                        </div>
                    </Col>
                </Row>
            </div>
        </Drawer>  
        <Spin size="large" fix v-if="spinShowLoading"></Spin>
    </div>
</template>


<script>
import crypto from 'crypto'
import QRCode from 'qrcodejs2'
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import ivewTableSlots from "@/components/fromMarketList/ivewTableSlots"
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    data() {
        return {
            userName: '',
            sumUstd: '',
            sumCNY: '',

            spinShowLoading: false,
            dclogId: 1,  //类型  bb、otc等

			Pagetotal: 0,//总条数
			Pagesize: 8,//每页显示多少条
            historyData: [],//分页数据的盒子

            freeInviteData: [], //bb、otc等
            // 购买表格 bb、otc等
            freeColumns: [
                {
                    title: "币种",
                    key: 'dc_t_name',
                    slot: "",
                    width: '100px'
                },
                {
                    title: "可用",
                    key: 'user_dc_amount',
                    slot: ""
                },
                {
                    title: "冻结",
                    key: 'user_dc_frozen',
                    slot: ""
                },
                {
                    title: "估值（CNY）",
                    key: 'user_dc_equivalent',
                    slot: ""
                },
                {
                    title: "操作",
                    key: 'assetsMode',
                    slot: "assetsMode"
                },
                {
                    title: "明细",
                    key: '',
                    slot: "assetsInfo",
                    width: '100px'
                },
            ],
            //锁仓 
            freeColumnsName4: [
                {
                    title: "类型",
                    key: 'user_dc_type',
                    slot: "dcType"
                },
                {
                    title: "金额",
                    key: 'user_dc_equivalent',
                    slot: ""
                },
                {
                    title: "日期",
                    key: 'user_dc_create_time',
                    slot: ""
                },
                {
                    title: "明细",
                    key: '',
                    slot: "assetsInfo",
                    width: '100px'
                },

            ],
            //资产明细
            freeInfoColumns: [
                {
                    title: "时间",
                    key: 'user_dc_create_time',
                    slot: ""
                },
                {
                    title: "币种",
                    key: 'dc_t_name',
                    slot: ""
                },
                {
                    title: "类型",
                    key: 'user_dc_type',
                    slot: "dcType"
                },
                {
                    title: "数量",
                    key: 'user_dc_amount',
                    slot: ""
                },
            ],
            freeInfoData: [],
            freeInviteLockData: [], //锁仓
            model1: '',
            model2: '', //提现
            //二维码
            codeAddress: '',
            modalCode: false,
            inviteDataList: [], //提现列表
            modalInvite: false, //提现地址
            inviteValue:'',

            //按钮
            assetsTurnOne: true,
            assetsCarryOne: true,
            assetsChargeOne: true,

            assetsChargeTwo: true,

            assetsTurnThree: true,
            assetsCarryThree: true,
            assetsChargeThree: true,

            //抽屉
            valueAssets: false,
            OnChargeOne: false,
            OnCarryOne: false,
            OnTurnOne: false,
            OnInfoOne: false,

            valueAssetsTitle: '',
            animalCharge: 'OMNI',

            // 提币
            formLeftCarry: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
            },

            //划转
            formLeftTurn: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
            },
            cityOtcList: [
                {value: 'OTC',}
            ],
            cityTurnLists: [
                {value: '币币账户',},
                {value: '合约账户',},
                {value: 'OTC账户',},
            ],
            cityTurnList: [
                {value: '币币账户',},
                {value: '合约账户',},
                {value: 'OTC账户',},
            ],
            modelTurn1:'',
            modelTurn2:'',
        }
    },
    components: {
		'm-table': ivewTableSlots,

    },
    //监听属性 类似于data概念
    computed: {
		//取
        ...mapGetters("localSession", ["addressList"]),
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
		//存
        ...mapMutations("localSession", ['handleAddressList']),
        
        // 表格
        OnInvitationUser() {
            let assetsList = [
                {
                    name: '112',
                    ss: '255',
                },
                {
                    name: '112',
                    ss: '255',
                }
            ];
            let ss = [
                {
                    currency: '',
                    dollar: '',
                },
                {
                    currency: '',
                    dollar: '',
                },
            ];
            for (let index = 0; index < assetsList.length; index++) {
                ss[index].currency = assetsList[index].name;
                ss[index].dollar = assetsList[index].ss;
                this.freeData = ss;
                console.log(ss);
            }
        },

        handleSubmit() {
            //抽屉清除记录
            this.model1 = '';
            this.model2 = '';
            this.codeAddress = '';

            this.formLeftTurn.input1 = '';
            this.formLeftTurn.input2 = '';
            this.formLeftCarry.input4 = '';
            
            this.modelTurn1 = '';
            this.modelTurn2 = '';

            if (this.OnChargeOne === true) {
                this.OnChargeOne = false;
            }
            if (this.OnCarryOne === true) {
                this.OnCarryOne = false;
            }
            if (this.OnTurnOne === true) {
                this.OnTurnOne = false;
            }
            if (this.OnInfoOne === true) {
                this.OnInfoOne = false;
            }
        },
        //获取钱包列表
        OnFeedbackClcik(name) {
            //1、查询总资产
            axios.post('', {
                "func": "dc.find.assets",
                "data": {
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let freeData = res.data.data.date;
                    this.sumCNY = freeData.sum_CNY;
                    this.sumUstd = freeData.sum_ustd;
                } 
                //console.log(res);
            })
            .catch( res => {console.log(res);});
            //2、查询用户信息
            axios.post('', {
                "func": "user.user.findUser",
                "data": {
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let freeData = res.data.data.date;
                    this.userName = freeData.user_name; //用户名
                } 
                //console.log(res);
            })
            .catch( res => {console.log(res);});

            //3、查询钱包表格
            if (name === 'name1') {
                this.dclogId = 1;
                this.spinShowLoading = true;
                axios.post('', {
                    "func": "dc.find.bb",
                    "data": {
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let freeData = res.data.data.date;
                        // 分页-保存取到的所有数据到数组中
                        this.historyData = freeData.array;
                        this.Pagetotal = freeData.array.length; //获取数组长度
                        // 初始化显示，小于每页显示条数，全部显示，大于每页显示条数，取前每页条数显示
                        if(freeData.array.length < this.Pagesize){
                            this.freeInviteData = this.historyData;
                        } else {
                            this.freeInviteData = this.historyData.slice(0,this.Pagesize);
                        }
                        if (freeData.array.length === 0) {
                            this.PagesizeShow=true;
                        }
                        this.spinShowLoading = false;
                    }
                    //console.log(res);
                })
                .catch( res => {
                    this.$Message.error({
                        content: '登录信息过期，请重新登录',
                        duration: 3,
                        onClose: () => {
                            this.spinShowLoading = false;
                        }
                    });
                    console.log(res);})

            } else if (name === 'name2') {
                this.dclogId = 2;
                this.spinShowLoading = true;
                axios.post('', {
                    "func": "dc.find.contract",
                    "data": {
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let freeData = res.data.data.date;
                        // 分页-保存取到的所有数据到数组中
                        this.historyData = freeData.array;
                        this.Pagetotal = freeData.array.length; //获取数组长度
                        // 初始化显示，小于每页显示条数，全部显示，大于每页显示条数，取前每页条数显示
                        if(freeData.array.length < this.Pagesize){
                            this.freeInviteData = this.historyData;
                        } else {
                            this.freeInviteData = this.historyData.slice(0,this.Pagesize);
                        }
                        if (freeData.array.length === 0) {
                            this.PagesizeShow=true;
                        }
                        this.spinShowLoading = false;
                    } 
                    //console.log(res);
                })
                .catch( res => {
                    this.$Message.error({
                        content: '登录信息过期，请重新登录',
                        duration: 3,
                        onClose: () => {
                            this.spinShowLoading = false;
                        }
                    });
                    console.log(res);})

            } else if (name === 'name3') {
                this.dclogId = 3;
                this.spinShowLoading = true;
                axios.post('', {
                    "func": "dc.find.otc",
                    "data": {
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let freeData = res.data.data.date;
                        // 分页-保存取到的所有数据到数组中
                        this.historyData = freeData.array;
                        this.Pagetotal = freeData.array.length; //获取数组长度
                        // 初始化显示，小于每页显示条数，全部显示，大于每页显示条数，取前每页条数显示
                        if(freeData.array.length < this.Pagesize){
                            this.freeInviteData = this.historyData;
                        } else {
                            this.freeInviteData = this.historyData.slice(0,this.Pagesize);
                        }
                        if (freeData.array.length === 0) {
                            this.PagesizeShow=true;
                        }
                        this.spinShowLoading = false;
                    }
                    //console.log(res);
                })
                .catch( res => {
                    this.$Message.error({
                        content: '登录信息过期，请重新登录',
                        duration: 3,
                        onClose: () => {
                            this.spinShowLoading = false;
                        }
                    });
                    console.log(res);})

            } else {
                this.dclogId = 4;
                this.spinShowLoading = true;
                axios.post('', {
                    "func": "dc.find.lock",
                    "data": {
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let freeData = res.data.data.date;
                        // 分页-保存取到的所有数据到数组中
                        this.historyData = freeData.array;
                        this.Pagetotal = freeData.array.length; //获取数组长度
                        // 初始化显示，小于每页显示条数，全部显示，大于每页显示条数，取前每页条数显示
                        if(freeData.array.length < this.Pagesize){
                            this.freeInviteLockData = this.historyData;
                        } else {
                            this.freeInviteLockData = this.historyData.slice(0,this.Pagesize);
                        }
                        if (freeData.array.length === 0) {
                            this.PagesizeShow=true;
                        }
                        this.spinShowLoading = false;
                    }
                    //console.log(res);
                })
                .catch( res => {
                    this.$Message.error({
                        content: '登录信息过期，请重新登录',
                        duration: 3,
                        onClose: () => {
                            this.spinShowLoading = false;
                        }
                    });
                    console.log(res);})

            }
            
        },
        //--------------------------------- 获取列表结束 ---------------------------------------
		//分页
		changePages(index) {
			var _start = ( index - 1 ) * this.Pagesize;
			var _end = index * this.Pagesize;
			this.freeInviteData = this.historyData.slice(_start,_end);
        },
		changeLockPages(index) {
			var _start = ( index - 1 ) * this.Pagesize;
			var _end = index * this.Pagesize;
			this.freeInviteLockData = this.historyData.slice(_start,_end);
        },
        //表格 -按钮
        OnAssetsCharge(index, id) {
            if (id === 1) {
                this.valueAssetsTitle = '充币';
                this.valueAssets = true;
                this.OnChargeOne = true;

            } else if (id === 2) {
                this.valueAssetsTitle = '提币';
                this.valueAssets = true;
                this.OnCarryOne = true;
                //this.handleAddressList(id);

            } else if (id === 3) {
                this.valueAssetsTitle = '划转';
                this.valueAssets = true;
                this.OnTurnOne = true;
                // console.log(index);
                // console.log(id);
            } else {
                this.valueAssetsTitle = '明细';
                this.valueAssets = true;
                this.OnInfoOne = true;
                let data = index;
                let id = this.dclogId;
                axios.post('', {
                    "func": "dc.find.dclog",
                    "data": {
                        "user_dc_type": id,
                        "week_condition": 0,
                        "user_dc_log_type": 1,
                        "user_dc_log_code": data.dc_t_simple_code,
                        "pagNumber": 0,
                        "pagSize": 10,
                        "pagCount": 0
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let freeData = res.data.data.date;
                        this.freeInfoData = freeData.array;
                    } 
                    //console.log(res);
                })
                .catch( res => {console.log(res);})
            }
            
        },
        OnInviteNumberClick(event) {
            let value = parseFloat(event.target.value);
            let value2 = this.formLeftCarry.input3;
            this.formLeftCarry.input4 = value - value2;
            
        },
        // 查询提现列表
        modalInviteData() {
            let model1 = this.model1;
            // 列表
            axios.post('', {
                "func": "dc.withdraw.addressList",
                "data": {
                    "dc_type_id": model1,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let inviteDataList = res.data.data.date;
                    this.inviteDataList = inviteDataList;
                } 
                //console.log(res);
            })
            .catch( res => {console.log(res);})
            // 手续费
            axios.post('', {
                "func": "system.find.fee",
                "data": {
                    "dc_type_id": model1,
                    "mark": "hand"
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    this.formLeftCarry.input3 = res.data.data.date.system_value;
                } 
                //console.log(res);
            })
            .catch( res => {console.log(res);})

        },
        // 添加提现地址 1
        OnInviteDataClick() {
            if(this.model1 === '') {
                this.$Message.info({
                    content: '请选择提现币种',
                    duration: 3
                });

            } else {
                 this.modalInvite = true;
            }
           
        },
        // 添加提现地址 2
        OninviteOk() {
            let model1 = this.model1;
            let inviteValue = this.inviteValue;
            //console.log(model1);
            if (inviteValue === '') {
                this.$Message.info({
                    content: '提现地址不能为空',
                    duration: 3,
                    onClose: () => {
                    }
                });

            } else {
                axios.post('', {
                    "func": "dc.withdraw.newAddress",
                    "data": {
                        "withdrow_number": inviteValue,
                        "dc_type_id": model1,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: '添加成功',
                            duration: 3
                        });

                    } else {
                        this.$Message.info({
                            content: res.data.data.msg,
                            duration: 3
                        });
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);})

            }
            
        },
        // 添加提现地址 3
        OnWithdrawNewList() {
            let model1 = this.model1;
            let num = this.formLeftCarry.input2;
            
            if (model1 === '' || num === '') {
                this.$Message.info({
                    content: '请选择提现信息',
                    duration: 3
                });
            } else {
                axios.post('', {
                    "func": "dc.withdraw.New",
                    "data": {
                        "dc_type_id": model1,
                        "o_price": num,
                        "withdrow_id": 1,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.msg,
                            duration: 3
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
            }
        },
        //划转
        OnNumberFocusClick() {
            let model1 = this.model1;
            let inputNumber = this.formLeftTurn.input1;
            let inputPaw = this.formLeftTurn.input2;
            
            let modelTurn1 = this.modelTurn1;
            let modelTurn2 = this.modelTurn2;
            let dcType;
            let dcTypeTo;

            if (modelTurn1 === "币币钱包") {
                dcType = 1;
            } else if (modelTurn1 === "合约钱包") {
                dcType = 2;
            } else {
                dcType = 3;
            }

            if (modelTurn2 === "币币钱包") {
                dcTypeTo = 1;
            } else if (modelTurn2 === "合约钱包") {
                dcTypeTo = 2;
            } else {
                dcTypeTo = 3;
            }

			let md5 = crypto.createHash('md5');
            md5.update(inputPaw);
            let inputPawMd5 = md5.digest('hex');
            //console.log(ss);
            
            
            if (model1 === '' || inputNumber === '' || inputPaw === '' ) {
                this.$Message.info({
                    content: '请选择划转信息',
                    duration: 3
                });

            } else {
                axios.post('', {
                    "func": "dc.transfer.New",
                    "data": {
                        "user_dc_type": dcType,
                        "user_dc_type_to": dcTypeTo,
                        "user_dc_amount": inputNumber,
                        "dc_type_id": model1,
                        "user_pay_password": inputPawMd5
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {

                    } else {
                        this.$Message.error({
                            content: res.data.data.msg,
                            duration: 3
                        });
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);})

            }
        },
        //划转-换位置
        OnTurnClick() {
            var temp; // 声明了一个临时变量为空
            var apple1 = this.modelTurn1;
            var apple2 = this.modelTurn2;
            if (apple1 !== '' && apple2 !== '') {
                temp = apple1; // 把右边给左边
                this.modelTurn1 = apple2;
                this.modelTurn2 = temp;
            } else {
                this.$Message.warning('请选择划转账户');
            }
            
        },
        //充值的币种-二维码
        modalChangeAddress(value) {
            axios.post('', {
                "func": "dc.recharge.address",
                "data": {
                    "dc_type_id": value,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let code = res.data.data.date;
                    this.codeAddress = code;
                    this.creatQrCode(code);
                } else {
                    
                    this.$Message.info({
                        content: res.data.data.msg,
                        duration: 3
                    });
                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})
            
        },
        //点击复制
        OnCopyClick(e) {
            this.$Message.success({
                content: '复制成功',
                duration: 3
            });
            //console.log('复制成功！');
        },
        //弹出充值二维码
        modalCodeAddress() {
            this.modalCode = true;
        },
        creatQrCode(id) {
            //console.log(id);
            if (id === '') {
                this.$Message.info({
                    content: '请选择充值币种',
                    duration: 3
                });
            } else {
                let qrCodeUrl = this.$refs.qrCodeUrl;
                let qrcode = new QRCode(qrCodeUrl, {
                    text: id,
                    width: 120,
                    height: 120,
                    colorDark: "#333333", //二维码颜色
                    colorLight: "#ffffff", //二维码背景色
                    correctLevel: QRCode.CorrectLevel.H
                })
            }
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //this.creatQrCode();
        this.OnFeedbackClcik('name1');
    },
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
/deep/.ivu-tabs-nav-scroll {text-align: initial;}
//抽屉
.ivu-drawer-header .font-header {
    padding: 5px 0;
    font-size: $font-size-base;
    font-weight: bold;
}
/deep/.ivu-modal-content {
    .code img {margin: auto;}
    .m-footer {text-align: center;}
}
/deep/.ivu-form-item {
    .ivu-input[disabled], fieldset[disabled] .ivu-input {
        background-color: #fff;
    }
    &:last-child {
        .ivu-input[disabled], fieldset[disabled] .ivu-input, .ivu-input-group-append, .ivu-input-group-prepend {
            border-color: #e2e6f7;
            background-color: #eef1ff;
        }
    }
}
    
/deep/.ivu-form .ivu-form-item-label {font-size: $font-size-sm;}


.assets {
    .details-h2 {
        padding: 15px 30px;
        margin-bottom: 15px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
    }
    // 抽屉
    .m-treaty-box {
        .font-title {
            font-size: $font-size-sm;
        }
        .m-radio {
            padding: 15px 0;
            .ivu-radio-wrapper {
                font-size: $font-size-base;
                margin-right: 40px;
            }
            span {
                display: inline-block;
                vertical-align: middle;
                padding-right: 15px;
            }
        }
        .m-input-wrapper {
            padding: 20px 0;
            .m-select {
                /deep/.ivu-select-disabled .ivu-select-selection:hover {
                    border-color: #dcdee2 !important;
                    border-left-color: transparent !important;
                    border-right-color: transparent !important;
                }
            }
            .font-h2 {
                padding: 15px 0 10px;
                text-align: right;
                font-size: $font-size-mini;
            }
            .text {
                display: inline-block;
                vertical-align: middle;
                padding-right: 15px;
            }
            .m-icon {
                padding-top: 4px;
                padding-left: 5px;
                cursor: pointer;
            }
            .font-text {
                display: inline-block;
                vertical-align: middle;
                min-width: 110px;
                font-size: $font-size-sm;
                text-align: left;
            }
        }
    }
    .m-assets-box {
        min-height: 600px;
        padding: 15px 30px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        .m-assets-tab {
            min-height: 532px;
            padding-bottom: 30px;
        }
        .m-assets-text {
            position: relative;
            .font-h2 {
                padding: 10px 0;
                font-size: $font-size-base;
                span {
                    font-weight: bold;
                }
            }
            .btn {
                @include tb;
                right: 0;
            }
        }
    }
    .details-btn {
        padding-top: 50px;
        text-align: center;
        .btn {
            width: 230px;
            box-shadow: 0 2px 8px rgba(151, 151, 151, .4);
        }
    }
}

</style>