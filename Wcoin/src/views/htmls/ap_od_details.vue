<template>
    <!-- otc 交易订单 -详情 -->
    <div class="page">
        <m-nav v-bind:navList="navList" />
        <div class="m-container">
            <Row>
                <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                    <div>
                        <h2 class="details-h2">交易订单
                            <Button type="success" class="btn" to="/order">
                                <p>返回订单列表</p>
                            </Button>
                        </h2>
                    </div>
                </Col>
                <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                    <div class="m-details-box">
                        <div class="details-text-lf">
                            <!-- 表单信息 -->
                            <div class="text-lf-hd">
                                <p class="type-sp">用户姓名：
                                    <span class="color-sp font-wb">{{OTCdata.user_real_name}}</span>
                                </p>
                                <p class="type-sp">状态：<span class="color-sp font-wb">{{OTCdata.orderStatusName}}</span></p>
                                <p>交易金额：<span class="color-body-c font-wb">{{OTCdata.otc_tran_amount}} {{OTCdata.currency_name}}</span></p>
                                <p>手机号码：<span class="color-sp">{{OTCdata.user_phone}}</span></p>
                                <p>数量：<span class="color-sp">{{OTCdata.otc_tran_num}}</span></p>
                                <p>单价：<span class="color-body-c font-wb">{{OTCdata.otc_tran_unit_price}} {{OTCdata.currency_name}}</span></p>
                                <p>付款备注：
                                    <span class="color-sp" v-if="OTCdata.sell_auto_message == null">无</span>
                                    <span class="color-sp" v-else>{{OTCdata.sell_auto_message}}</span>
                                </p>
                            </div>
                            <!-- 付款方式 -->
                            <div class="text-lf-bd">
                                <div class="text-lf-title">
                                    <p class="font-wb">
                                        查看支付方式:
                                    </p>
                                    <div class="img-box">
                                        <div v-if="OTCdata.sell_pay_type === '1'" class="m-play-img">
                                            <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png" @click="OnFindPaymentMethod(2)">
                                        </div>
                                        <div v-if="OTCdata.sell_pay_type === '2'" class="m-play-img">
                                            <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png" @click="OnFindPaymentMethod(3)">
                                        </div>
                                        <div v-if="OTCdata.sell_pay_type === '3'" class="m-play-img">
                                            <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png" @click="OnFindPaymentMethod(2)">
                                            <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png" @click="OnFindPaymentMethod(3)">
                                        </div>
                                        <div v-if="OTCdata.sell_pay_type === '4'" class="m-play-img">
                                            <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png" @click="OnFindPaymentMethod(1)">
                                        </div>
                                        <div v-if="OTCdata.sell_pay_type === '5'" class="m-play-img">
                                            <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png" @click="OnFindPaymentMethod(2)">
                                            <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png" @click="OnFindPaymentMethod(1)">
                                        </div>
                                        <div v-if="OTCdata.sell_pay_type === '6'" class="m-play-img">
                                            <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png" @click="OnFindPaymentMethod(3)">
                                            <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png" @click="OnFindPaymentMethod(1)">
                                        </div>
                                        <div v-if="OTCdata.sell_pay_type === '7'" class="m-play-img">
                                            <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png" @click="OnFindPaymentMethod(3)">
                                            <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png" @click="OnFindPaymentMethod(2)">
                                            <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png" @click="OnFindPaymentMethod(1)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 付款提示 -->
                            <div>
                                <div class="text-lf-ft" v-if="OTCdata.orderStatusName === '待付款'">
                                    <h2 class="color-body-c">提醒</h2>
                                    <p> 请在20分钟内完成付款，并点击确认付款，<span class="color-reg">超时将自动取消订单。</span></p>
                                </div>
                                <div class="text-lf-ft" v-if="OTCdata.orderStatusName === '待付款'">
                                    <h2 class="color-body-c">提醒</h2>
                                    <p> 请在30分钟内完成付款，并点击确认付款，<span class="color-reg">超时将自动取消订单。</span></p>
                                </div>
                                <div class="text-lf-ft" v-if="OTCdata.orderStatusName === '待放行'">
                                    <h2 class="color-body-c">提醒</h2>
                                    <p> 卖家将在12小时内完成审核，并确认放行，超时将自动完成订单。</p>
                                </div>
                                <div class="text-lf-ft" v-if="OTCdata.orderStatusName === '后台审核失败'">
                                    <h2 class="color-body-c">提醒</h2>
                                    <p> 该订单已冻结，我们工作人员会尽快核实该订单的情况，并和双方联系，请保持电话畅通。</p>
                                </div>
                                <div class="text-lf-ft" v-if="OTCdata.orderStatusName === '已申述'">
                                    <h2 class="color-body-c">提醒</h2>
                                    <p>该订单已冻结，我们工作人员会尽快核实该订单的情况，并和双方联系，请保持电话畅通。</p>
                                </div>
                            </div>
                        </div>
                        <!-- 聊天 -->
                        <div class="details-text-rg">
                            <m-chat />
                        </div>
                    </div>
                </Col>
                <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                    <div v-if="OTCdata.orderBtnName != null">
                        <div class="details-btn">
                            <Button type="success" :size="buttonSize" class="btn" @click="OnPurchaseClick(OTCdata.orderBtnName)">{{OTCdata.orderBtnName}}</Button>
                        </div>
                        <div class="details-btn" v-if="OTCdata.orderBtnNameDel">
                            <Button type="success" :size="buttonSize" class="btn" @click="OnPurchaseClick(OTCdata.orderBtnNameDel)">{{OTCdata.orderBtnNameDel}}</Button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="details-btn">
                            <Button type="success" :size="buttonSize" class="btn" disabled>暂无更多操作</Button>
                        </div>

                    </div>
                </Col>
            </Row>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <!-- 抽屉修改 -->
        <Drawer
            title="OTC-我要申诉"
            v-model="valueSecurity"
            width="720"
            :mask-closable="false"
            :transfer="false"
            @on-close=""
        >
            <div class="m-details-box">
                <div class="details-text-hd">
                    <h2 class="font-h2">平台提示</h2>
                    <div class="details-text">
                        <div class="text-p">提起申诉后资产将会被冻结，平台将会介入本次交易，直至申诉结束。恶意申诉这将被冻结账户，付款成功或者取消申诉后 <span class="color-reg">5分钟</span> 才可以发起申诉。</div>
                        <div class="text-p">离结束仅剩：
                            <!-- 倒计时 时间戳 -->
                            <count-down endTime="1564634238" :callback="callback" endText="00:00"></count-down> 
                        </div>
                    </div>
                </div>
                <div class="details-text-bd">
                    <h2 class="font-h2">申诉类型</h2>
                    <div class="m-select">
                        <Select v-model="modelAppeal" style="width:220px" placeholder="请选择申诉类型">
                            <Option v-for="item in cityAppealList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
                    </div>
                    <h2 class="font-h2">申诉说明</h2>
                    <div class="m-textarea">
                        <Input v-model="textareaAppeal" type="textarea" :rows="4" :autosize="{minRows: 4,maxRows: 4}" placeholder="请输入您的申诉内容" />
                    </div>
                </div>
                <div class="details-btn">
                    <Button type="success" :size="buttonSize" class="btn" @click="OnFailureToPayClick">确认提交</Button>
                </div>
            </div>
        </Drawer> 
        <Modal v-model="modalPass" :mask-closable="false" width="400">
            <p slot="header" style="color:#6d7ecf;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>验证交易密码</span>
            </p>
            <div>
                <Input type="password" v-model="valuePass" placeholder="请输入6位交易密码" :maxlength="6" style="width: 300px" />
            </div>
            <div slot="footer">
                <Button type="success" size="large" @click="OnSafetyPasswordClick">确定</Button>
            </div>
        </Modal>
        <Modal v-model="modalCode" :mask-closable="false" width="400">
            <p slot="header" style="color:#6d7ecf;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>校验验证码</span>
            </p>
            <div class="m-treaty-box">
                <Input v-model="valueIp" style="margin-bottom: 15px" placeholder="请输入手机号"></Input>
                <Input v-model="valueCode" placeholder="请输入验证码">    
                    <!-- 验证码 -->
                    <Button slot="append" @click="OnUserCodeClick" :maxlength="6" class="m-code-btn">
                        <span v-if="sendMsgDisabled === false">获取验证码</span>
                        <span style="color: #6d7ecf" v-else>{{time+'秒后获取'}}</span>
                    </Button>
                </Input>
            </div>
            <div slot="footer">
                <Button type="success" size="large" @click="OnSafetyCodeClick">确定</Button>
            </div>
        </Modal>
        <Modal v-model="modalText" :mask-closable="false" width="400">
            <p slot="header" style="color:#6d7ecf;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>校验谷歌验证</span>
            </p>
            <div class="m-treaty-box">
                <Input v-model="valueText" placeholder="请输入谷歌验证码" :maxlength="15" style="width: 300px" />
            </div>
            <div slot="footer">
                <Button type="success" size="large" @click="OnGogleCodeClick">确定</Button>
            </div>
        </Modal>
        <!-- 支付信息 -->
        <Modal v-model="modalZUserID" :mask-closable="false" width="400">
            <p slot="header" style="color:#6d7ecf;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>支付信息</span>
            </p>
            <div class="m-treaty-box" v-if="ZUserID === true">
                <p class="font-h2">收款人： {{ZUserName}}</p>
                <p class="font-h2">收款人： {{ZUserNum}}</p>
                <p class="font-h2">支付状态：
                    <span v-if="deleteStatus == 0">有效</span>
                    <span v-else>无效</span>
                </p>
                <p class="font-h2">
                    <img :src="imgUrl" alt="zhifu.png" class="img">
                </p>
            </div>
            <div class="m-treaty-box" v-else>
                <p class="font-h2">收款人： {{ZUserName}}</p>
                <p class="font-h2">开户行： {{ZUserNum}}</p>
                <p class="font-h2">支行： {{ZUserSub}}</p>
                <p class="font-h2">卡号： {{ZUsernumber}}</p>
                <p class="font-h2">支付状态：
                    <span v-if="deleteStatus == 0">有效</span>
                    <span v-else>无效</span>
                </p>
            </div>
            <div slot="footer">
                <!-- <Button type="success" size="large">确定</Button> -->
            </div>
        </Modal>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import countDownTime from "@/components/countDownTime/countDownTime"
