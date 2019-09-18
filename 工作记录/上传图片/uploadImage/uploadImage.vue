<template>
    <div class="upload-box">
        <Upload action="http://47.112.115.82:8081/uploadImg/" 
            ref="upload"
            name="file"
            :show-upload-list="false"
            :default-file-list="UpDefaultList"
            :max-size="1024"
            :format="['jpg','jpeg','png']"
            :on-format-error="handleFormatError"
            :on-error="handleError"
            :before-upload="handleBeforeUpload"
            :on-exceeded-size="handleMaxSize"
            :on-success='handleSuccess'>
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
        <!-- 后台的图 -->
        <div class="demo-upload-list" v-for="(item, index) in defaultList" :key="index" style="margin-top: 20px;">
            <template>
                <img :src="item">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemoves(item, index)"></Icon>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
// 原型链方法 -删除
Array.prototype.indexOf = function(val){
    for(var i = 0; i < this.length; i++) {
        if (this[i] ==val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val){
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
export default {
    data() {
        return {
            UpDefaultList: [],
            defaultList: [], // 获取后台返回的图集合
            uploadList: [],  // 上传好的图片长度
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
        // 实时变化
        defaultList: {
            handler(newVal) {
                //console.log(newVal);
                this.OnhandleImageData(newVal);
            },
            deep: true
        },
        uploadList: {
            handler(newVal) {
                this.uploadList=newVal;
            },
            deep: true
        },
    },
    //方法集合
    methods: {
        /**
         *  上传给父组件
         */
        OnhandleImageData(val) {
            this.$emit('OnhandleImageData', val);
        },
        /**
         *  上传图片, 完成上传图片
         */
        handleSuccess(response,file,fileList) {
            this.$Notice.success({
                title: '图片预上传成功',
                desc: '请点击按钮进行上传',
                duration: 2,
            });
            // push 后台数据添加到数组
            this.defaultList.push(response.data);

            //接口返回的数据
            //console.log(response) 
            //console.log(this.defaultList);
            
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '图片类型错误',
                desc: '请上传正确的图片格式'
            });
        },
        /**
         *  删除后台图片
         */
        handleRemoves(file, index) {
            let data=file;
            this.$Notice.success({
                title: '图片删除成功',
                duration: 2,
                desc: '您的图片删除成功'
            });
            let fileList = this.defaultList;
            //删除当前
            fileList.remove(data); 
            //console.log(this.defaultList);
        },
        /**
         *  上传失败
         */
        handleError(event, file) {
            this.$Notice.error({
                title: '图片上传失败',
                duration: 2,
                desc: '图片 ' + file.name + ' 上传失败'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '图片大小限制',
                duration: 2,
                desc: '图片大小不超过1M.'
            });
        },
        handleBeforeUpload() {
            let check = this.uploadList.length < 14;
            if (!check) {
                this.$Notice.warning({
                    title: '上传的图片不能超过14张',
                    duration: 2,
                });
            }
            return check;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // 图片长度
        this.uploadList = this.$refs.upload.fileList;
        //console.log(this.$refs.upload.fileList);
        
    },
}
</script>

<style lang="scss" scoped>
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
    img{
        width: 100%;
        height: 100%;
    }
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>