<template>
    <!-- 中心-账号认证-高级 -->
    <div class="examine">
        <Row>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <h2 class="details-h2">个人中心 > <span class="color-gray">账号认证 > 高级认证</span> </h2>
            </Col>
            <Col :xs="{ span: 24, offset: 0 }" :lg="{ span: 14, offset: 5 }">
                <div class="m-examine-box">
                    <div class="m-examine-hd">
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="5" class="text-list" :class="[{colorbody : exReferOne === true}]">
                                <div class="text-title">1</div>
                                <h2 class="font-h2">提交证件</h2>
                            </Col>
                            <Col span="5" class="text-list" :class="[{colorbody : exReferTwo === true}]">
                                <div class="text-title">2</div>
                                <h2 class="font-h2">审核中</h2>
                            </Col>
                            <Col span="5" class="text-list" :class="[{colorbody : exReferThree === true}]">
                                <div class="text-title">3</div>
                                <h2 class="font-h2">审核结果 
                                    <span v-if="exReferThree === true" class="color-body-c">成功</span>
                                </h2>
                            </Col>
                            <Col span="5" class="text-list" :class="[{colorbody : exReferSix === true}]"  v-if="exReferSix === true">
                                <div class="text-title">3</div>
                                <h2 class="font-h2">审核结果 
                                    <span class="color-reg">失败</span>
                                </h2>
                            </Col>
                        </Row>
                    </div>
                    <!-- 上传信息 -->
                    <div class="m-examine-bd" v-if="examineReferOne === true">
                        <Tabs value="name1">
                            <TabPane label="大陆身份证认证" name="name1">
                                <Row type="flex" justify="center" class="code-row-bg">
                                    <Col span="7" class="text-list">
                                        <div class="text-box">
                                            <img src="@/assets/img/hk/icon-sf_xs.png" alt="icon-sf_lg.png" class="img">
                                            <div class="m-upload">
                                                <input @change="onFileChange($event, 1)" type="file" class="kyc-passin">
                                            </div>  
                                            <!-- 文件名 -->
                                            <transition name="fade">
                                            <h2 class="font-h2"> 
                                                <span v-if="avatarPhotoName"><Icon type="ios-checkmark-circle" class="color-body-c" /></span> {{avatarPhotoName}}</h2>  
                                            </transition>
                                        </div>
                                    </Col>
                                    <Col span="7" class="text-list">
                                        <div class="text-box">
                                            <img src="@/assets/img/hk/icon-sf_md.png" alt="icon-sf_lg.png" class="img">
                                            <div class="m-upload">
                                                <input @change="onFileChange($event, 2)" type="file" class="kyc-passin">
                                            </div> 
                                            <transition name="fade">
                                            <h2 class="font-h2">
                                                <span v-if="avatarPhotographName"><Icon type="ios-checkmark-circle" class="color-body-c" /></span>{{avatarPhotographName}}</h2>
                                            </transition>
                                        </div>
                                    </Col>
                                    <Col span="7" class="text-list">
                                        <div class="text-box">
                                            <img src="@/assets/img/hk/icon-sf_lg.png" alt="icon-sf_lg.png" class="img">
                                            <div class="m-upload">
                                                <input @change="onFileChange($event, 3)" type="file" class="kyc-passin">
                                            </div> 
                                            <transition name="fade">
                                            <h2 class="font-h2">
                                                <span v-if="avatarPhotoHandheldName"><Icon type="ios-checkmark-circle" class="color-body-c" /></span>{{avatarPhotoHandheldName}}</h2>
                                            </transition>
                                        </div>
                                    </Col>
                                    <Col span="21">
                                        <div class="m-text-ft">
                                            <h2 class="font-h2">上传要求：</h2>
                                            <p>1、必须能看清证件信息；</p>
                                            <p>2、提交本申请代表承诺你的证件信息真实可靠，不存在盗用他人信息的的情况；</p>
                                            <p>3、上传材料需要JPG/JPEG/PNG格式上传，并保证照片清晰、边角完整、亮度均匀，且大小不得超过1M；</p>
                                        </div>
                                        <div class="details-btn">
                                            <Button type="success" :size="buttonSize" class="btn" @click="OnExamineClcik">提交</Button>
                                        </div>
                                        
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane label="其他证件认证" name="name2">
                                <Row type="flex" justify="center" class="code-row-bg">
                                    <Col span="7" class="text-list">
                                        <div class="text-box">
                                            <img src="@/assets/img/hk/icon-sf_xs.png" alt="icon-sf_lg.png" class="img">
                                            <div class="m-upload">
                                                <input @change="onFileChange($event, 1)" type="file" class="kyc-passin">
                                            </div>  
                                            <!-- 文件名 -->
                                            <transition name="fade">
                                            <h2 class="font-h2"> 
                                                <span v-if="avatarPhotoName"><Icon type="ios-checkmark-circle" class="color-body-c" /></span> {{avatarPhotoName}}</h2>    
                                            </transition> 
                                        </div>
                                    </Col>
                                    <Col span="7" class="text-list">
                                        <div class="text-box">
                                            <img src="@/assets/img/hk/icon-sf_md.png" alt="icon-sf_lg.png" class="img">
                                            <div class="m-upload">
                                                <input @change="onFileChange($event, 2)" type="file" class="kyc-passin">
                                            </div>  
                                            <transition name="fade">
                                            <h2 class="font-h2"> 
                                                <span v-if="avatarPhotoName"><Icon type="ios-checkmark-circle" class="color-body-c" /></span> {{avatarPhotoName}}</h2>  
                                            </transition>
                                        </div>
                                    </Col>
                                    <Col span="7" class="text-list">
                                        <div class="text-box">
                                            <img src="@/assets/img/hk/icon-sf_lg.png" alt="icon-sf_lg.png" class="img">
                                            <div class="m-upload">
                                                <input @change="onFileChange($event, 3)" type="file" class="kyc-passin">
                                            </div>  
                                            <transition name="fade">
                                            <h2 class="font-h2"> 
                                                <span v-if="avatarPhotoName"><Icon type="ios-checkmark-circle" class="color-body-c" /></span> {{avatarPhotoName}}</h2>   
                                            </transition> 
                                        </div>
                                    </Col>
                                    <Col span="21">
                                        <div class="m-text-ft">
                                            <h2 class="font-h2">上传要求：</h2>
                                            <p>1、必须能看清证件信息；</p>
                                            <p>2、提交本申请代表承诺你的证件信息真实可靠，不存在盗用他人信息的的情况；</p>
                                            <p>3、上传材料需要JPG/JPEG/PNG格式上传，并保证照片清晰、边角完整、亮度均匀，且大小不得超过1M；</p>
                                        </div>
                                        <div class="details-btn">
                                            <Button type="success" :size="buttonSize" class="btn" @click="OnExamineClcik">提交</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
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

