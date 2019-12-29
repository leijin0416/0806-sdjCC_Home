```js
//使用npm下载最新版本：
npm install wangeditor --save
```

## wangEditor 官网：
https://www.kancloud.cn/wangfupeng/wangeditor3/335777

## wangEditor2 使用手册：
https://www.kancloud.cn/wangfupeng/wangeditor2/131049

## plupload 上传图片插件：
http://chaping.github.io/plupload/doc/ 

---

### `要注意向编辑器插入图片时的路径！！！` 图片可能已经到了服务器，但是`页面会报插入图片错误`，这就是图片插入时路径的问题, 在 result.data 前面插入 服务器上传图片成功后的路径即可

```js
// 上传服务器地址，上传成功后会返回一个图片路径；
this.editor.customConfig.uploadImgServer = "";

// ------------------------------------------------------------

// 组件上传成功的回调
customInsert: (insertImg, result, editor) => {
    let url = 'http://xxxx.com/' + result.data;
    insertImg(url);             // 向编辑器中插入图片
}
```

## 分析：

- 1、customInsert() - 图片上传成功时的回调；

- 2、watch -监听父组件传过来的 value 值变化，通过 editor.txt.html(this.content) 来改变editor中的内容；

- 3、this.$emit('change', this.info_);  将值传给父组件- OnTextChangeGg()；

## 模板引用组件：

组件通信通信可看：https://juejin.im/post/5d699e2b6fb9a06ae3727746

```js
/**
 *  子组件传过来的值 - 进行双向绑定
 */
OnTextChangeGg (val) {
    //val是编辑器返回过来的值
    this.values = val;
},

```