import SellingChats from "@/components/SellingChats/SellingChats"

import crypto from 'crypto'
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import {regs, regex, reEmail, myreg, regNum} from '@/assets/js/regExps.js'

export default {
    data() {
        return {
            OTCdata: '',  //当前数据

            //多选
            animal: ['twitter'],
            disabledTrue: false,

            spinShow: false,
            otcJudgeText: '', //第二步-按钮
            judgeText: '', //第一步-提醒

            buttonSize: 'large',
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
            // 申诉
            valueSecurity: false,
            modelAppeal: '',
            textareaAppeal: '',
            cityAppealList: [
                {value: '我已完成付款，买家未及时放行'},
                {value: '我向卖家多转了钱'},
                {value: '其他'},
            ],

            findUserId: '',
            //交易密码
            modalPass: false,
            valuePass: '',

            dataAccountCode: [],
            modalCode: false,

            valueIp: '',
            valueCode: '',
            time: 60, // 发送验证码倒计时
            sendMsgDisabled: false,

            codeId: '', //手机 邮箱 验证
            codeEail: '',
            codeIdEail: '',
            codeIdCode: '',
            codeEailCode: '',

            modalText: false, //谷歌
            valueText: '',

            // 支付码
            modalZUserID: false,
            ZUserID: false,
            ZUserName: '',     
            ZUserNum: '', 
            ZUserSub: '',
            ZUsernumber: '',
            imgUrl: '',
            deleteStatus: '',
        }
    },
    components: {
        'm-nav': NavBar,
        'm-chat': SellingChats,
        'count-down': countDownTime,

    },
    //监听属性 类似于data概念
    computed: {
		//取
		...mapGetters("localSession", ["judgeTexts"]),
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
		//存
        ...mapMutations("localSession", ['handleOtcJudgeText', 'handleJudgeText']),
        // 根据订单ID查询支付信息
        OnFindPaymentMethod(id) {
            let ids = id;
            let data = this.OTCdata;
            if (id === 1) {
                axios.post('', {
                    "func": "app.currency.findPaymentMethod",
                    "data": {
                        "otc_transaction_id": data.otc_transaction_id,
                        "sell_pay_type": id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let data = res.data.data.date;
                        this.ZUserName = data.withdrow_name;
                        this.ZUserNum = data.withdrow_number;
                        this.imgUrl = data.withdrow_payment_code;
                        this.deleteStatus = data.withdrow_delete_status

                        this.modalZUserID = true;
                        this.ZUserID = true;
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);})

            } else if (id === 2) {
                axios.post('', {
                    "func": "app.currency.findPaymentMethod",
                    "data": {
                        "otc_transaction_id": data.otc_transaction_id,
                        "sell_pay_type": id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let data = res.data.data.date;
                        this.ZUserName = data.withdrow_name;
                        this.ZUserNum = data.withdrow_number;
                        this.imgUrl = data.withdrow_payment_code;
                        this.deleteStatus = data.withdrow_delete_status

                        this.modalZUserID = true;
                        this.ZUserID = true;
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);})
            } else {
                axios.post('', {
                    "func": "app.currency.findPaymentMethod",
                    "data": {
                        "otc_transaction_id": data.otc_transaction_id,
                        "sell_pay_type": id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        let data = res.data.data.date;
                        this.ZUserName = data.withdrow_name;
                        this.ZUserNum = data.withdrow_bank_account;
                        this.ZUserSub = data.withdrow_bank_subbranch;
                        this.ZUsernumber = data.withdrow_number;
                        this.deleteStatus = data.withdrow_delete_status
                        
                        this.modalZUserID = true;
                        this.ZUserID = false;
                    }
                    //console.log(res);
                })
                .catch( res => {console.log(res);})
                
            }
        },
        //确认付款、出售 提交按钮
        OnPurchaseClick(text) {
            let name = text; //
            let data = this.OTCdata;
            //1.0、查询开启的安全验证方式
            axios.post('', {
                "func": "app.safetyCenter.findUserAccount",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let dataAccountCode = res.data.data.date;
                    this.dataAccountCode = dataAccountCode;
                    
                    let id = dataAccountCode.user_account_security;
                    if (id == 1) {
                        this.codeId = 1;
                    } else if (id == 2) {
                        this.codeEail = 2;
                    } else if (id == 5 || id == 7) {
                        this.codeIdCode = 1;
                    } else if (id == 6) {
                        this.codeEailCode = 2;
                    } 
                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})

            if (name === '确认支付') {
                //1.1、输入交易密码
                this.findUserId = 1;
                this.modalPass = true;

            } else if (name === '重新确认支付') {
                this.findUserId = 2;
                this.modalPass = true;

            } else if (name === '确认放行') {
                this.findUserId = 3;
                this.modalPass = true;
                
            } else if (name === '取消订单') {
                axios.post('', {
                    "func": "app.currency.cancellationOfOrder",
                    "data": {
                        "otc_transaction_id": data.otc_transaction_id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
						this.$Message.info({
							content: res.data.data.date,
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

            } else if (name === '平台述讼') {
                this.valueSecurity = true;

            } else if (name === '支付有误(驳回)') {
                axios.post('', {
                    "func": "app.order.rejectionOfOrders",
                    "data": {
                        "otc_transaction_id": data.otc_transaction_id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
						this.$Message.info({
							content: res.data.data.date,
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

            } else {
                this.$Message.info({
                    content: '暂无操作',
                    duration: 3
                });
            }
        },
        //申诉
        OnFailureToPayClick() {
            let modelAppeal = this.modelAppeal;
            let textareaAppeal = this.textareaAppeal;
            let data = this.OTCdata;

            if (modelAppeal === '' || textareaAppeal === '') {
                this.$Message.info({
                    content: '请输入申诉信息',
                    duration: 3
                });
            } else {
                axios.post('', {
                    "func": "app.order.failureToPay",
                    "data": {
                        "otc_transaction_id": data.otc_transaction_id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
						this.$Message.info({
							content: res.data.data.date,
							duration: 3,
							onClose: () => {
                                this.modelAppeal = '';
                                this.textareaAppeal = '';
							}
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
        //1.2 验证支付密码是否正确
        OnSafetyPasswordClick() {
            let value = this.valuePass;
            //密码加密
            let md5 = crypto.createHash('md5');
            md5.update(value);
            let md5Pws = md5.digest('hex');

            if (value === '') {
                this.$Message.info({
                    content: '请输入验证码',
                    duration: 3
                });

            } else {
                axios.post('', {
                    "func": "app.safetyCenter.judgingTradingPassword",
                    "data": {
                        "user_pay_password": md5Pws,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
							onClose: () => {
                                this.valuePass='';
                                this.modalPass=false;
                                this.modalCode=true;
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
                .catch( res => {console.log('失败')})

            }

        },
        //2.0 验证安全中心
        OnSafetyCodeClick() {
            let id = this.codeId;
            let eail = this.codeEail;
            let codeIdCode = this.codeIdCode;
            let codeEailCode = this.codeEailCode;

            let ip = this.valueIp;
            let iphone = this.valueCode;

            if (iphone === '' || ip === '') {
                this.$Message.info({
                    content: '请输入验证信息',
                    duration: 3
                });
            } else if (id === 1) {
                //单个手机验证
                axios.post('', {
                    "func": "app.safetyCenter.verification",
                    "data": {
                        "user_account_fraction": 1,
                        "code": iphone,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
							onClose: () => {
                                this.uploadPaymentVouchers();
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
                .catch( res => {console.log('失败')})

            } else if (eail === 2) {
                //单个邮箱验证
                axios.post('', {
                    "func": "app.safetyCenter.verification",
                    "data": {
                        "user_account_fraction": 2,
                        "code": iphone,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
							onClose: () => {
                                this.uploadPaymentVouchers();
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
                .catch( res => {console.log('失败')})

            } else if (codeIdCode === 1) {
                //手机、谷歌验证
                axios.post('', {
                    "func": "app.safetyCenter.verification",
                    "data": {
                        "user_account_fraction": 1,
                        "code": iphone,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
							onClose: () => {
                                this.modalCode = false;
                                this.modalText = true;
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
                .catch( res => {console.log('失败')})

            } else if (codeEailCode === 2) {
                //邮箱、谷歌验证
                axios.post('', {
                    "func": "app.safetyCenter.verification",
                    "data": {
                        "user_account_fraction": 2,
                        "code": iphone,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
							onClose: () => {
                                this.modalCode = false;
                                this.modalText = true;
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
                .catch( res => {console.log('失败')})
            }

        },
        //2.1 最后 谷歌验证
        OnGogleCodeClick() {
            let iphone = this.valueText;
            if (iphone === '') {
                this.$Message.info({
                    content: '请输入验证码',
                    duration: 3
                });
            } else {
                axios.post('', {
                    "func": "app.safetyCenter.verification",
                    "data": {
                        "user_account_fraction": 3,
                        "code": iphone,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
							onClose: () => {
                                this.uploadPaymentVouchers();
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
                .catch( res => {console.log('失败')})

            } 
        },

        //3.0 最后确认收款
        uploadPaymentVouchers() {
            let id = this.findUserId;
            let data = this.OTCdata;
            if (id === 1) {
                //收款
                axios.post('', {
                    "func": "app.order.uploadPaymentVouchers",
                    "data": {
                        "user_account_fraction": data.otc_transaction_id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.valueCode = '';
                                this.valueText = '';
                                this.modalCode = false;
                                this.modalText = false;
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
                .catch( res => {console.log('失败')})

            } else if (id === 2) {
                // 重新支付
                axios.post('', {
                    "func": "app.order.updateUploadPaymentVouchers",
                    "data": {
                        "user_account_fraction": data.otc_transaction_id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.valueCode = '';
                                this.valueText = '';
                                this.modalCode = false;
                                this.modalText = false;
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
                .catch( res => {console.log('失败')})

            } else if (id === 3) {
                // 放行
                axios.post('', {
                    "func": "app.order.confirmationOfOrder",
                    "data": {
                        "user_account_fraction": data.otc_transaction_id,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.valueCode = '';
                                this.valueText = '';
                                this.modalCode = false;
                                this.modalText = false;
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
                .catch( res => {console.log('失败')})

            }
            

        },
        //支付发送短信
        OnUserCodeClick() {
            // codeId: '', //验证
            let id = this.codeId;
            let eail = this.codeEail;
            let codeIdCode = this.codeIdCode;
            let codeEailCode = this.codeEailCode;

            let iphone = this.valueIp;
            if (iphone === '') {
                this.$Message.info({
                    content: '发送验证码有误',
                    duration: 3
                });
            } else {
                if (id === 1 || codeIdCode === 1) {
                    if (!myreg.test(iphone)) {
                        this.$Message.info({
                            content: '手机格式有误',
                            duration: 3
                        });
                    } else {
                        //console.log('手机');
                        axios.post('', {
                            "func": "app.safetyCenter.SMS",
                            "data": {
                                "type": 7,
                                "user_phone": iphone,
                                "user_mail": '',
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                //执行倒计时
                                let me = this;
                                me.sendMsgDisabled = true;
                                let interval = window.setInterval(function() {
                                    if ((me.time--) <= 0) {
                                        me.time = 60;
                                        me.sendMsgDisabled = false;
                                        window.clearInterval(interval);
                                    }
                                }, 1000);
                            } else {
                                this.$Message.error({
                                    content: res.data.data.msg,
                                    duration: 3,
                                });
                            }
                            //console.log(res);
                        })
                        .catch( res => {console.log('失败')})
                    }

                } else if (eail === 2 || codeEailCode === 2) {
                    if (!reEmail.test(iphone)) {
                        this.$Message.info({
                            content: '邮箱格式有误',
                            duration: 3
                        });
                    } else {
                        axios.post('', {
                            "func": "app.safetyCenter.SMS",
                            "data": {
                                "type": 7,
                                "user_phone": '',
                                "user_mail": iphone,
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                //执行倒计时
                                let me = this;
                                me.sendMsgDisabled = true;
                                let interval = window.setInterval(function() {
                                    if ((me.time--) <= 0) {
                                        me.time = 60;
                                        me.sendMsgDisabled = false;
                                        window.clearInterval(interval);
                                    }
                                }, 1000);
                            } else {
                                this.$Message.error({
                                    content: res.data.data.msg,
                                    duration: 3,
                                });
                            }
                            //console.log(res);
                            
                        })
                        .catch( res => {console.log('失败')})
                    }

                }
            }
        },
        //倒计时
        callback() {},
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // let accountInfo = JSON.parse(this.$route.query.judgeText);
        //console.log(this.$route.query.judgeText);
        
        this.OTCdata = local.get('otcListInfo');
        //this.OTCdata.orderBtnName = '取消订单';
        
    },
	//页面离开时
	destroyed: function () {
        //console.log("我已经离开了！");
        local.remove('otcListInfo');
	},
}
</script>

<style lang="scss" scoped>
.m-treaty-box {
    .m-code-btn {
        background-color: transparent !important;
        border-color: transparent !important;
    }
    .font-h2 {
        font-size: 14px;
        padding-bottom: 5px;
        &:last-child {
            padding-top: 15px;
            .img {
                display: inline-block;
                max-width: 350px;
                max-height: 400px;
                overflow: hidden;
            }
        }
    }
}

/deep/.ivu-checkbox-group {
    .ivu-checkbox-group-item {
        display: block;
        margin: 20px 0;
        .img {margin: 0 10px 0 5px;}
        font-size: $font-size-sm;
        color: #8790ab;
    }
    // .ivu-checkbox-inner {border-radius: 50%;}
} 

.page {
    height: 100vh;
	background-color: #f8f9fe;
	.m-container {
        padding-top: 120px;
        .details-h2 {
            position: relative;
            padding: 15px 30px;
            margin-bottom: 15px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            background-color: $color-white;
            box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
            .btn {
                @include tb;
                right: 10px;
                p {
                    display: inline-block;
                    padding-left: 5px;
                }
            }
        }
        .m-details-box {
            padding: 15px 30px;
            font-size: $font-size-sm;
            border-radius: 5px;
            background-color: $color-white;
            box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
            //内容左右
            .details-text-lf, .details-text-rg {
                display: inline-block;
                vertical-align: middle;
            }
            .details-text-lf {
                width: 60%;
                min-height: 545px;
                padding: 15px 0;
                line-height: 2;
                color: #8790ab;
                .text-lf-hd {
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                    p{padding: 5px 0;}
                    .color-sp {
                        color: $color-black;
                    }
                    .type-sp {
                        span {
                            display: inline-block;
                            font-size: 16px;
                        }
                    }
                }
                // 付款方式
                .text-lf-bd {
                    .text-lf-title p {
                        padding-top: 15px;
                        font-size: $font-size-base;
                        color: #555;
                    }
                    .img-box {
                        padding: 15px 0;
                        .m-play-img {
                            img {
                                display: inline-block;
                                margin: auto 5px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .text-lf-ft {
                    padding: 15px 30px;
                    box-shadow: 0 2px 8px rgba(171, 171, 171, .1);      
                    p {font-size: $font-size-mini;}
                }
            }
            // 聊天
            .details-text-rg {
                width: 40%;
            }
        }
        .details-btn {
            padding-top: 50px;
            .btn {
                width: 200px;
                margin-right: 20px;
                box-shadow: 0 2px 8px rgba(151, 151, 151, .4);
                &:nth-child(2) {
                    background-color: #99b2f3 !important;
                    border-color: #99b2f3 !important;
                }
            }
        }
    }
}

// 抽屉盒子
/deep/.ivu-drawer {
    .m-details-box {
        padding: 15px 30px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        //box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        .details-text-hd {
            padding: 10px 0;
            .font-h2 {
                padding-bottom: 15px;
                font-size: $font-size-base;
                font-weight: bold;
            }
            .details-text {
                max-width: 500px;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 6px rgba(151, 151, 151, .2);
                .text-p {
                    font-size: $font-size-mini;
                    &:nth-child(1) {
                        padding: 5px 0 15px;
                        color: #8790ab;
                    }
                    &:nth-child(2) {
                        display: inline-block;
                        min-width: 150px;
                        padding: 5px 15px;
                        text-align: center;
                        color: #fff;
                        background-color: #99b2f3;
                    }
                }
            }
        }
        .details-text-bd {
            padding: 10px 0;
            .font-h2 {
                padding-bottom: 15px;
                font-size: $font-size-base;
                font-weight: bold;
            }
            .m-select {padding: 5px 0 20px;}
            .m-textarea {width: 600px;}
        }
    }
    .details-btn {
        padding-top: 50px;
        .btn {
            width: 200px;
            margin-right: 30px;
            box-shadow: 0 2px 8px rgba(151, 151, 151, .4);
            &:nth-child(2) {
                background-color: #99b2f3 !important;
                border-color: #99b2f3 !important;
            }
        }
    }
}



</style>