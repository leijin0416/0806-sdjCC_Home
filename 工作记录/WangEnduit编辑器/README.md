```js
//使用npm下载最新版本：
npm install wangeditor --s
```

#### wangEditor 官网：

https://www.kancloud.cn/wangfupeng/wangeditor3/335777

#### wangEditor2 使用手册：

https://www.kancloud.cn/wangfupeng/wangeditor2/131049

#### plupload 上传图片插件：

http://chaping.github.io/plupload/doc/ 

---
#### 分析：

1、customInsert() - 组件上传成功的回调；

2、watch -监听父组件传过来的 value 值变化，通过 editor.txt.html(this.content) 来改变editor中的内容；

3、this.$emit('change', this.info_);  -将值传给父组件- OnTextChangeGg()；

```js
// 上传服务器地址，上传成功后会返回一个图片路径；
this.editor.customConfig.uploadImgServer="";

------------------------------------------------------------

// 组件上传成功的回调
customInsert: (insertImg, result, editor) => {
    /**
     *  insertImg()为插入图片的函数
     * 
     *  注意：
     *  图片上传成功，插入图片的回调
     * 
     *  【 result -为上传图片成功的时候返回的数据 】，这里我打印了一下发现后台返回的是data：[        {url:"路径的形式"},...]
     * 
     *  console.log(result.data[0].url)
     * 
     */

    let url = result.data;
    insertImg(url); //插入图片
}
```

#### 模板引用组件：
```js
/**
 *  子组件传过来的值 - 进行双向绑定
 */
OnTextChangeGg(val) {
    //val是编辑器返回过来的值
    this.values=val;
},

```