export default {
    data() {
        return {
            buttonSize: 'large',

            firImg:'',
            avatarPhoto: '',
            avatarPhotograph: '',
            avatarPhotoHandheld: '',

            avatarPhotoName: '',
            avatarPhotographName: '',
            avatarPhotoHandheldName: '',

            examineReferOne: true,
            examineReferTwo: false,
            examineReferThree: false,

            //审核状态
            exReferOne: true,
            exReferTwo: false,
            exReferThree: false,
            exReferSix: false,
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
        // 确认上传
        OnExamineClcik() {
            let avatarPhoto = local.get('avatarPhoto');
            let avatarPhotograph = local.get('avatarPhotograph');
            let avatarPhotoHandheld = local.get('avatarPhotoHandheld');
            //console.log(avatarPhotoHandheld);
            
            let md5 = crypto.createHash('md5');
            md5.update(avatarPhoto);
            let md5Pws1 = md5.digest('hex');
            
            let md5s = crypto.createHash('md5');
            md5s.update(avatarPhotograph);
            let md5Pws2 = md5s.digest('hex');
            
            let md5p3 = crypto.createHash('md5');
            md5p3.update(avatarPhoto);
            let md5Pws3 = md5p3.digest('hex');
            
            if (avatarPhoto === "" || avatarPhotograph === "" || avatarPhotoHandheld === "") {
                this.$Message.info({
                    content: "请点击上传证件图片",
                    duration: 3,
                    onClose: () => {
                    }
                });
            } else {
                axios.post('', {
                    "func": "app.userAuthentication.seniorUserAuthentication",
                    "data": {
                        "id_photo": md5Pws1,
                        "living_photograph": md5Pws2,
                        "handheld_documents": md5Pws3,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.$Message.success({
                            content: res.data.data.date,
                            duration: 3,
                            onClose: () => {
                                this.$router.push({path: '/primary'});
                                local.remove('avatarPhoto');
                                local.remove('avatarPhotograph');
                                local.remove('avatarPhotoHandheld');
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
        //查询状态
        OnExamineAgainClcika() {
            axios.post('', {
                "func": "app.userAuthentication.findCertificationDetails",
                "data": {},
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let data = res.data.data.date;
                }
                //console.log(res);
            })
            .catch( res => {console.log(res);})
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
            } else {
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
                    this.avatarPhotographName = filename;
                    if(result.length/1024 > 50){
                        img.onload = function() {
                            let avatarPhoto = self.compress(img, 0.6);
                            this.avatarPhotograph = avatarPhoto;
                            local.set('avatarPhotograph', avatarPhoto);
                        }
                    }else{
                        this.avatarPhotograph = result;
                        local.set('avatarPhotograph', result);
                    }

                } else {
                    let filename = file.name;
                    this.avatarPhotoHandheldName = filename;
                    if(result.length/1024 > 50){
                        img.onload = function() {
                            let avatarPhoto = self.compress(img, 0.6);
                            this.avatarPhotoHandheld = avatarPhoto;
                            local.set('avatarPhotoHandheld', avatarPhoto);
                        }
                    }else{
                        this.avatarPhotoHandheld = result;
                        local.set('avatarPhotoHandheld', result);
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
        this.OnExamineAgainClcika();
    },
	//页面离开时
	destroyed: function () {
        //console.log("我已经离开了！");
        local.remove('avatarPhoto');
        local.remove('avatarPhotograph');
        local.remove('avatarPhotoHandheld');
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
        .m-examine-hd {
            padding: 20px 0;
            .text-list {
                position: relative;
                text-align: center;
                z-index: 9;
                .text-title {
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    line-height: 58px;
                    font-size: $font-size-md;
                    text-align: center;
                    border-radius: 50%;
                    box-shadow: 0 4px 6px #ddd;
                    color: #fff;
                    background-color: #d0d3df;
                }
                .font-h2 {
                    padding-top: 15px;
                    font-size: $font-size-base;
                }
                &::before {
                    content: ' ';
                    position: absolute;
                    top: 30px;
                    right: 0;
                    z-index: -1;
                    display: block;
                    width: 50%;
                    height: 2px;
                    border-bottom: 2px dashed #d0d3df;
                }
                &::after {
                    content: ' ';
                    position: absolute;
                    top: 30px;
                    left: 4px;
                    z-index: -1;
                    display: block;
                    width: 50%;
                    height: 2px;
                    border-bottom: 2px dashed #d0d3df;
                }
                &:last-child::before {opacity: 0;}
                &:nth-child(1)::after {opacity: 0;}
            }
            
            .colorbody {
                .text-title {background-color: $color-body-c;}
                &::before {
                    border-bottom-color: $color-body-c;
                }
                &::after {
                    border-bottom-color: $color-body-c;
                }
            }
        }
        .m-examine-bd {
            padding: 20px 0;
            .text-list {
                .text-box {
                    position: relative;
                    min-height: 227px;
                    .font-h2 {
                        padding: 0 15px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: all .3s linear;
                    }
                    .img {width: 100%;}
                    .m-upload {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 38px;
                        z-index: 99;
                        .kyc-passin {
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            cursor: pointer;
                        }
                    }
                }
            }
            .m-text-ft {
                line-height: 2;
                color: #727b95;
                .font-h2 {
                    padding: 15px 0 5px;
                    font-size: $font-size-base;
                    font-weight: bold;
                    color: #2d395b;
                }
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