<template>
    <div class="page">
        <div class="m-upload">
            <Button icon="ios-cloud-upload-outline">上传收款码</Button>
            <!-- input 上传 -->
            <input class="kyc-passin" @change="onFileChange($event, 1)" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" name="file" />
        </div> 
    </div>
    <!-- 
        实现图片预览：
        - 可以把已经转成base64的图片插入到img中，实现预览
        <img src="" id="show" width="200" />
        reads.οnlοad=function (e) {
            document.getElementById('show').src= result;
        };
     -->
</template>

<script>
import axios from '@/common/api/http.js'
import local from '@/common/api/localSession.js'

export default {
    data() {
        return {

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
        /**
         *   https://www.zhangxinxu.com/wordpress/2015/11/html-input-type-file/  -张鑫旭
         *   https://www.haorooms.com/post/input_file_leixing  -MIME类型
         *   1.0、FileReader 对象是通过将图片url转换成 base64 格式
         *   2.0、accept 表示可以选择的文件MIME类型，多个MIME类型用英文逗号分开
         */

        //1.0、图片上传前判断大小
        onFileChange(e, id) {
            local.remove('avatarPhoto');
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

                            //子传父
                            this.$emit('OnAvatarPhoto', avatarPhoto);

                            // this.avatarPhoto = avatarPhoto;
                            // local.set('avatarPhoto', avatarPhoto);
                        }
                    } else {
                        /**
                         *   $emit:
                         *   第一个参数为自定义函数名
                         *   第二个参数为要传过去的内容，可以是 数组、对象、字符串、布尔、数值等
                         *   需要再加密后上传，保障安全
                         */
                        //2.1 将图片存进缓存
                        this.$emit('OnAvatarPhoto', result);

                        // this.avatarPhoto = result;
                        // local.set('avatarPhoto', result);
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

    },
    beforeDestroy() {
    },
	//页面离开时
	destroyed: function () {
        //console.log("我已经离开了！");
	},
}
</script>

<style lang="scss" scoped>
/*@import url(); 引入公共css类*/
.page {
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

}

</style>