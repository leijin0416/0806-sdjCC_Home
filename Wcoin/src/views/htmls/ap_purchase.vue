<template>
    <!-- otc 买入/出售 订单 -->
    <div class="page">
        <m-nav v-bind:navList="navList" />
        <div class="m-container">
            <Row>
                <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                    <div class="m-title-hd">
                        <div>
                            <h2 class="details-h2" v-if="judgeText === '买入'">买入订单</h2>
                            <h2 class="details-h2" v-else>卖出订单</h2>
                        </div>
                        <Button type="success" class="btn" to="/apartment">
                            <p>返回上一级</p>
                        </Button>
                    </div>
                </Col>
                <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                    <div class="m-details-box">
                        <div class="details-text-lf">
                            <!-- 表单信息 -->
                            <div class="text-lf-hd">
                                <p><label>限额：</label> <span class="color-body-c">{{otcList.sell_amount_min}} ~ {{otcList.sell_amount_max}} {{otcList.currency_name}}</span></p>
                                <p><label>剩余数量：</label> {{otcList.sell_lave_count}} {{otcList.dc_t_name}}</p>
                                <Form ref="formInline" :model="formInline" label-position="left" :label-width="90" >
                                    <FormItem label="单价：">
                                        <Input type="number" v-model="formInline.inpt1" :placeholder="formInline.inpt1" style="width: 150px" disabled >
                                        </Input>
                                        <span style="padding-left: 15px">{{otcList.currency_name}}</span>
                                    </FormItem>
                                    <FormItem label="数量：">
                                        <Input type="number" v-model="formInline.inpt2" placeholder="请输入具体数量" @on-change="OnChangeOtcNum" style="width: 150px" >
                                        </Input>
                                        <span style="padding-left: 15px">{{otcList.dc_t_name}}</span>
                                        <p> 最大<span>{{judgeText === '买入' ? '购买' : '出售'}}</span>的数量<span class="color-reg">不能超过 {{otcList.sell_lave_count}} {{otcList.dc_t_name}}</span></p>
                                    </FormItem>
                                    <FormItem label="金额：">
                                        <Input type="number" v-model="formInline.inpt3" :placeholder="formInline.inpt3" style="width: 150px" disabled >
                                        </Input>
                                        <span style="padding-left: 15px">{{otcList.currency_name}}</span>
                                        
                                    </FormItem>
                                </Form>
                            </div>
                            <!-- 付款方式 -->
                            <div class="text-lf-bd">
                                <h2 class="font-h2">
                                    <div class="table-name"> <span>
                                        {{ otcList.user_name }}
                                        </span></div>
                                    <div class="table-name">
                                        {{ otcList.user_name }}
                                    </div>
                                </h2>
                                <h2 class="font-h2">
                                    <span>成交单数：</span>
                                    <span>{{otcList.count}} /单</span>
                                </h2>
                                <h2 class="font-h2">
                                    <span>付款备注：</span>
                                    <span>{{otcList.sell_remark}}</span>
                                </h2>
                                <div class="text-lf-title">
                                    <p>
                                        支付方式：
                                    </p>
                                    <div v-if="otcList.sell_pay_type === 1" class="m-play-img">
                                        <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png">
                                    </div>
                                    <div v-if="otcList.sell_pay_type === 2" class="m-play-img">
                                        <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png">
                                    </div>
                                    <div v-if="otcList.sell_pay_type === 3" class="m-play-img">
                                        <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png">
                                        <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png">
                                    </div>
                                    <div v-if="otcList.sell_pay_type === 4" class="m-play-img">
                                        <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png">
                                    </div>
                                    <div v-if="otcList.sell_pay_type === 5" class="m-play-img">
                                        <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png">
                                        <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png">
                                    </div>
                                    <div v-if="otcList.sell_pay_type === 6" class="m-play-img">
                                        <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png">
                                        <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png">
                                    </div>
                                    <div v-if="otcList.sell_pay_type === 7" class="m-play-img">
                                        <img src="@/assets/img/hk/icon-yh.png" alt="yinhang.png">
                                        <img src="@/assets/img/hk/icon-zf.png" alt="yinhang.png">
                                        <img src="@/assets/img/hk/icon-wx.png" alt="yinhang.png">
                                    </div>
                                </div>
                            </div>
                            <!-- 付款提示 -->
                            <div>
                                <div class="text-lf-ft">
                                    <h2 class="color-body-c">提醒</h2>
                                    <p> 提交订单后，请于 <span class="color-reg">15分钟内</span> 前往 <span class="color-reg">交易订单</span> 进行付款操作，否则系统自动取消订单。 </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                    <div class="details-btn">
                        <Button type="success" :size="buttonSize" class="btn" @click="OnChangeOtcClick">提交订单</Button>
                    </div>
                </Col>
            </Row>
        </div>
        <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
    </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import SellingChats from "@/components/SellingChats/SellingChats"

import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { regnber, regs } from '@/assets/js/regExps.js'

