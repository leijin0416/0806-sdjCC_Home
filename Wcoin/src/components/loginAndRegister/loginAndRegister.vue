<template>
   <div class="logo-forms">
       <div class="m-wrapper-box">
            <div class="m-wrapper-title">{{fromDatas.title}}</div>
            <Tabs size="small" :animated="false">
                <TabPane :label="tabs.title" v-for="(tabs, i) in fromDatas.registerTabArr" :key="i">
                    <div
                        class="m-input-list"
                        v-for="(item, id) in tabs.registerInpArr" :key="id"
                    >
                        <Input :type="item.type" :placeholder="item.name" v-model="item.value" size="large" :maxlength="item.lenght" style="" >
                            <Icon :type="item.imgs" size="18" slot="prepend" />
                            <!-- 验证码 -->
                            <Button slot="append" v-if="item.isLogin" @click="OnUserCodeClick(i)" class="m-code-btn">
                                <span v-if="sendMsgDisabled === false">获取验证码</span>
                                <span style="color: #fff" v-else>{{time+'秒后获取'}}</span>
                            </Button>
                        </Input>
                    </div>
                    <div class="m-checkbox" v-if="fromDatas.checkbox">
                        <Checkbox v-model="checkbox">
                            我已阅读并同意
                        </Checkbox>
                        <router-link tag="a" to="/">《WCOIN用户协议》</router-link>
                    </div>
                    <div style="text-align: right;" v-if="fromDatas.isLogin">
                        <router-link tag="a" to="/resetpwd">找回密码 ?</router-link>
                    </div>
                    <Button class="m-btn" type="success" @click="OnUserClick(i)" long>{{fromDatas.text}}</Button>

                </TabPane>
            </Tabs>
            <div class="m-regist" v-if="fromDatas.isLogin">
                还没有账号?
                <router-link tag="a" to="/register">马上注册</router-link>
            </div>
       </div>
   </div>
</template>

