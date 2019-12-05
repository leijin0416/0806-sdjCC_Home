<template lang="html">
    <div class="editor" >
        <div ref="toolbar" class="toolbar">
        </div>
        
        <div ref="editor" class="text">
        </div>
    </div>
</template>

<script>
    /**
     *  wangeditor 局部注册, 3.1.1版本
     */
    import E from 'wangeditor'
    import 'wangeditor/release/wangEditor.min.css'

    export default {
        name: 'editoritem',
        data() {
            return {
                // uploadPath,
                editor: null,
                info_: null
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            isClear: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            isClear(val) {
                // 触发清除文本域内容
                if (val) {
                    this.editor.txt.clear()
                    this.info_ = null
                }
            },
            value: function(value) {
                if (value !== this.editor.txt.html()) {
                    this.editor.txt.html(this.value)
                }
            }
        },
        mounted() {
            this.seteditor();
            this.editor.txt.html(this.value);
        },
        methods: {
            seteditor() {
                this.editor = new E(this.$refs.toolbar, this.$refs.editor);

                //this.editor.customConfig.uploadImgShowBase64 = true; // base 64 存储图片
                // 配置上传服务器端地址
                this.editor.customConfig.uploadImgServer = 'http://xxxxx.com/uploadImg';    
                
                // withCredentials（跨域传递 cookie）
                this.editor.customConfig.withCredentials = true;
                this.editor.customConfig.uploadImgHeaders = { };                // 自定义 header
                this.editor.customConfig.uploadFileName = 'file';               // 后端接受上传文件的参数名
                this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;    // 将图片大小限制为 2M
                this.editor.customConfig.uploadImgMaxLength = 6;                // 限制一次最多上传 3 张图片
                this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000;      // 设置超时时间

                this.editor.customConfig.colors = [
                    '#000000',
                    '#ffffff',
                    '#eeece0',
                    '#1c487f',
                    '#4d80bf',
                    '#c24f4a',
                    '#8baa4a',
                    '#7b5ba1',
                    '#46acc8',
                    '#f9963b',
                ]
                // 字号
                this.editor.customConfig.fontSize = {
                    // 格式：'value': 'title'
                    1: '10px',
                    2: '13px',
                    3: '16px',
                    4: '19px',
                    5: '22px',
                    6: '25px',
                    7: '28px'
                };

                // 配置菜单
                this.editor.customConfig.menus = [
                    'head',         //标题
                    'indent',
                    'bold',         // 粗体
                    'fontSize',     // 字号
                    'fontName',     // 字体
                    'italic',       // 斜体
                    'underline',     // 下划线
                    'strikeThrough', // 删除线
                    'foreColor',    // 文字颜色
                    'backColor',    // 背景颜色
                    'link',         // 插入链接
                    'list',         // 列表
                    'justify',      // 对齐方式
                    'quote',        // 引用
                    //'emoticon',   // 表情
                    'image',        // 插入图片
                    'table',        // 表格
                    //'video',      // 插入视频
                    'code',         // 插入代码
                    'undo',         // 撤销
                    'redo',         // 重复
                    'fullscreen'    // 全屏
                ]
                // 上传图片
                this.editor.customConfig.uploadImgHooks = {
                    fail: (xhr, editor, result) => {
                        // 插入图片失败回调
                        console.log("上传失败,原因是"+result);
                    },
                    success: (xhr, editor, result) => {
                        // 图片上传成功回调
                    },
                    timeout: (xhr, editor) => {
                        // 网络超时的回调
                    },
                    error: (xhr, editor) => {
                        // 图片上传错误的回调
                        console.log("上传出错");
                    },
                    customInsert: (insertImg, result, editor) => {
                        console.log(result)
                        /**
                         *  insertImg() 为插入图片的函数
                         * 
                         *  注意：
                         *  图片上传成功，插入图片的回调
                         * 
                         *  result -为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[ {url:"路径的形式"},...]
                         *  console.log(result.url)
                         */

                        let url = 'http://xxxxx.com/' + result.data;
                        // 向编辑器插入图片
                        insertImg(url); 
                    }
                }
                this.editor.customConfig.onchange = (html) => {
                    this.info_ = html;                      // 绑定当前逐渐地值
                    this.$emit('change', this.info_);       // 通过 change 将内容同步到父组件中
                }
                // 创建富文本编辑器
                this.editor.create();
            }
        }
    }
</script>

<style lang="scss" scoped>
.editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
}
.toolbar {
    border: 1px solid #ccc;
}
.text {
    border: 1px solid #ccc;
    min-height: 400px;
    
}
/deep/.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item {
    padding: 2px 4px;
    margin: 2px;
    border: 1px solid;
}

</style>