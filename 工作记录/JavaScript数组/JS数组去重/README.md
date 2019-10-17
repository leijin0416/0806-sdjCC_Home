## 数组去重

### 【1】利用filter

- 例子 1

```js
var arr=[
  {id:1,name:'bob'},
  {id:1,name:'bob'},
  {id:1,name:'bob'},
  {id:1,name:'lucy'},
  {id:1,name:'lucy'},
  {id:2,name:'lucy'},
  {id:2,name:'张三'} ]

//封装成方法，通过某个属性去重
function filterRepeat(arr,prop){
    return arr.filter(function(element,index,self) {
        return self.findIndex(el=>el[prop] == element[prop]) === index
    })
}

//加载到数组原型上
Array.prototype.filterRepeat=function(){
    if(typeof arguments[0] == 'string')  return filterRepeat(this,arguments[0])
    return filterRepeat2(this,arguments[0])
}

//test 通过name属性去重
var newArr = arr.filterRepeat('id')
console.log(newArr)
```

- 例子 2

```js
var arr=[
  {id:1,name:'bob'},
  {id:1,name:'bob'},
  {id:1,name:'bob'},
  {id:1,name:'lucy'},
  {id:1,name:'lucy'},
  {id:2,name:'lucy'},
  {id:2,name:'张三'} ]

// 去掉相同id的项目
var arr1 = arr.filter(function(element,index,self){
  return self.findIndex(el=>el.id == element.id) === index
})

console.log(arr1) // 打印 id 1、2 各一个
```

根据 id 或者 name 来去掉重复的数据。

![JS去重](https://leijin0416.coding.me/images/08_04/icon-hd_1017.png) 
