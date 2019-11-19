## 数组去重

- ### 1、`for() -indexOf`

```js
// indexOf实现
var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1) {
            res.push(current)
        }
    }
    return res;
}

console.log(unique(array));
```
---

- ### 2、`filter() 实现`

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {

    var res = array.filter(function(item, i, array){
        // indexOf 查找某项 在数组中首次出现的索引位置
        return array.indexOf(item) === i;
    })
    return res;
}

console.log(unique(array));
```
---

- ### 3、sort 排序去重 

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {

    return array.concat().sort().filter(function(item, index, array){

        return !index || item !== array[index - 1]
    })
}

console.log(unique(array));

```

---

- ### 4、Object键值对 

```js
// Object键值对
var array = [{value: 1}, {value: 1}, {value: 2}];

function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){

        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}

console.log(unique(array)); // [{value: 1}, {value: 2}]
```

---

## 数组：

数组笔记：https://juejin.im/post/5cb878ff51882534de611223

### 1）sort：数组的排序

- sort 排序 【原数组发生改变】，从小到大排序（10以内）

```js
var a = [4,6,2,8,3,1]
var aa = a.sort();      //=>1,2,3,4,6,8
a === aa ;              //=>true 返回值和原数组一样

var b = [4,60,2,86,15,1,101]
var bb = b.sort();      //=>1, 101, 15, 2, 4, 60, 86


let arr = [10, 3, 18, 38, 48, 26];
// 从小到大排序
let ary = arr.sort(function (n,m) {
    console.log(n-m)        //前一项数字减后一项数字的结果
    return n-m;             // -7 15 8 28 20 30 10 8 -22 -12
});
console.log(ary);           //排序后的新数组
```

### 2）resverse ： 倒序

- 将原数组倒着排列 原数组发生改变 【返回的是原数组】

```js
var a = [3, 1, 24, 5, 11, 22, 12, 101];
var ss = a.reverse();       //=>101, 12, 22, 11, 5, 24, 1, 3
a === ss                    //=>true
```

### 3）concat：数组的拼接

- 返回值：拼接好的新数组，【不会影响原数组】

- concat 默认只能展开一层数组

```js
var a = [1,2,3];
var b = [4,5,6];
var ss = a.concat(b);       //=>1,2,3,4,5,6
```

### 4）forEach & map：数组遍历

- forEach：数组内置遍历方法 forEach: 专门用来循环数组的。 两个参数:

第一个参数: 函数-> function(){} function(数组中的每个值,索引值,整个数组){ }

第二个参数: 改变this指向,写啥是啥（如果写个null,undefined还是为window）

```js
let arr = [true, 'haha', 10, {}, [1, 2, 3]];

arr.forEach( (item, i, all) {

    console.log(item);//数组中的每项

    // console.log(i); //索引
    // console.log(all); // 整个数组
    // console.log(this); //第二个参数如果没有，则this是window
},arr);
```

- map：循环数组，它的返回值为新的数组

```js
var a = [1, 2, 3, 4, 5];
var a2 = a.map(function(item,index,ary){
    // item 当前这一项
    // index 当前项的索引
    // ary原数组 ary === a
    return item * 2; //每次指定的返回值被作为新数组中的内容
});
```

### 5）filter：数组过滤

- 数组的过滤，过滤条件成立的这个值

- 参数： function(item,i,all){ return 成立的布尔值 }

- filter方法返回值 为过滤后的新数组

```js
//过滤大于10小于30的数字
let arr = [3, 10, 18, 38, 48, 26];
let ary = arr.filter(function (item, i) {
    return item >= 10 && item < 30
})
console.log(ary);

```
