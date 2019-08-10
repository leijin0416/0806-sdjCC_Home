<template>
    <!-- otc -聊天 -->
    <div class="chats">
        <div class="m-chats-box">
            <div class="chats-hd" v-if="valueChatsHd === 1">
                <div class="text-box">
                    <h2 class="font-h2">S</h2>
                    <div class="hd-texts">
                        <p class="title">Supreme</p>
                        <p>30日成单： 2610</p>
                    </div>
                </div>
            </div>
            <div class="chats-bd">
                <div class="chats-bd-text" id="chatMain">
                    <div class="m-text-list" v-for="(item, i) in byOtcTranList" :key="i">
                        <div class="text-box"
                            :class="[
                                {textleft: parseFloat(OTCdata.user_id) === item.user_id}
                            ]">
                            <h2 class="m-time">{{item.chat_create_time}}</h2>
                            <h2 class="font-h2 clearfix"><span>{{item.user_name}}</span></h2>
                            <div class="hd-texts">
                                <h2>{{item.user_name}}</h2>
                                <p v-if="item.chat_body_type === 1">{{item.chat_Base}}</p>
                                <p class="img-box" v-if="item.chat_body_type === 2">
                                    <viewer :images="photo" v-viewer="{toolbar: false}"> 
                                        <img
                                            class="img"
                                            :src="item.chat_body"
                                            alt="chats.png"
                                        >
                                    </viewer>
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div class="chats-ft">
                <Input v-model="chatsTextarea" type="textarea" placeholder="输入内容" :rows="2" :autosize="{minRows: 2,maxRows: 2}">
                </Input>
                <div class="btn">
                    <div class="m-upload">
                        <Icon type="md-aperture" size="24" class="img" />
                        <input @change="onFileChange($event, 2)" type="file" class="kyc-passin">
                    </div>  
                    <Button type="success" @click="OninsertNewClick">发送</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import crypto from 'crypto'
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"
import { Base64 } from 'js-base64';

