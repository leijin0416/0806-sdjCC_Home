<template>
    <!-- 中心-账号认证-初级 -->
    <div class="examine">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">账号认证 > 初级认证</span> </h2>
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-examine-box">
                    <!-- 上传信息 -->
                    <div class="m-examine-bd">
                        <Tabs value="name1" @on-click="OnPurchaseClick">
                            <TabPane label="大陆身份证认证" name="name1">
                                <Row type="flex" justify="center" class="code-row-bg">
                                    <Col span="7"  class="text-list">
                                        <Form ref="formInline" :model="formInline"  >
                                            <FormItem prop="user">
                                                <Input type="text" v-model="formInline.user" placeholder="请输入您的姓名" >
                                                    <Icon type="ios-person-outline" slot="prepend"  size="18"></Icon>
                                                </Input>
                                            </FormItem>
                                            <FormItem prop="user">
                                                <Input type="text" v-model="formInline.password" placeholder="请输入合法居民身份证号">
                                                    <Icon type="ios-list-box-outline" slot="prepend" size="18" />
                                                </Input>
                                            </FormItem>
                                            <FormItem>
                                                <div class="details-btn">
                                                    <Button type="primary" :size="buttonSize" class="btn" @click="handleUserSubmit" :disabled="disabledTrue">提交</Button>
                                                </div>
                                            </FormItem>
                                        </Form>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane label="其他证件认证" name="name2">
                                <Row type="flex" justify="center" class="code-row-bg">
                                    <Col span="7"  class="text-list">
                                        <Form ref="formInline" :model="formInline" >
                                            <FormItem prop="user">
                                                <Input type="text" v-model="formInline.user" placeholder="请输入您的姓名">
                                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                                </Input>
                                            </FormItem>
                                            <FormItem prop="user">
                                                <Input type="text" v-model="formInline.password" placeholder="请输入合法证件号">
                                                    <Icon type="ios-list-box-outline" slot="prepend" size="18" />
                                                </Input>
                                            </FormItem>
                                            <FormItem>
                                                <div class="details-btn">
                                                    <Button type="primary" :size="buttonSize" class="btn" @click="handleUserSubmit" :disabled="disabledTrue">提交</Button>
                                                </div>
                                            </FormItem>
                                        </Form>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                    <!-- end -->
                    <transition name="fade">
                        <div class="m-examine-ft" v-if="examineReferOne === true">
                            <h2 class="font-h2">平台提示：</h2>
                            <p v-if="examineDetails.authentication_status === 0"><Icon type="ios-clock" size="28" class="color-warn" />  您提交的 {{examineDetails.technological_process === 1 ? '初级认证' : '高级认证'}} 资料正在待审核中，请耐心等待。</p>

                            <p v-if="examineDetails.authentication_status === 1"><Icon type="ios-clock" size="28" class="color-warn" />  您提交的 {{examineDetails.technological_process === 1 ? '初级认证' : '高级认证'}} 资料正在审核中，请耐心等待。</p>
                    
                            <p v-if="examineDetails.authentication_status === 3">
                                <span v-if="examineDetails.technological_process === 1">
                                    <Icon type="ios-clock" size="28" class="color-warn" />  您提交的 初级认证 资料审核失败，请重新提交
                                </span> 
                                <span v-if="examineDetails.technological_process === 2">
                                    <Icon type="ios-clock" size="28" class="color-warn" />  您提交的 高级认证 资料审核失败，<router-link tag="a" to="/examine" class="ahover" >重新提交</router-link>
                                </span> 
                            </p>

                            <div class="examine-text" v-if="examineDetails.authentication_status === 2">
                                <div v-if="examineDetails.technological_process === 1">
                                    <Icon type="md-checkmark-circle" size="28" class="color-body-c" /> 您提交的初级认证资料已通过审核，是否申请高级认证？ <router-link tag="a" to="/examine" class="ahover">立即前往</router-link>
                                    <p class="color-reg">注意：成功申请高级认证后才可以在平台上购买/售出等</p>

                                </div>
                                <div v-else>
                                    <Icon type="md-checkmark-circle" size="28" class="color-body-c" /> 您提交的高级认证资料已通过审核
                                    <p class="color-green">您已通过高级认证，现在可以在平台上购买/售出等</p>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </Col>
        </Row>
    </div>
</template>


<script>
import axios from '@/common/api/http.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { regnber, format } from '@/assets/js/regExps.js'

export default {
    data() {
        return {
            buttonSize: 'large',
            examineReferOne: false,
            examineDetails: [],

            formInline: {
                user: '',
                password: ''
            },
            disabledTrue: false,

            purchaseUser: 1,
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
        handleUserSubmit() {
            let name = this.formInline.user;
            let certificate = this.formInline.password;
            let id = this.purchaseUser;
            if (name === '' && certificate === '') {
                this.$Message.info({
                    content: '请输入正确的个人信息',
                    duration: 3
                });
            } else if (!format.test(certificate)) {
                this.$Message.info({
                    content: '请输入正确的身份信息',
                    duration: 3
                });
            } else {
                if (id === 1) {
                    axios.post('', {
                        "func": "app.userAuthentication.primaryUserAuthentication",
                        "data": {
                            "user_name": name,
                            "caac_certificate_no": certificate,
                            "country": '中华人民共和国',
                        },
                    })
                    .then( res => {
                        if (res.data.data.type == 200) {
                            this.$Message.success({
                                content: res.data.data.date,
                                duration: 3,
                                onClose: () => {
                                    this.OnCertificationDetails();
                                    this.examineReferOne = true;
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
                    
                } else {
                    axios.post('', {
                        "func": "app.userAuthentication.primaryUserAuthentication",
                        "data": {
                            "user_name": name,
                            "caac_certificate_no": certificate,
                            "country": '',
                        },
                    })
                    .then( res => {
                        if (res.data.data.type == 200) {
                            this.$Message.success({
                                content: res.data.data.date,
                                duration: 3,
                                onClose: () => {
                                    this.OnCertificationDetails();
                                    this.examineReferOne = true;
                                }
                            });

                        } else {
                            this.$Message.error({
                                content: res.data.data.date,
                                duration: 3
                            });
                        }
                        //console.log(res);
                    })
                    .catch( res => {console.log(res);})
                }

            }
        },
        //tab
        OnPurchaseClick(name) {
			if(name === 'name1') {
				this.purchaseUser = 1;

			} else if (name === 'name2') {
				this.purchaseUser = 2;
			}
        },
        //查询状态
        OnCertificationDetails() {
            axios.post('', {
                "func": "app.userAuthentication.findCertificationDetails",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    this.disabledTrue = true; //提交禁用
                    let data = res.data.data.date;
                    if (data.technological_process === 1) {
                        this.examineDetails = data;
                        this.examineReferOne = true;
                    }
                    if (data.technological_process === 2) {
                        this.examineReferOne = true;
                        this.examineDetails = data;
                    }
                    if (data.authentication_status === 3) {
                        this.disabledTrue = false; //提交禁用
                    }
                }
                console.log(res);
            })
            .catch( res => {console.log(res);})
            
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.OnCertificationDetails();
    },
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
/deep/.ivu-tabs-bar {border-bottom-color: #eee;}
.examine {
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
            .text-list {
                padding-top: 50px;
            }
        }
        .m-examine-ft {
            padding: 50px 0;
            line-height: 2;
            text-align: center;
            .font-h2 {
                padding-bottom: 15px;
                font-size: $font-size-md;
                font-weight: bold;
            }
            .examine-text {
                .ahover {
                    font-size: $font-size-base;
                    font-weight: bold;
                }
                p {
                    font-size: 12px;
                }
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