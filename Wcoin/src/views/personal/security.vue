<template>
    <!--中心- 安全中心 -->
    <div class="security">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">安全中心</span> </h2>
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-examine-box">
                    <!-- 上传信息 -->
                    <div class="m-examine-bd">
                        <h2 class="font-h2">基本信息:</h2>
                        <div class="from-box">
                            <!-- <div class="weui-cell">
                                <div class="weui-cell-hd">昵称：</div>
                                <div class="weui-cell-bd">事实上</div>
                            </div> -->
                            <div class="weui-cell">
                                <div class="weui-cell-hd">ID：</div>
                                <div class="weui-cell-bd">{{userAccountData.user_id}}</div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell-hd">登录密码：</div>
                                <div class="weui-cell-bd">*********</div>
                                <div class="weui-cell-ft">
                                    <Button type="success" @click="OnRegisterClick">立即修改</Button>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell-hd">交易密码：</div>
                                <div class="weui-cell-bd">******</div>
                                <div class="weui-cell-ft">
                                    <Button type="success" @click="OnTreatyClick">立即修改</Button>
                                </div>
                            </div>
                        </div>
                        <h2 class="font-h2 padd-top">双重身份认证:</h2>
                        <div class="from-box">
                            <div class="weui-cell">
                                <div class="weui-cell-hd">安全等级：</div>
                                <div class="weui-cell-bd">
                                    <p class='security-grade security-red' v-if="userAccountData.user_account_fraction === 1">低</p>
                                    <p class='security-grade security-yellow' v-if="userAccountData.user_account_fraction === 2">中</p>
                                    <p class='security-grade security-blue' v-if="userAccountData.user_account_fraction === 3">高</p>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell-hd">
                                    <Icon type="ios-mail" size="20" />
                                    <span>邮箱验证：</span>
                                </div>
                                <div class="weui-cell-bd">{{userAccountData.user_mail}}</div>
                                <div class="weui-cell-ft">
                                    <Button type="success" @click="OnMailboxClick" v-if="!userAccountData.user_mail">立即绑定</Button>
                                    <div v-else>
                                        <Button type="success" @click="OnSafetyGradeFalse(2)" v-if="userAccountData.mailbox === true">关闭验证</Button>
                                        <Button type="success" @click="OnSafetyGradeTrue(2)" v-if="userAccountData.mailbox === false">开启验证</Button>
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell-hd">
                                    <Icon type="md-phone-landscape" size="20" />
                                    <span>手机验证：</span>
                                </div>
                                <div class="weui-cell-bd">{{userAccountData.user_phone}}</div>
                                <div class="weui-cell-ft">
                                    <Button type="success" @click="OnUserPhoneClick" v-if="!userAccountData.user_phone">立即绑定</Button>
                                    <div v-else>
                                        <Button type="success" @click="OnSafetyGradeFalse(1)" v-if="userAccountData.phone === true">关闭验证</Button>
                                        <Button type="success" @click="OnSafetyGradeTrue(1)" v-if="userAccountData.phone === false">开启验证</Button>

                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell-hd">
                                    <Icon type="logo-google" size="20" />
                                    <span>谷歌验证：</span>
                                </div>
                                <div class="weui-cell-bd">{{userAccountData.user_pay_password2}}</div>
                                <div class="weui-cell-ft">
                                    <Button type="success" @click="OnGoogleClick" v-if="!userAccountData.user_pay_password2">立即绑定</Button>
                                    <div v-else>
                                        <Button type="success" @click="OnSafetyGradeFalse(3)" v-if="userAccountData.google === true">关闭验证</Button>
                                        <Button type="success" @click="OnSafetyGradeTrue(3)" v-if="userAccountData.google === false">开启验证</Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <!-- 抽屉修改 -->
        <Drawer
            title="安全中心"
            v-model="valueSecurity"
            width="720"
            :mask-closable="false"
            :transfer="false"
            @on-close="handleSubmit"
        >
            <div class="m-treaty-box" v-if="valueRegister === true">
                <Row>
                    <Col span="12">
                        <h2 class="font-h2">修改登录密码</h2>
                        <Form :model="formTreatyData">
                            <FormItem label="原登录密码：" >
                                <Input type="password" v-model="formTreatyData.name" placeholder="请输入原登录密码" />
                            </FormItem>
                            <FormItem label="新登录密码：" >
                                <Input type="password" v-model="formTreatyData.pass" placeholder="请输入新登录密码" />
                            </FormItem>
                            <FormItem label="确认新登录密码：" >
                                <Input type="password" v-model="formTreatyData.password" placeholder="确认新登录密码" />
                            </FormItem>
                        </Form>
                        <div class="demo-drawer-footer">
                            <Button type="primary" style="width: 120px" @click="onValueRegister">确认提交</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="m-treaty-box" v-if="valueTreaty === true">
                <Row>
                    <Col span="12">
                        <h2 class="font-h2">修改交易密码</h2>
                        <Form :model="formTreatyData">
                            <FormItem label="原交易密码：" >
                                <Input type="password" v-model="formTreatyData.name" placeholder="请输入原交易密码" />
                            </FormItem>
                            <FormItem label="新交易密码：" >
                                <Input type="password" v-model="formTreatyData.pass" placeholder="请输入新交易密码" />
                            </FormItem>
                            <FormItem label="手机号验证码：" >
                                <Input v-model="formTreatyData.password" placeholder="请输入手机号验证码">    
                                    <!-- 验证码 -->
                                    <Button slot="append" @click="OnUserCodeClick(1)" class="m-code-btn">
                                        <span v-if="sendMsgDisabled === false">获取验证码</span>
                                        <span style="color: #6d7ecf" v-else>{{time+'秒后获取'}}</span>
                                    </Button>
                                </Input>
                            </FormItem>
                        </Form>
                        <div class="demo-drawer-footer">
                            <Button type="primary" style="width: 120px" @click="onValueTreaty">确认提交</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="m-treaty-box" v-if="valuePhone === true">
                <Row>
                    <Col span="12">
                        <h2 class="font-h2">绑定手机号</h2>
                        <Form :model="formTreatyData">
                            <FormItem label="手机号：" >
                                <Input v-model="formTreatyData.name" placeholder="请输入您的手机号" />
                                <p class="mail-p">( 手机号绑定后不可更换 )</p>
                            </FormItem>
                            <FormItem label="手机号验证码：" >
                                <Input v-model="formTreatyData.pass" placeholder="请输入手机号验证码">
                                <!-- 验证码 -->
                                <Button slot="append" @click="OnUserCodeClick(2)" class="m-code-btn">
                                    <span v-if="sendMsgDisabled === false">获取验证码</span>
                                    <span style="color: #6d7ecf" v-else>{{time+'秒后获取'}}</span>
                                </Button>
                                </Input>
                            </FormItem>
                        </Form>
                        <div class="demo-drawer-footer">
                            <Button type="primary" style="width: 120px" @click="valueCertification(1)">确认提交</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="m-treaty-box" v-if="valueMailbox === true">
                <Row>
                    <Col span="12">
                        <h2 class="font-h2">绑定邮箱</h2>
                        <Form :model="formTreatyData">
                            <FormItem label="邮箱：" >
                                <Input v-model="formTreatyData.name" placeholder="请输入您的邮箱" />
                                <p class="mail-p">( 邮箱绑定后不可更换 )</p>
                            </FormItem>
                            <FormItem label="邮箱验证码：" >
                                <Input v-model="formTreatyData.pass" placeholder="请输入邮箱验证码">
                                <!-- 验证码 -->
                                <Button slot="append" @click="OnUserCodeClick(3)" class="m-code-btn">
                                    <span v-if="sendMsgDisabled === false">获取验证码</span>
                                    <span style="color: #6d7ecf" v-else>{{time+'秒后获取'}}</span>
                                </Button>
                                </Input>
                            </FormItem>
                        </Form>
                        <div class="demo-drawer-footer">
                            <Button type="primary" style="width: 120px" @click="valueCertification(2)">确认提交</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="m-treaty-box" v-if="valueGoogle === true">
                <Row>
                    <Col span="24">
                        <h2 class="font-h2">绑定谷歌验证</h2>
                        <p>谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，验证码可用于登录、提现、修改安全设置等操作的安全验证。</p>
                    </Col>
                    <Col class="m-text-box" span="18">
                        <div class="weui-cell">
                            <div class="weui-cell-hd">
                                <h4 class="font-h4">1</h4>
                            </div>
                            <div class="weui-cell-bd">
                                <p>在谷歌验证器中添加密钥并备份</p>
                                <p>打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌。</p>
                                <p>密钥用于手机更换或遗失时找回谷歌验证器，绑定前请务必将下述密钥备份保存。</p>
                                <div class="secret-img">
                                    <img src="@/assets/img/hk/icon-azapp.png" alt="app.png">
                                    <img src="@/assets/img/hk/icon-iosapp.png" alt="app.png">
                                </div>
                                <p class="secret-key">
                                    <span>手机号：</span>
                                    <span>{{googleCode.user_account}}</span>
                                    <!-- <span>复制</span> -->
                                </p>
                                <p class="secret-key">
                                    <span>密钥：</span>
                                    <span>{{googleCode.key}}</span>
                                    <!-- <span>复制</span> -->
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col class="m-text-box" span="12">
                        <div class="weui-cell">
                            <div class="weui-cell-hd">
                                <h4 class="font-h4">2</h4>
                            </div>
                            <div class="weui-cell-bd">
                                <p>输入谷歌验证器中6位验证码</p>
                            </div>
                        </div>
                        <Form :model="formTreatyData">
                            <FormItem label="谷歌验证码：" >
                                <Input v-model="formTreatyData.name" placeholder="请输入谷歌验证码" />
                            </FormItem>
                        </Form>
                        <div class="demo-drawer-footer">
                            <Button type="primary" style="width: 120px" @click="valueCertification(3)">确认提交</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Drawer>   
        <Modal v-model="modalUserSms" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>输入验证码</span>
            </p>
            <div style="text-align:center">
                <Input v-model="valueUserSms" placeholder="" style="width: 300px" />
            </div>
            <div slot="footer">
                <Button size="large" @click="onUserSmsTrue">确认提交</Button>
            </div>
        </Modal>
    </div>