<script>
import {regs, regex, reEmail, myreg, regNum} from '@/assets/js/regExps.js'
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    props: {
        fromDatas: {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            userCodeId: '',
            checkbox: true,
            time: 60, // 发送验证码倒计时
            sendMsgDisabled: false,
        }
    },
    components: {

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
		//传
        ...mapMutations("localSession", ['handleUserSession']),
        
        OnUserCodeClick(id) {
            let data = this.fromDatas.registerTabArr;
            data.forEach((element, index) => {
                let iphone = element.registerInpArr[0].value;
                //console.log(id);
                if (id === 0 && element.title === '手机注册') {
                    //console.log(element.title);
                    
                    if (iphone === '') {
                        this.$Message.info({
                            content: '发送验证码有误',
                            duration: 3
                        });
                    } else {
                        if (!myreg.test(iphone)) {
                            this.$Message.info({
                                content: '手机格式有误',
                                duration: 3
                            });
                        } else {
                            //console.log('手机');
                            axios.post('', {
                                "func": "message.sendOut.SMS",
                                "data": {
                                    "user_phone": iphone,
                                    "type": 1,
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
                                        onClose: () => {
                                        }
                                    });
                                }
                                //console.log(res);
                            })
                            .catch( res => {console.log('失败')})
                        }
                    }
                } else if (id === 1 && element.title === '邮箱注册') {
                    //console.log(element.title);
                    if (iphone === '') {
                        this.$Message.info({
                            content: '发送验证码有误',
                            duration: 3
                        });
                    } else if(regex.test(iphone)) {
                        //console.log('邮箱');
                        if (!reEmail.test(iphone)) {
                            this.$Message.info({
                                content: '邮箱格式有误',
                                duration: 3
                            });
                        } else {
                            axios.post('', {
                                "func": "message.sendOut.SMS",
                                "data": {
                                    "user_mail": iphone,
                                    "type": 1,
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
                                        onClose: () => {
                                        }
                                    });
                                }
                                
                                //console.log(res);
                            })
                            .catch( res => {console.log('失败')})
                        }
                    }
                } else if (id === 0) {
                    if (element.title === '重置密码') {
                        //console.log(element.title);
                        if (iphone === '') {
                            this.$Message.info({
                                content: '发送验证码有误',
                                duration: 3
                            });
                        } else if(regex.test(iphone)) {
                            //console.log('邮箱');
                            if (!reEmail.test(iphone)) {
                                this.$Message.info({
                                    content: '邮箱格式有误',
                                    duration: 3
                                });
                            } else {
                                axios.post('', {
                                    "func": "user.password.update.sendMailCode",
                                    "data": {
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
                                            onClose: () => {
                                            }
                                        });
                                    }
                                    
                                    //console.log(res);
                                })
                                .catch( res => {console.log('错误');})
                            }
                        } else {
                            if (!myreg.test(iphone)) {
                                this.$Message.info({
                                    content: '手机格式有误',
                                    duration: 3
                                });
                            } else {
                                //console.log('手机');
                                axios.post('', {
                                    "func": "user.password.update.sendSMSCode",
                                    "data": {
                                        "user_phone": iphone,
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
                                            onClose: () => {
                                            }
                                        });
                                    }
                                    //console.log(res);
                                })
                                .catch( res => {console.log('错误');})
                            }
                        }
                        //end
                    }
                    if (element.title === '账号登录') {
                        //console.log(element.title);
                        if (iphone === '') {
                            this.$Message.info({
                                content: '发送验证码有误',
                                duration: 3
                            });
                        } else if(regex.test(iphone)) {
                            //console.log('邮箱');
                            if (!reEmail.test(iphone)) {
                                this.$Message.info({
                                    content: '邮箱格式有误',
                                    duration: 3
                                });
                            } else {
                                axios.post('', {
                                    "func": "message.sendOut.SMS",
                                    "data": {
                                        "user_mail": iphone,
                                        "type": 1,
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
                                            onClose: () => {
                                            }
                                        });
                                    }
                                    
                                    //console.log(res);
                                })
                                .catch( res => {console.log('错误');})
                            }
                        } else {
                            if (!myreg.test(iphone)) {
                                this.$Message.info({
                                    content: '手机格式有误',
                                    duration: 3
                                });
                            } else {
                                //console.log('手机');
                                axios.post('', {
                                    "func": "message.sendOut.SMS",
                                    "data": {
                                        "user_phone": iphone,
                                        "type": 1,
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
                                            onClose: () => {
                                            }
                                        });
                                    }
                                    //console.log(res);
                                })
                                .catch( res => {console.log('错误');})
                            }
                        }
                    }
                    // end
                }
            });
        },
        OnUserClick(i) {
            let data = this.fromDatas.registerTabArr;
            data.forEach((element, index) => {
                /** 
                 * 
                //console.log(element.title);
                // if (data.indexOf(element) === 0) {
                //     console.log(element.title);
                // }
                if(index === 0){
                    console.log(element); //打印当前数组
                } else {
                    console.log(element);
                }
                
                */
                
                if (i === 0 && element.title === '手机注册') {
                    //console.log(i);
                    let iphone = element.registerInpArr[0].value;
                    let code = element.registerInpArr[1].value;
                    let pws = element.registerInpArr[2].value;
                    let jymoney = element.registerInpArr[3].value;
                    let yqshare = element.registerInpArr[4].value;
                    if (iphone === "" && code === "" && pws === "" && jymoney === "" && yqshare === "") {
                        this.$Message.info({
                            content: '注册信息有误',
                            duration: 3
                        });
                    } else if (!myreg.test(iphone)) {
                        this.$Message.info({
                            content: '手机格式有误',
                            duration: 3
                        });
                    } else if (!regNum.test(code) || !regNum.test(jymoney)) {
                        this.$Message.info({
                            content: '请输入纯数字的数值',
                            duration: 3
                        });
                        
                    } else if (regs.test(pws) || regs.test(code) || regs.test(jymoney) || regs.test(yqshare)) {
                        this.$Message.info({
                            content: '请勿输入特殊字符',
                            duration: 3
                        });

                    } else if (code.length !== 6 || jymoney.length !== 6 || yqshare.length !== 6) {
                        this.$Message.info({
                            content: '请输入完整的数值长度',
                            duration: 3
                        });

                    } else if (this.checkbox === false) {
                        this.$Message.info({
                            content: '请同意服务协议',
                            duration: 3
                        });
                    } else {
                        let loginData = {
                            iphone: iphone,
                            code: code,
                            pws: pws,
                            jymoney: jymoney,
                            yqshare: yqshare,
                        }
                        this.$emit('showCityName', loginData, element.title);
                        //console.log(loginData);
                        
                    }
                    
                } else if (i === 1 && element.title === '邮箱注册') {
                    //console.log(element);
                    let iphone = element.registerInpArr[0].value;
                    let code = element.registerInpArr[1].value;
                    let pws = element.registerInpArr[2].value;
                    let jymoney = element.registerInpArr[3].value;
                    let yqshare = element.registerInpArr[4].value;
                    if (iphone === "" && code === "" && pws === "" && jymoney === "" && yqshare === "") {
                        this.$Message.info({
                            content: '注册信息有误',
                            duration: 3
                        });
                    } else if (!/\@/g.test(iphone) || !reEmail.test(iphone)) {
                        this.$Message.info({
                            content: '输入的邮箱格式有误',
                            duration: 3
                        });
                    } else if (!regNum.test(code) || !regNum.test(jymoney)) {
                        this.$Message.info({
                            content: '请输入纯数字的数值',
                            duration: 3
                        });
                        
                    } else if (regs.test(pws) || regs.test(code) || regs.test(jymoney) || regs.test(yqshare)) {
                        this.$Message.info({
                            content: '请勿输入特殊字符',
                            duration: 3
                        });

                    } else if (code.length !== 6 || jymoney.length !== 6 || yqshare.length !== 6) {
                        this.$Message.info({
                            content: '请输入完整的数值长度',
                            duration: 3
                        });

                    } else if (this.checkbox === false) {
                        this.$Message.info({
                            content: '请同意服务协议',
                            duration: 3
                        });
                    } else {
                        let loginData = {
                            iphone: iphone,
                            code: code,
                            pws: pws,
                            jymoney: jymoney,
                            yqshare: yqshare,
                        }
                        this.$emit('showCityName', loginData, element.title);
                        //console.log(loginData);
                    }
                    
                } else if (i === 0 && element.title === '账号登录') {
                    let iphone = element.registerInpArr[0].value;
                    let code = element.registerInpArr[1].value;
                    let pws = element.registerInpArr[2].value;
                    if (iphone === "" && code === "" && pws === "") {
                        this.$Message.info({
                            content: '登录信息有误',
                            duration: 3
                        });

                    } else if (!regNum.test(code)) {
                        this.$Message.info({
                            content: '请输入纯数字的数值',
                            duration: 3
                        });
                        
                    } else if (regs.test(pws) || regs.test(code)) {
                        this.$Message.info({
                            content: '请勿输入特殊字符',
                            duration: 3
                        });

                    } else if (code.length !== 6) {
                        this.$Message.info({
                            content: '请输入完整的数值长度',
                            duration: 3
                        });

                    } else if (reEmail.test(iphone)) {
                        let title = "邮箱登录";
                        let loginData = {
                            iphone: iphone,
                            code: code,
                            pws: pws,
                        }
                        this.$emit('showCityName', loginData, title);

                    } else {
                        if (myreg.test(iphone)) {
                            let title = "手机登录";
                            let loginData = {
                                iphone: iphone,
                                code: code,
                                pws: pws,
                            }
                            this.$emit('showCityName', loginData, title);
                            //console.log(loginData);
                        }
                        
                    }
                } else {
                    if (element.title === '重置密码') {
                        let iphone = element.registerInpArr[0].value;
                        let code = element.registerInpArr[1].value;
                        let pws = element.registerInpArr[2].value;
                        let qrpws = element.registerInpArr[3].value;
                        if (iphone === "" && code === "" && pws === "") {
                            this.$Message.info({
                                content: '登录信息有误',
                                duration: 3
                            });

                        } else if (!regNum.test(code)) {
                            this.$Message.info({
                                content: '请输入纯数字的数值',
                                duration: 3
                            });
                            
                        } else if (regs.test(pws) || regs.test(code) || regs.test(qrpws)) {
                            this.$Message.info({
                                content: '请勿输入特殊字符',
                                duration: 3
                            });

                        } else if (code.length !== 6) {
                            this.$Message.info({
                                content: '请输入完整的数值长度',
                                duration: 3
                            });

                        } else if (pws !== qrpws) {
                            this.$Message.info({
                                content: '两次密码输入不匹配',
                                duration: 3
                            });

                        } else if (/\@/g.test(iphone) || !myreg.test(iphone)) {
                            let loginData = {
                                iphone: iphone,
                                code: code,
                                pws: pws,
                                qrpws: qrpws,
                            }
                            this.$emit('showCityName', loginData);
                        } else if (reEmail.test(iphone)) {
                            let title = "邮箱";
                            let loginData = {
                                iphone: iphone,
                                code: code,
                                pws: pws,
                                qrpws: qrpws,
                            }
                            this.$emit('showCityName', loginData, title);

                        } else {
                            if (myreg.test(iphone)) {
                                let title = "手机";
                                let loginData = {
                                    iphone: iphone,
                                    code: code,
                                    pws: pws,
                                    qrpws: qrpws,
                                }
                                this.$emit('showCityName', loginData, title);
                                //console.log(loginData);
                            }
                            
                        }
                        //console.log(element);
                    }
                }
                
                // console.log(element);
                
            });
            
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //console.log(sessionStorage.getItem('seesion'));
        
    },
}
</script>

<style lang="scss" scoped>
/deep/.ivu-checkbox-checked .ivu-checkbox-inner {
    border-color: $color-body-c !important;
    background-color: $color-body-c !important;
}
.logo-forms {
    padding: 50px 0;
    .m-wrapper-box {
        width: 440px;
        box-sizing: border-box;
        padding: 20px 50px;
        margin: auto;
        overflow: hidden;
        border-radius: 10px;
        background-color: #fff;
        .m-wrapper-title {
            padding-bottom: 15px;
            font-size: $font-size-mds;
            text-align: center;
            font-weight: bold;
            color: #2d395b;
            
        }
        .m-input-list {
            padding: 10px 0;
        }
        .m-btn {padding: 10px 0; margin: 20px 0;}
        // 验证码
        .m-code-btn {
            min-width: 94px;
            border-radius: 0;
            height: 34px;
            color: #fff;
        }
        .m-checkbox {padding: 0 5px;}
    }
}

</style>