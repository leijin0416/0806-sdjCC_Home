### inputFilesImage -input 上传图片

数组方法：https://wangyupo.github.io/2019/04/14/JS%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95


accept="image/* 上传的类型

#### 传值给父组件

photoImage -为转换base64后的图片数组集合

```js
/**
 *  监控data中的数据变化
 *  上传给父组件
*/
watch: {
    photoImage: {
        handler(newVal) {
            //console.log(newVal);
            this.$emit('OnhandleImageData', newVal);

        },
        deep:true
    }
},
```

#### 组件分析

- **createImage() 方法：**
```js
/**
 *  img -本地上传的图
 *  compress() -图片压缩的方法
 *  result.length -如果图片的大小大于50，则进行压缩
 */
if(result.length/1024 > 50){
    img.onload = function() {
        //0.6为压缩的程度，数值越小，压缩的文件越小，图片也会越模糊
        let avatarPhoto = self.compress(img, 0.6);
        self.OnPhotoData(avatarPhoto);
    }

}

```

#### 组件调用
```js
// template
<v-imge />

import inputFilesImage from '@/components/inputFilesImage/inputFilesImage'

components: {
    'v-imge': inputFilesImage,
},
```

#### 删除元素，好用不赖

```js
Array.prototype.remove = function(val){
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

let fileList = this.photoImage;
//删除当前
fileList.remove(val);
```

#### Base64
```js
import { Base64 } from 'js-base64'

Base64.encode() //-编码
let data = Base64.decode(newVal);  // 解码

data.forEach( (item, i, arr) => {
    let val = arr[i].replace(/^data:image\/\w+;base64,/, ""); // 去掉前缀
    let img = Base64.decode(val);
});
```

---

### uploadImage -upload 组件上传

#### 传值给父组件

```js
/**
    *  上传给父组件
    */
OnhandleImageData(val) {
    this.$emit('OnhandleImageData', val);
},
```