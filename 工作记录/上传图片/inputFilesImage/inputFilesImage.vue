<template>
    <div class="inpt-img-box">
        <div class="inpt-upload">
            <!-- 遮罩层 -->
            <input @change="onFileChange($event, 2)" type="file" accept="image/*" class="kyc-passin kyc-inpt">
            <!-- 按钮 -->
            <div class="m-btn">上传图片</div>
        </div>
        <div class="inpt-upload-list">
            <!-- 图片列表 -->
            <ul>
                <li v-for="(v, index) in photoImage" :key="index" class="ivu-upload-list-file">
                    <div class="ivu-upload-img">
                        <img :src="v" alt="" class="ivu-img">
                    </div>
                    <span class="ivu-upload-btn" @click="OnUploadDete(v)">x</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Base64 } from 'js-base64'

Array.prototype.remove = function(val){
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

export default {
    data() {
        return {
            avatarPhoto: '',    
            photoImage: [],     // push 转换后的图

        }
    },
    components: {

    },
    props: {

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        photoImage: {
            handler(newVal) {
                //console.log(newVal);
                this.$emit('OnhandleImageData', newVal);

            },
            deep:true
        }
    },
    //方法集合
    methods: {
        /**
         *  上传图片集合
         */
        OnPhotoData(val) {
            this.photoImage.push(val);
            //console.log(this.photoImage);
        },
        /**
         *  删除图片
         */
        OnUploadDete(val) {
            let fileList = this.photoImage;
            //删除当前
            fileList.remove(val);
        },
        /**
         *  1.0、图片上传前判断大小
         */
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
        /**
         *  2.0、压缩图片上传
         */
        createImage(file, id) {
            let reader = new FileReader();
            let self = this;
            
            reader.onload = e => {
                let result = e.target.result;
                let img = new Image();
                img.src = result;
                // console.log('********未压缩前的图片大小********')
                // console.log(result.length / 1024);
                if (id === 2) {
                    let filename = file.name; //文件名

                    if(result.length/1024 > 50){
                        img.onload = function() {
                            //0.6为压缩的程度，数值越小，压缩的文件越小，图片也会越模糊
                            let avatarPhoto = self.compress(img, 0.6);
                            self.OnPhotoData(avatarPhoto);

                            //local.set('avatarPhoto', avatarPhoto);
                            //console.log(avatarPhoto.length);
                        }

                    } else{
                        this.avatarPhoto = result;
                        self.OnPhotoData(result);
                        //local.set('avatarPhoto', result);
                    }

                }
                
            };
            // 读取图像
            reader.readAsDataURL(file);
        },
        /**
         *  3.0、 压缩图片
         */
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
    mounted() {},
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
.inpt-img-box {
    padding: 10px 0;
    .inpt-upload {
        position: relative;
        display: inline-block;
        .m-btn {
            display: inline-block;
            padding: 8px 30px;
            color: #fff;
            background-color: $color-body-c;
        }
        .kyc-inpt {
            z-index: 999;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            width: 100%;
            cursor: pointer;
            font-size: 0;
        }
    }
    //预览图
    .inpt-upload-list {
        padding: 10px;
        .ivu-upload-list-file {
            position: relative;
            display: inline-block;
            .ivu-upload-img {
                position: relative;
                width: 100px;
                height: 100px;
                overflow: hidden;
                background-color: #f9f9f9;
                .ivu-img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100%;
                    height: auto;
                    transform: translate(-50%, -50%);
                }
            }
            .ivu-upload-btn {
                position: absolute;
                top: 0;
                right: 0;
                padding: 0 8px;
                color: #fff;
                background-color: $color-body-c;
            }
        }
    }
}
</style>