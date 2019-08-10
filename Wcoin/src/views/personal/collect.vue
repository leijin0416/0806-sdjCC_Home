<template>
    <!-- 中心- 收款方式 -->
    <div class="collect">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">收款方式</span> </h2>
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-collect-box">
                    <div class="m-collect-hd">
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="8" class="row-col-md">
                                <div class="collect-hd-box" :class="[{onactive: showPayment === 1}]" @click="showTreaty(1)">
                                    <div class="collect-hd-title">
                                        <div class="hd-title-lf">
                                            <img src="@/assets/img/hk/icon-yh.png" alt="collect.png" class="img">
                                            <span>支付宝</span>
                                        </div>
                                        <div class="hd-img-rg" v-if="showZhifu === false">
                                            <img src="@/assets/img/hk/icon-zx_edit.png" alt="collect.png" class="img">
                                        </div>
                                    </div>
                                    <div class="collect-hd-text">
                                        <div class="hd-text-title" v-if="showZhifu === true">
                                            <Icon type="ios-add-circle-outline" size="20" />
                                            <span>添加支付宝收款码</span>
                                        </div>
                                        <div class="weui-cell" v-else>
                                            <div class="weui-cell-bd">
                                                <p>账号：</p>
                                                <p>{{findUserZf.withdrow_number}}</p>
                                            </div>
                                            <div class="weui-cell-ft" @click="show = !show">
                                                <p>查看付款码</p>
                                            </div>
                                        </div>
                                        <transition name="fade">
                                            <div class="m-code-img" v-if="show">
                                                <img :src="findUserZf.withdrow_payment_code" alt="code.png" class="img">
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </Col>
                            <Col span="8" class="row-col-md">
                                <div class="collect-hd-box" :class="[{onactive: showPayment === 2}]" @click="showTreaty(2)">
                                    <div class="collect-hd-title">
                                        <div class="hd-title-lf" >
                                            <img src="@/assets/img/hk/icon-yh.png" alt="collect.png" class="img">
                                            <span>银行卡</span>
                                        </div>
                                        <div class="hd-img-rg" v-if="showYinka === false">
                                            <img src="@/assets/img/hk/icon-zx_edit.png" alt="collect.png" class="img">
                                        </div>
                                    </div>
                                    <div class="collect-hd-text">
                                        <div class="hd-text-title" v-if="showYinka === true">
                                            <Icon type="ios-add-circle-outline" size="20" />
                                            <span>添加银行卡</span>
                                        </div>
                                        <div class="weui-cell" v-else>
                                            <div class="weui-cell-bd">
                                                <p>账号：</p>
                                                <p>{{findUserYk.withdrow_number}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span="8" class="row-col-md">
                                <div class="collect-hd-box" :class="[{onactive: showPayment === 3}]" @click="showTreaty(3)">
                                    <div class="collect-hd-title">
                                        <div class="hd-title-lf">
                                            <img src="@/assets/img/hk/icon-yh.png" alt="collect.png" class="img">
                                            <span>微信</span>
                                        </div>
                                        <div class="hd-img-rg" v-if="showWeixin === false">
                                            <img src="@/assets/img/hk/icon-zx_edit.png" alt="collect.png" class="img">
                                        </div>
                                    </div>
                                    <div class="collect-hd-text">
                                        <div class="hd-text-title" v-if="showWeixin === true">
                                            <Icon type="ios-add-circle-outline" size="20" />
                                            <span>添加微信收款码</span>
                                        </div>
                                        <div class="weui-cell" v-else>
                                            <div class="weui-cell-bd">
                                                <p>账号：</p>
                                                <p>{{findUserWx.withdrow_number}}</p>
                                            </div>
                                            <div class="weui-cell-ft" @click="showWx = !showWx">
                                                <p>查看付款码</p>
                                            </div>
                                        </div>
                                        <transition name="fade">
                                            <div class="m-code-img" v-if="showWx">
                                                <img :src="findUserWx.withdrow_payment_code" alt="code.png" class="img">
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <!-- end -->
                    <!-- 上传信息主体 -->
                    <div class="m-collect-bd">
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="8" class="row-col-md" >
                                <div v-if="showPayment === 1">
                                    <Form :model="formTreatyData">
                                        <FormItem label="姓名：" >
                                            <Input v-model="formTreatyData.name" placeholder="请输入您的真实姓名" />
                                        </FormItem>
                                        <FormItem label="账号：" >
                                            <Input v-model="formTreatyData.number" placeholder="请输入您的支付宝账号" />
                                        </FormItem>
                                    </Form>
                                    <div class="m-upload">
                                        <Button icon="ios-cloud-upload-outline">上传收款码</Button>
                                        <input @change="onFileChange($event, 1)" type="file" class="kyc-passin">
                                    </div>  
                                    <transition name="fade">
                                        <h2 class="font-h2"> 
                                            <span v-if="avatarPhotoName"><Icon type="ios-checkmark-circle" class="color-body-c" /></span> {{avatarPhotoName}}</h2>   
                                    </transition> 
                                    <div class="details-btn">
                                        <Button type="success" class="btn" @click="OnExamineClcik(1)">提交</Button>
                                    </div>
                                </div>
                                <div v-if="showPayment === 3">
                                    <Form :model="formTreatyData">
                                        <FormItem label="姓名：" >
                                            <Input v-model="formTreatyData.name" placeholder="请输入您的真实姓名" />
                                        </FormItem>
                                        <FormItem label="账号：" >
                                            <Input v-model="formTreatyData.number" placeholder="请输入您的微信账号" />
                                        </FormItem>
                                    </Form>
                                    <div class="m-upload">
                                        <Button icon="ios-cloud-upload-outline">上传收款码</Button>
                                        <input @change="onFileChange($event, 2)" type="file" class="kyc-passin">
                                    </div>  
                                    <transition name="fade">
                                        <h2 class="font-h2"> 
                                            <span v-if="avatarPhotoName"><Icon type="ios-checkmark-circle" class="color-body-c" /></span> {{avatarPhotoName}}</h2>   
                                    </transition> 
                                    <div class="details-btn">
                                        <Button type="success" class="btn" @click="OnExamineClcik(3)">提交</Button>
                                    </div>
                                </div>
                                <div v-if="showPayment === 2">
                                    <Form :model="formTreatyData">
                                        <FormItem label="银行卡号：" >
                                            <Input v-model="formTreatyData.name" placeholder="请输入您的银行卡号" />
                                        </FormItem>
                                        <FormItem label="开户银行：" >
                                            <Input v-model="formTreatyData.number" placeholder="请输入开户银行" />
                                        </FormItem>
                                        <FormItem label="开户人姓名：" >
                                            <Input v-model="formTreatyData.card" placeholder="请输入开户人姓名" />
                                        </FormItem>
                                        <FormItem label="卡户所在支行：" >
                                            <Input v-model="formTreatyData.payment" placeholder="请输入卡户所在支行" />
                                        </FormItem>
                                    </Form>
                                    <div class="details-btn">
                                        <Button type="success" class="btn" @click="OnExamineClcik(2)">提交</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>


<script>
import crypto from 'crypto'
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    data() {
        return {
            showZhifu: true,
            findUserZf: [],
            showWeixin: true,
            findUserWx: [],
            showYinka: true,
            findUserYk: [],


            show: false,
            showWx: false,

            formTreatyData: {
                name: '',
                number: '',
                card: '',
                payment: '',
            },
            showPayment: '',

            // 图片
            avatarPhoto: '',
            avatarPhotograph: '',
            avatarPhotoHandheld: '',

            avatarPhotoName: '',
            avatarPhotographName: '',
            avatarPhotoHandheldName: '',
        }
    },
    components: {

    },
    //监听属性 类似于data概念
    computed: {
		//取
		...mapGetters("localSession", ["global_url"]),
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
         //查询已上传支付方式
        OnfindUserWithdrow() {
            axios.post('', {
                "func": "user.user.findUserWithdrow",
                "data": {
                    "withdrow_type": 3,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let data = res.data.data.date;
                    this.findUserWx = data;
                    if (data) {
                        this.showWeixin = false;
                    }
                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})
            axios.post('', {
                "func": "user.user.findUserWithdrow",
                "data": {
                    "withdrow_type": 1,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let data = res.data.data.date;
                    this.findUserYk = data;
                    if (data) {
                        this.showYinka = false;
                    }
                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})
            axios.post('', {
                "func": "user.user.findUserWithdrow",
                "data": {
                    "withdrow_type": 2,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let data = res.data.data.date;
                    this.findUserZf = data;
                    if (data) {
                        this.showZhifu = false;
                    }
                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})

        },
        showTreaty(id) {
            this.showPayment = id;
        },
        //发送支付信息
        OnExamineClcik(id) {
            let ids = id;
            let name = this.formTreatyData.name;
            let number = this.formTreatyData.number;
            let account = this.formTreatyData.card;    //银行
            let subbranch = this.formTreatyData.payment;    //支行

            let avatarPhoto = local.get('avatarPhoto');
            
            let md5 = crypto.createHash('md5');
            md5.update(avatarPhoto);
            let md5Pws1 = md5.digest('hex');

            //console.log(avatarPhoto);
            
            if (name === "" || number === "") {
                this.$Message.info({
                    content: "请填写支付信息",
                    duration: 3,
                    onClose: () => {
                    }
                });
            } else if (ids === 2) {
                if (account === '' || subbranch === '') {
                    this.$Message.info({
                        content: "请填写支付信息",
                        duration: 3,
                        onClose: () => {
                        }
                    });

                } else {
                    axios.post('', {
                        "func": "user.user.addUserWithdrow",
                        "data": {
                            "withdrow_type": 1,
                            "withdrow_name": name,
                            "withdrow_number": number,
                            "withdrow_bank_account": account,
                            "withdrow_bank_subbranch": subbranch,
                        },
                    })
                    .then( res => {
                        if (res.data.data.type == 200) {
                            let data = res.data.data.msg;
                            this.$Message.success({
                                content: data,
                                duration: 3,
                                onClose: () => {
                                    this.OnfindUserWithdrow();
                                }
                            });
                        } else {
                            let data = res.data.data.msg;
                            this.$Message.error({
                                content: data,
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
                if (avatarPhoto === "") {
                    this.$Message.info({
                        content: "请上传支付二维码",
                        duration: 3,
                        onClose: () => {
                        }
                    });

                } else if (ids === 1) {
                    axios.post('', {
                        "func": "user.user.addUserWithdrow",
                        "data": {
                            "withdrow_type": 2,
                            "withdrow_name": name,
                            "withdrow_number": number,
                            "withdrow_payment_code": md5Pws1,
                        },
                    })
                    .then( res => {
                        if (res.data.data.type == 200) {
                            let data = res.data.data.msg;
                            this.$Message.success({
                                content: data,
                                duration: 3,
                                onClose: () => {
                                    local.remove('avatarPhoto');
                                    this.OnfindUserWithdrow();
                                }
                            });
                        } else {
                            let data = res.data.data.msg;
                            this.$Message.error({
                                content: data,
                                duration: 3,
                                onClose: () => {
                                    local.remove('avatarPhoto');
                                }
                            });
                        }
                        //console.log(res);
                    })
                    .catch( res => {console.log(res);})
                } else {
                    if (ids === 3) {
                        //console.log('微信');
                        
                        axios.post('', {
                            "func": "user.user.addUserWithdrow",
                            "data": {
                                "withdrow_type": 3,
                                "withdrow_name": name,
                                "withdrow_number": number,
                                "withdrow_payment_code": md5Pws1,
                            },
                        })
                        .then( res => {
                            if (res.data.data.type == 200) {
                                let data = res.data.data.msg;
                                this.$Message.success({
                                    content: data,
                                    duration: 3,
                                    onClose: () => {
                                        local.remove('avatarPhoto');
                                        this.OnfindUserWithdrow();
                                    }
                                });
                            } else {
                                let data = res.data.data.msg;
                                this.$Message.error({
                                    content: data,
                                    duration: 3,
                                    onClose: () => {
                                        local.remove('avatarPhoto');
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
        
        //图片上传前判断大小
        onFileChange(e, id) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            let isLt2M = files[0].size / 1024 / 1024 < 1;
            if (!isLt2M) {
                this.$Message.error('上传图片大小不能超过 1MB');
                return;
            }
            if (id === 1) {
                this.createImage(files[0], id);
                //console.log(id);

            } else if (id === 2) {
                this.createImage(files[0], id);
            }
        },
        //图片上传
        createImage(file, id) {
            let reader = new FileReader();
            let self = this
            
            reader.onload = e => {
                let result = e.target.result;
                let img = new Image();
                img.src = result;
                // console.log('********未压缩前的图片大小********')
                // console.log(result.length / 1024);
                if (id === 1) {
                    let filename = file.name;
                    this.avatarPhotoName = filename;

                    if(result.length/1024 > 50){
                        img.onload = function() {
                            //0.6为压缩的程度，数值越小，压缩的文件越小，图片也会越模糊
                            let avatarPhoto = self.compress(img, 0.6);
                            this.avatarPhoto = avatarPhoto;
                            local.set('avatarPhoto', avatarPhoto);
                            //console.log(this.avatarPhoto);
                        }
                    }else{
                        this.avatarPhoto = result;
                        local.set('avatarPhoto', result);
                    }

                } else if (id === 2) {
                    let filename = file.name;
                    this.avatarPhotoName = filename;

                    if(result.length/1024 > 50){
                        img.onload = function() {
                            //0.6为压缩的程度，数值越小，压缩的文件越小，图片也会越模糊
                            let avatarPhoto = self.compress(img, 0.6);
                            this.avatarPhoto = avatarPhoto;
                            local.set('avatarPhoto', avatarPhoto);
                            //console.log(this.avatarPhoto);
                        }
                    }else{
                        this.avatarPhoto = result;
                        local.set('avatarPhoto', result);
                    }

                }
                
            };
            // 读取图像
            reader.readAsDataURL(file);
        },
        // 压缩图片
        compress(img, size) {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            let initSize = img.src.length
            let width = img.width
            let height = img.height
            canvas.width = width
            canvas.height = height
            // 铺底色
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, width, height)
            //进行最小压缩
            let ndata = canvas.toDataURL('image/jpeg', size)
            // console.log('*******压缩后的图片大小*******')
            // console.log(ndata.length / 1024)
            return ndata
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.OnfindUserWithdrow();
        this.OnfindUserWithdrow();      //查询已上传支付方式
    },
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/deep/.ivu-tabs-bar {border-bottom-color: #eee;}
.collect {
    .details-h2 {
        padding: 15px 30px;
        margin-bottom: 15px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
    }
    .m-collect-box {
        min-height: 692px;
        padding: 15px 30px;
        font-size: $font-size-sm;
        border-radius: 5px;
        background-color: $color-white;
        box-shadow: 0 2px 8px rgba(171, 171, 171, .1);
        .m-collect-hd {
            position: relative;
            padding: 10px 0;
            .row-col-md {padding: 15px;}
            .collect-hd-box {
                cursor: pointer;
                min-height: 170px;
                padding: 15px;
                border: 1px solid #f5f3f3;
                border-radius: 10px;
            }
            .onactive {transition: all .3s linear; background-color: #f5f3f3;}
            .collect-hd-title {
                position: relative;
                .hd-title-lf {
                    .img, span {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .img {width: 30px;line-height: 0;}
                    span {
                        padding-left: 10px;
                        font-size: $font-size-base;
                        font-weight: bold;
                    }
                }
                .hd-img-rg {
                    @include tb;
                    right: 0;
                    line-height: 0;
                    .img {width: 16px;}
                }
            }
            .collect-hd-text {
                padding: 30px 0;
                .hd-text-title {
                    text-align: center;
                    span {
                        display: inline-block;
                        vertical-align: middle;
                        padding-left: 5px;
                    }
                }
                .weui-cell {
                    .weui-cell-bd {
                        p:last-child {
                            padding-top: 5px;
                            font-size: $font-size-base;
                            font-weight: bold;
                        }
                    }
                    .weui-cell-ft {
                        cursor: pointer;
                        font-size: $font-size-mini;
                    }
                    &:hover {
                        .m-code-img {
                            border: 1px solid;
                        }
                    }
                }
                .m-code-img {
                    z-index: 999;
                    position: absolute;
                    top: 0;
                    right: -300px;
                    width: 300px;
                    line-height: 1;
                    max-width: 300px;
                    overflow: hidden;
                    background-color: #f1f1f1;
                    .img {width: 100%;}
                }
            }
        }
    }
    .m-upload {
        position: relative;
        z-index: 99;
        display: inline-block;
        .kyc-passin {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
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