</template>


<script>
import crypto from 'crypto'
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import {regs, regex, reEmail, myreg, regNum} from '@/assets/js/regExps.js'

export default {
    data() {
        return {
            valueSecurity: false,
            formTreatyData: {
                name: '',
                pass: '',
                password: '',
            },
            valueRegister: false, //登录
            valueTreaty: false,  //交易
            valuePhone: false,
            valueMailbox: false, //邮箱
            valueGoogle: false,

            userAccountData: [], //认证
            modalUserSms: false, //关闭手机、短信验证
            valueUserSms:'',
            googleCode: [],
            
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
        // 监听认证信息
        OnFindUserAccount() {
            //otc验证
            // axios.post('', {
            //     "func": "app.safetyCenter.findUserAccount",
            //     "data": {},
            // })
            // .then( res => {
            //     if (res.data.data.type == 200) {
            //         let userAccountData = res.data.data.date;
            //         this.userAccountData = userAccountData;
            //     }
            //     console.log(res);
            // })
            // .catch( res => {console.log(res);})

            axios.post('', {
                "func": "user.user.safetyGrade",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let userAccountData = res.data.data.date;
                    this.userAccountData = userAccountData;
                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})


        },
        handleSubmit() {
            //清除记录
            if (this.valueRegister === true) {
                this.valueRegister = false;
            }
            if (this.valueTreaty === true) {
                this.valueTreaty = false;
            }
            if (this.valueMailbox === true) {
                this.valueMailbox = false;
            }
            if (this.valuePhone === true) {
                this.valuePhone = false;
            }
            if (this.valueGoogle === true) {
                this.valueGoogle = false;
            }
        },
        //验证抽屉
        OnRegisterClick() {
            this.valueSecurity = true;
            this.valueRegister = true;
        },
        OnTreatyClick() {
            this.valueSecurity = true;
            this.valueTreaty = true;
        },
        OnUserPhoneClick() {
            this.valueSecurity = true;
            this.valuePhone = true;
        },
        OnMailboxClick() {
            this.valueSecurity = true;
            this.valueMailbox = true;
        },
        //获取谷歌信息
        OnGoogleClick() {
            this.valueSecurity = true;
            this.valueGoogle = true;
            axios.post('', {
                "func": "user.user.getGoogleCode",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let googleCode = res.data.data.date;
                    this.googleCode = googleCode;
                } 
                //console.log(res);
            })
            .catch( res => {console.log(res);})

        },
        //修改
        onValueRegister() {
            let intpaw = this.formTreatyData.name;
            let intpaw2 = this.formTreatyData.pass;
            let intpaw3 = this.formTreatyData.password;
            //密码加密
            let md5 = crypto.createHash('md5');
            md5.update(intpaw);
            let md5Pws1 = md5.digest('hex');
            
            let md5s = crypto.createHash('md5');
            md5s.update(intpaw2);
            let md5Pws = md5s.digest('hex');

            if (intpaw === "" || intpaw2 === "" || intpaw3 === "") {
                this.$Message.info({
                    content: '请输入需要更改信息',
                    duration: 3
                });

            } else if (intpaw2 !== intpaw3) {
                this.$Message.info({
                    content: '两次新密码输入有误',
                    duration: 3
                });
            } else {
                //登录密码
                axios.post('', {
                    "func": "user.password.update.loginbyLogin",
                    "data": {
                        "user_password": md5Pws1,
                        "new_password": md5Pws,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.valueSecurity = false;
                                this.valueRegister = false;
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
                .catch( res => {console.log(res);})
            }

        },
        onValueTreaty() {
            let intpaw = this.formTreatyData.name;
            let intpaw2 = this.formTreatyData.pass;
            let intpaw3 = this.formTreatyData.password;
            //密码加密
            let md5 = crypto.createHash('md5');
            md5.update(intpaw);
            let md5Pws1 = md5.digest('hex');

            if (intpaw === "" || intpaw2 === "" || intpaw3 === "") {
                this.$Message.info({
                    content: '请输入需要更改信息',
                    duration: 3
                });

            } else if (intpaw !== intpaw2) {
                this.$Message.info({
                    content: '两次新密码输入有误',
                    duration: 3
                });
            } else {
                //交易密码
                axios.post('', {
                    "func": "user.password.update.paybyCode",
                    "data": {
                        "user_pay_password": md5Pws1,
                        "user_account_extra": intpaw3,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.valueSecurity = false;
                                this.valueTreaty = false;
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
                .catch( res => {console.log(res);})
            }

        },
        valueCertification(id) {
            let intpaw = this.formTreatyData.name;
            let intpaw2 = this.formTreatyData.pass;
            if (intpaw === "") {
                this.$Message.info({
                    content: '请输入需要绑定信息',
                    duration: 3
                });

            } else if (id === 3) {
                axios.post('', {
                    "func": "user.user.BankGoogleOther",
                    "data": {
                        "user_account": intpaw,
                        "user_account_extra": '',
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.valueSecurity = false;
                                this.valueGoogle = false;
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
                .catch( res => {console.log(res);})

            } else {
                if (intpaw2 === "") {
                    this.$Message.info({
                        content: '请输入需要绑定信息',
                        duration: 3
                    });

                } else {
                    if (id === 1) {
                        //手机绑定
                        axios.post('', {
                            "func": "user.user.bankPhone",
                            "data": {
                                "user_phone": intpaw,
                                "user_account_extra": intpaw2,
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                this.$Message.success({
                                    content: res.data.data.date,
                                    duration: 3,
                                    onClose: () => {
                                        this.valueSecurity = false;
                                        this.valuePhone = false;
                                    }
                                });
                            } else {
                                this.$Message.error({
                                    content: res.data.data.msg,
                                    duration: 3,
                                });
                            }
                            console.log(res);
                        })
                        .catch( res => {console.log(res);})
                    } else if (id === 2) {
                        //手邮箱绑定
                        axios.post('', {
                            "func": "user.user.bankMail",
                            "data": {
                                "user_mail": intpaw,
                                "user_account_extra": intpaw2,
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                this.$Message.success({
                                    content: res.data.data.date,
                                    duration: 3,
                                    onClose: () => {
                                        this.valueSecurity = false;
                                        this.valueMailbox = false;
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
                        .catch( res => {console.log(res);})
                        
                    }

                }
                
            }

        },
        //开启邮箱、手机号、谷歌安全认证
        OnSafetyGradeTrue(id) {
            let ids = id;
            if (ids === 1) {
                axios.post('', {
                    "func": "user.user.openSafetyCertification",
                    "data": {
                        "type": 1,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.OnFindUserAccount();
                                this.$router.go(0);
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

            } else if (ids === 2) {
                axios.post('', {
                    "func": "user.user.openSafetyCertification",
                    "data": {
                        "type": 2,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.OnFindUserAccount();
                                this.$router.go(0);
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

            } else {
                axios.post('', {
                    "func": "user.user.openSafetyCertification",
                    "data": {
                        "type": 3,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.OnFindUserAccount();
                                this.$router.go(0);
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
        //关闭邮箱、手机号、谷歌安全认证
        OnSafetyGradeFalse(id) {
            let ids = id;
            //1.0、手机、邮箱 需要发验证码
            if (ids === 1) {
                axios.post('', {
                    "func": "user.user.SMS",
                    "data": {
                        "type": 1,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.msg,
                            duration: 3,
                            onClose: () => {
                                this.modalUserSms = true;
                                local.set('idSms', ids);
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

            } else if (ids === 2) {
                axios.post('', {
                    "func": "user.user.SMS",
                    "data": {
                        "type": 2,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.msg,
                            duration: 3,
                            onClose: () => {
                                this.modalUserSms = true;
                                local.set('idSms', ids);
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

            } else {
                axios.post('', {
                    "func": "user.user.shutSafetyCertification",
                    "data": {
                        "type": 3,
                        "code":'',
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.msg,
                            duration: 3,
                            onClose: () => {
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
        //2.0、提交验证码 手机、邮箱关闭认证
        onUserSmsTrue() {
            let valueUserSms = this.valueUserSms;
            let ids = local.get('idSms');
            if (ids === 1) {
                axios.post('', {
                    "func": "user.user.shutSafetyCertification",
                    "data": {
                        "type": 1,
                        "code": valueUserSms,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.msg,
                            duration: 3,
                            onClose: () => {
                                this.OnFindUserAccount();
                                local.remove('idSms');
                                this.$router.go(0);
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

            } else {
                axios.post('', {
                    "func": "user.user.shutSafetyCertification",
                    "data": {
                        "type": 2,
                        "code": valueUserSms,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.msg,
                            duration: 3,
                            onClose: () => {
                                this.OnFindUserAccount();
                                local.remove('idSms');
                                this.$router.go(0);
                            }
                        });
                    } else {
                        this.$Message.error({
                            content: res.data.data.msg,
                            duration: 3,
                        });
                    }
                   // console.log(res);
                })
                .catch( res => {console.log('失败')})

            }

        },
        //短信验证码
        OnUserCodeClick(id) {
            let iphone = this.formTreatyData.name;
            if (id === 1) {
                //console.log('手机');
                axios.post('', {
                    "func": "user.password.update.sendPayCode",
                    "data": {},
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
            } else {
                if (iphone === '') {
                    this.$Message.info({
                        content: '发送验证码有误',
                        duration: 3
                    });
                } else {
                    if (id === 2) {
                        if (!myreg.test(iphone)) {
                            this.$Message.info({
                                content: '手机格式有误',
                                duration: 3
                            });
                        } else {
                            //console.log('手机');
                            axios.post('', {
                                "func": "user.user.sendBankPhoneCode",
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
                                    });
                                }
                                //console.log(res);
                            })
                            .catch( res => {console.log('失败')})
                        }

                    } else if (id === 3) {
                        if (!reEmail.test(iphone)) {
                            this.$Message.info({
                                content: '邮箱格式有误',
                                duration: 3
                            });
                        } else {
                            axios.post('', {
                                "func": "user.user.sendBankMailCode",
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
                                    });
                                }
                                //console.log(res);
                                
                            })
                            .catch( res => {console.log('失败')})
                        }

                    }
                }

            } 
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.handleSubmit();
        this.OnFindUserAccount();
    },
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
/deep/.ivu-tabs-bar {border-bottom-color: #eee;}
.security {
    .details-h2 {
        padding: 15px 30px;
        margin-bottom: 15px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
    }
    .m-examine-box {
        padding: 15px 30px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        .m-examine-bd {
            padding: 20px 0;
            .font-h2 {
                font-size: $font-size-base;
                font-weight: bold;
                color: $color-body-c;
            }
            .from-box {
                padding: 15px 0;
                .weui-cell {
                    justify-content: normal;
                    padding: 15px 0;
                    border-bottom: 1px solid #eee;
                    .weui-cell-hd {
                        min-width: 100px;
                    }
                    .weui-cell-bd {
                        padding-left: 20px;
                    }
                    .weui-cell-ft {
                        width: 600px;
                    }
                    &:last-child {
                        border-bottom: none;
                    }
                }
                &:last-child {
                    .weui-cell-hd {
                        span {
                            display: inline-block;
                            padding: 0 5px;
                            vertical-align: middle;
                        }
                    }
                    .security-grade {
                        display: inline-block;
                        padding: 2px 20px;
                        color: #fff;
                    }
                    .security-red {background-color: #ff5f5f;}
                    .security-yellow {background-color: #ffbf5f;}
                    .security-blue {background-color: #4b81ff;}
                }
            }
            .padd-top {padding-top: 30px;}
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
// 抽屉
.m-treaty-box {
    .m-code-btn {
        background-color: transparent !important;
        border-color: transparent !important;
    }
    .font-h2 {
        padding-bottom: 15px;
        font-size: $font-size-sm;
        font-weight: bold;
    }
    .btn {
        background-color: transparent !important;
        border-color: transparent !important;
    }
    .mail-p {padding-top: 5px; font-size: $font-size-mini; color: $color-body-c;}
    .demo-drawer-footer {padding-top: 20px;}

    .m-text-box {
        padding: 20px 0;
        .weui-cell {align-items: normal; padding-bottom: 20px;}
        .weui-cell-hd {
            padding-right: 15px; 
            .font-h4 {
                display: inline-block;
                width: 30px;
                height: 30px;
                line-height: 28px;
                text-align: center;
                border-radius: 50%;
                color: #fff;
                background-color: $color-body-c;
            }
        }
        .weui-cell-bd {
            p {line-height: 2;}
            .secret-key {
                span {
                    display: inline-block;
                    padding-right: 10px;
                }
            }
            .secret-img {
                overflow: hidden;
                img {
                    display: inline-block;
                    width: 150px;
                    vertical-align: middle;
                    margin-right: 15px;
                    line-height: 0;
                }
            }
        }
    }
}

</style>