export default {
    data() {
        return {
            judgeText: '',
            sell_pay_type: 3,
            otcList: [],

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
            formInline: {
                inpt1: '',
                inpt2: '',
                inpt3: '0.00',
            },
        }
    },
    components: {
        'm-nav': NavBar,
        'm-chat': SellingChats,

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
		...mapMutations("localSession", ['handleJudgeText']),
        //判断状态 购买/出售
        OnJudgeText(id) {
            //console.log(id);
            if (id === 1) {
                this.judgeText = '买入';
            } else {
                this.judgeText = '卖出';
            }
        },
        //监听输入框
        OnChangeOtcNum(event) {
            let otcNum = parseFloat(this.otcList.sell_lave_count);
            let num = this.formInline.inpt1;
            let value = parseFloat(event.target.value);

            if (value) {
                let number = ( num * value ).toFixed(4);
                this.formInline.inpt3 = number.toString();
                //console.log(typeof(number));
            }
            if (value > otcNum) {
                this.$Message.error({
                    content: '您输入的数量超过限制',
                    duration: 3,
                    onClose: () => {
                        this.formInline.inpt2 = '';
                    }
                });
            }
            //console.log(typeof(event.target.value));
            //console.log(typeof(otcNum));
            
        },
        OnChangeOtcClick() {
            let id = this.otcList.dc_type_id;
            let num = this.formInline.inpt2;
            if (num === '') {
                this.$Message.info({
                    content: '请输入需要的数量',
                    duration: 3
                });

            } else if (regs.test(num)) {
                this.$Message.info({
                    content: '请勿输入特殊字符',
                    duration: 3
                });

            } else if (!regnber.test(num)) {
                this.$Message.info({
                    content: '请输入正整数的数值',
                    duration: 3
                });

            } else {
                axios.post('', {
                    "func": "app.order.purchaseDcSell",
                    "data": {
                        "sell_id": id,
                        "dcSellSum": num,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {

                    } else {
						this.$Message.info({
							content: res.data.data.msg,
							duration: 3
						});
                    }
                    console.log(res);
                })
                .catch( res => {console.log(res);})
            }
        },

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // 状态
        let accountInid = JSON.parse(this.$route.query.judgeText);
        //console.log(this.$route.query.judgeText);
        this.OnJudgeText(accountInid);

        // 数据
        let otcList = local.get('otcSellList');
        this.otcList = otcList;
        this.formInline.inpt1 = otcList.sell_unit_price;
        //console.log(local.get('otcSellList'));
        

        //this.localOtcOrder();
    },
	//页面离开时
	destroyed: function () {
        //console.log("我已经离开了！");
        local.remove('otcSellList');
	},
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/

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
        .m-title-hd {
            position: relative;
            .details-h2 {
                padding: 15px 30px;
                margin-bottom: 15px;
                font-size: 18px;
                font-weight: bold;
                border-radius: 5px;
                background-color: $color-white;
                box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
            }
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
            padding: 0 30px 15px;
            font-size: $font-size-sm;
            border-radius: 5px;
            background-color: $color-white;
            box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
            //内容左右
            .details-text-lf, .details-text-rg {
                display: inline-block;
                vertical-align: middle;
            }
            //左
            .details-text-lf {
                width: 60%;
                min-height: 545px;
                padding: 15px 0;
                line-height: 2;
                .text-lf-hd {
                    font-size: $font-size-base;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                    p { 
                        label {
                            display: inline-block;
                            width: 90px;
                        }
                        padding: 5px 0;
                    }
                    /deep/.ivu-form .ivu-form-item-label {font-size: $font-size-base;}
                    /deep/.ivu-input[disabled], fieldset[disabled] .ivu-input {
                        cursor: initial;
                        font-size: 16px;
                        font-weight: bold;
                        color: #555;
                    }
                }
                // 付款方式
                .text-lf-bd {
                    padding: 15px 0;
                    .m-play-img {
                        margin-top: 15px;
                        img {
                            display: inline-block;
                            margin: auto 5px;
                        }
                    }
                    .font-h2 {
                        padding-bottom: 10px;
                        font-size: $font-size-sm;
                        color: #555;
                        &:nth-child(2), &:nth-child(3) {
                            span {
                                display: inline-block;
                                width: 100px;
                            }
                        }
                    }
                    .table-name {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 5px;
                        font-size: $font-size-base;
                        &:nth-child(1) {
                            width: 30px;
                            height: 30px;
                            overflow: hidden;
                            line-height: 29px;
                            font-size: 1rem;
                            text-align: center;
                            border-radius: 50%;
                            color: $color-white;
                            background-color: $color-body-c;
                            span {
                                display: inline-block;
                                width: 12px;
                                overflow: hidden;
                                white-space: nowrap;
                                letter-spacing: 8px;
                                margin: 0;
                                font-weight: bold;
                            }
                        }
                    }
                    .text-lf-title p {
                        padding-top: 5px;
                        font-size: $font-size-sm;
                        color: #555;
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
            padding-top: 30px;
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

</style>