export default {
    props: ['valueChatsHd'],
    data() {
        return {
            startInterval: null,
            photo: [],

            byOtcTranList: [],
            OTCdata: [],
            chatsTextarea:'',
            userID: '',
            avatarPhoto: '',
            
            leg: '',
        }
    },
    components: {

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    updated(){

    },
    //方法集合
    methods: {
        //1.0、信息集合
        OnbyOtcTranClick() {
            let userId = this.userID;
            let OTCdata = this.OTCdata;
            axios.post('', {
                "func": "chat.find.byOtcTran",
                "data": {
                    "otc_transaction_id": OTCdata.otc_transaction_id,
                    "chat_to_status": 0,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    let byOtcTranList = res.data.data.date;
                    this.leg = byOtcTranList.length;

                    for (let i = 0; i < byOtcTranList.length; i++) {
                        let chat_body = byOtcTranList[i].chat_body;
                        let chat_Base = Base64.decode(chat_body);
                        byOtcTranList[i].chat_Base = chat_Base;
                    }
                    this.byOtcTranList = byOtcTranList;
                    
                    // 滚动底部
                    this.$nextTick(() => {
                        let msg = document.getElementById('chatMain'); // 获取对象
                        msg.scrollTop = msg.scrollHeight; // 滚动高度
                        //console.log(msg);
                        
                    });
                    // 每5秒请求
                    this.startInterval = setInterval(() => {
                        // 调用请求接口的方法
                        this.OnbyOtcTranClickLeg();
                    }, 5000)
                    
                } else {
                    this.$Message.error({
                        content: res.data.data.msg,
                        duration: 3,
                    });
                }
                //console.log(res);
                
            })
            .catch( res => {console.log('失败')})
        },
        //2.0、判断是否有新数据
        OnbyOtcTranClickLeg() {
            let leg = this.leg;
            let userId = this.userID;
            let OTCdata = this.OTCdata;
            axios.post('', {
                "func": "chat.find.byOtcTran",
                "data": {
                    "otc_transaction_id": OTCdata.otc_transaction_id,
                    "chat_to_status": 0,
                },
            })
            .then( res => {
                if (res.data.data.type == 200) {
                    // 判断聊天的长度 是否大于 这个新的长度
                    if (leg === res.data.data.date.length) {
                        clearInterval(this.startInterval)
                    } else {
                        let byOtcTranList = res.data.data.date;
                        this.leg = byOtcTranList.length;

                        for (let i = 0; i < byOtcTranList.length; i++) {
                            let chat_body = byOtcTranList[i].chat_body;
                            let chat_Base = Base64.decode(chat_body);
                            byOtcTranList[i].chat_Base = chat_Base;
                        }
                        this.byOtcTranList = byOtcTranList;
                        
                        //console.log(Base64.decode(byOtcTranList[27].chat_body));
                        
                        // 滚动底部
                        this.$nextTick(() => {
                            let msg = document.getElementById('chatMain'); // 获取对象
                            msg.scrollTop = msg.scrollHeight; // 滚动高度
                            //console.log(msg);
                            
                        });
                        //console.log(res.data.data.date);
                    }
                    
                } else {
                    this.$Message.error({
                        content: res.data.data.msg,
                        duration: 3,
                    });
                }
                
            })
            .catch( res => {console.log('失败')})
        },
        //3.0、发送
        OninsertNewClick() {
            let value = this.chatsTextarea;

            let OTCdata = this.OTCdata;
            let avatarPhoto = local.get('avatarPhoto');

            // 加密
            let md5 = crypto.createHash('md5');
            md5.update(avatarPhoto);
            let md5Pws1 = md5.digest('hex');
            //console.log(avatarPhoto);
            
            if (value === '') {
                this.$Message.error({
                    content: '请输入内容',
                    duration: 3,
                });

            } else if (avatarPhoto !== '') {
                axios.post('', {
                    "func": "chat.insert.New",
                    "data": {
                        "otc_transaction_id": OTCdata.otc_transaction_id,
                        "chat_type": 1,
                        "chat_body_type": 2,
                        "chat_body": md5Pws1,
                        "img_name": md5Pws1 + '.jpg',
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.chatsTextarea = '';
                        local.remove('avatarPhoto');
                        this.OnbyOtcTranClick();
                    } else {
                        this.$Message.error({
                            content: res.data.data.msg,
                            duration: 3,
                            onClose: () => {
                                this.chatsTextarea = '';
                                local.remove('avatarPhoto');
                            }
                        });
                    }
                    //console.log(res);
                    
                })
                .catch( res => {console.log('失败')})

            } else {

                axios.post('', {
                    "func": "chat.insert.New",
                    "data": {
                        "otc_transaction_id": OTCdata.otc_transaction_id,
                        "chat_type": 1,
                        "chat_body_type": 1,
                        "chat_body": value,
                        "img_name": value,
                    },
                })
                .then( res => {
                    if (res.data.data.type == 200) {
                        this.chatsTextarea = '';
                        this.OnbyOtcTranClick();
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

        //1.0、图片上传前判断大小
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
            if (id === 2) {
                this.createImage(files[0], id);
                //console.log(id);

            }
        },
        //2.0、图片上传
        createImage(file, id) {
            let reader = new FileReader();
            let self = this
            
            reader.onload = e => {
                let result = e.target.result;
                let img = new Image();
                img.src = result;
                // console.log('********未压缩前的图片大小********')
                // console.log(result.length / 1024);
                if (id === 2) {
                    let filename = file.name;
                    this.chatsTextarea = filename;

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
        //3.0、 压缩图片
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
        local.remove('avatarPhoto');
        this.OTCdata = local.get('otcListInfo');
        //console.log(this.OTCdata);
        
        this.OnbyOtcTranClick();
    },
    destroyed: function () {
        clearInterval(this.startInterval);
    }
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/

/deep/textarea.ivu-input {
    border: none;
    resize: none;
}
/deep/.ivu-input:hover {border-color: $color-body-c !important;}

//英文换行
* {word-wrap : break-word ;word-break : break-all ;}

.chats {
    padding: 0 30px 0 60px;
    .m-chats-box {
        position: relative;
        min-height: 500px;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(151, 151, 151, .3);
        .text-box {
            .font-h2, .hd-texts {
                display: inline-block;
                vertical-align: middle;
            }
            .font-h2 {
                width: 40px;
                height: 40px;
                line-height: 38px;
                overflow: hidden;
                font-weight: bold;
                text-align: center;
                border-radius: 50%;
                color: $color-white;
                background-color: $color-body-c;
            }
            .hd-texts {
                padding: 0 10px;
                font-size: $font-size-mini;
                color: #999;
                .title {
                    font-size: $font-size-sm;
                    font-weight: bold;
                    color: $color-body-c;
                }
            }

        }
        .chats-hd {
            padding: 15px;
            border-bottom: 1px solid #eee;
        }
        // 聊天内容
        .chats-bd {
            height: 500px;
            padding: 5px 5px 105px 10px;
            .chats-bd-text {
                height: 100%;    
                overflow: hidden;
                overflow-y: auto;
            }
            .text-box {
                padding: 5px;
                overflow: hidden;
                .m-time {
                    font-size: 12px;
                    text-align: center;
                    padding: 5px 0;
                    color: #999;
                }
                .font-h2 {
                    width: 30px;
                    height: 30px;
                    line-height: 28px;
                    float: left;
                    font-size: $font-size-mini;
                    text-align: center;
                    span {
                        display: inline-block;
                        width: 12px;
                        white-space: nowrap;
                        overflow: hidden;
                        letter-spacing: 10px;

                    }
                }
                .hd-texts {
                    display: block;
                    margin-bottom: 5px;
                    overflow: hidden;
                    h2 {
                        padding-bottom: 5px; 
                        font-weight: bold;
                        color: #333;
                    }
                    p {
                        position: relative;
                        display: inline-block;
                        padding: 5px 15px;
                        margin-right: 5px;
                        border-radius: 5px;
                        color: #333;
                        background-color: #eee;
                        &::before {
                            content: ' ';
                            position: absolute;
                            top: 4px;
                            left: -13px;
                            display:inline-block;
                            width:0;
                            height:0;
                            overflow:hidden;
                            font-size:0;
                            border-width:8px;
                            border-color:transparent #eee transparent transparent;
                            border-style:dashed solid dashed dashed;
                        }
                    }
                    .img-box {
                        cursor: pointer;
                        width: 90px;
                        min-height: 20px;
                        line-height: 0;
                        padding: 0;
                        &::before {opacity: 0;}
                        .img {
                            width: 100%;
                        }
                    }
                }
            }
            .textleft {
                text-align: right;
                .font-h2 {
                    float: right;
                }
                .hd-texts {
                    p {
                        &::before {
                            left: initial;
                            right: -15px;
                            border-color: transparent transparent transparent #eee;
                        }
                    }
                }
            }
        }
        .chats-ft {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #eee;
            .btn {padding: 10px 15px; text-align: right; 
                /deep/.ivu-btn {
                    padding: 2px 16px 4px;
                }
                .m-upload {
                    position: relative;
                    display: inline-block;
                    .img {
                        margin-right: 10px;
                    }
                    .kyc-passin {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        cursor: pointer;
                        z-index: 999;
                    }
                }
            }
        }
    }
}
</style>