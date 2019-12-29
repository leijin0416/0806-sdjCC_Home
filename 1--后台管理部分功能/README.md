这篇文章主要记录解决在写后台管理页面的部分功能，还会继续更新

![tag-box](http://120.79.222.255/icon-tag-box.gif)

--- 

# 1、监听左侧导航数组点击 name数据变化

| 分析 | |
|--|--| 
| 1、...mapGetters("localUser", ["navbarName", "tagsData"]) | - 作用在 watch 监听到 左侧导航栏 name 属性的数据变化，并缓存到 navbarName 中；tagsData 也是如此 |
| **2、`if (that.oldTagName != newer) {}` | - 判断新旧是否相等，如果不想等才继续执行，这里主要为 tag 关闭时跳转到旧路由做铺垫，不让其继续执行 push 数组 |
| 3、watch `"navbarName": {}` | - 缓存方法 headerNavbarName()方法的数据, 来监听左侧导航数组点击后 name 数据的变化 |
| 3、that.oldvalNames = oldval; / that.navbarDelTags(oldval) | - oldval 为旧的name的状态，也就是上一条路由的 name 状态，在这里被存下来，用在 tag关闭时 会被调用该数据，作为循环的依据。|
| 3、watch `that.navbarAddTags(newer)` | - 当 navbarName（也就是 name）数据发生变化时，也就是用户在点击左侧导航栏时更新，`执行 navbarAddTags() 方法` 该方法主要是 push 当前点击的数组对象 到 tagsList （tag列表数组）中|
| 4、watch `tagsData: {}` | - 缓存 headerTagsData()方法的数据 |

```js
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

// 监听属性 类似于data概念
computed: {
    ...mapGetters("localUser", ["navbarName", "tagsData"]),

},
// 监控data中的数据变化
watch: {
    /**
     *  tag 在关闭时的思路？
     *  在切换新的 headerNavbarName 路由时，通过 watch 监听 navbarName 保存旧的name
     */
    "navbarName": {
        handler: function(newer, oldval) {
            let that = this
            if (that.oldTagName != newer) {
                if (newer == null || oldval == null) {
                    return
                } else {
                    that.oldvalNames = oldval
                    that.navbarAddTags(newer)
                    that.navbarDelTags(oldval)
                    console.log('新的：' + newer)
                    console.log('旧的：' + oldval)
                }
            }
        },
　　　　deep: true
    },
    "tagsData": {
        handler: function(newer, oldval) {
            let that = this
            if (newer == null) {
                return
            } else {
                if (newer.length === 1) {
                    that.$router.push({path: newer[0].router})
                    that.headerNavbarName(newer[0].name)
                    that.navbarNames = newer[0].name

                }
                // console.log('------ tag数组列表：------');
                // console.log(oldval);
                // console.log(newer);
                // console.log('------  END数组列表 ------');
            }
        },
　　　　deep: true
    }
}

```
---

# 2、push -利用name 比对左侧导航栏拿到当前选中的数组对象 push到 tag数组列表

| 分析 | |
|--|--|
| 1、let dataMenu = that.menuItemData | - 左侧导航的数组 |
| 2、let name = names | - 当前点击左侧导航的 name 状态，为下面循环做铺垫 |
| **2、tagData.forEach( (el, i, item) => { if (item[i].name === name) {} }  | - 当前选中的 name 与数组中的 name 判断，`相等就把其 push 到备份数组中` |
| **3、let tagDataList = `that.mapFilter(that.tagsAdminList)` | - `关键 去重备份数组中的数据`，因为用户可能为点击相同路由，所以过滤一遍数组，将重复的剔除掉 |
| 3、that.tagsList = tagDataList; / that.headerTagsData(tagDataList); | - 最后，将去重后的数组赋值给 tagsList（tag数组列表），并将其缓存到 headerTagsData() 中，防止刷新丢失 |

```js
// 方法集合
methods: {
    ...mapMutations("localUser", ['headerTagsData', 'headerNavbarName', 'headerOldvalName']),
    navbarAddTags (names) {
        let that = this
        // 左导航点击后的 name 属性
        let name = names
        that.navbarNames = name
        // 左导航数组
        let dataMenu = that.menuItemData
        let tagData = []

        dataMenu.forEach( (el, i, item) => {
            let row = item[i].children
            row.forEach(element => {
                tagData.push(element)
            });
        });
        tagData.forEach( (el, i, item) => {
            if (item[i].name === name) {
                // push 到备份数组
                that.tagsAdminList.push(item[i])
            }
        });
        // 去重问题
        let tagDataList = that.mapFilter(that.tagsAdminList)
        // 最后赋值给 tag
        that.tagsList = tagDataList
        that.headerTagsData(tagDataList)
        // console.log('------ 主的数组：------');
        // console.log(tagDataList);
        // console.log('------  END数组 ------');
    }
}

```

--- 

# 3、tag 点击关闭的状态

| 分析 | |
|--|--|
| 1、let navbarName = getStore('navbarName') | - 拿到当前选中 tag name标识，为后面循环中匹配删除的是当前元素做铺垫。|
| 2、let oldval = that.oldvalNames | - 拿到旧的 tag name 标识，也就是上一个选中标识，为后面循环中匹配删除当前元素后，路由能跳转到该标识|
| 3、let data = that.tagsList; | - data 当前 tag 的数组列表 |
| 3、let backupData = that.tagsList; | - 再拿一份 tag 的备份数组列表 ，两个数组都为循环做铺垫 |
| 3、let backupTagsData = that.mapFilter(that.tagsAdminList); | - 拿到原先 tag 的备份数组列表，`并去重`，删除数组中的当前元素，否则会一直有重复的元素在里面 |
| 4、let del = event; | - 当前选中的删除元素 |
| *5、`for (let i = 0; i < backupData.length; i++)` {  if (backupData[i].name == navbarName && backupData[i].name == name) {} } | - 第一层循环判断，主要判断备份数组的name是否 等于 当前选中的 navbarName 标识，并且name 也等于 当前删除元素的 name，这样我们就能知道删除的是当前元素了。 |
| *5、`for (let j = 0; j < data.length; j++)` {  if (data[j].name == oldval) {} } | - 第二层循环判断，主要作用就是要拿到上一个的标识的路由了。因为 oldval 为记录的是上一个的tag标识的 name 了。这样我们就能在删除当前选中的元素后，成功跳转到上一个路由了 |
| *5、that.navbarNames = data[j].name; / that.headerNavbarName(data[j].name) | - headerNavbarName() 方法把旧的状态重新赋值上去，为当前的状态，也是为下面判断新旧相等时做铺垫。navbarNames 为tag高亮的状态 |
| *6、if (navbarName === oldval) {} | - 这一步的作用主要是`如果两个tag表示的 name 相等时`，我们就知道当前tag列表中是没有选中的状态，所以我们就要把tag数组中的第一个作为选中状态，有一个过渡 |
| 7、`data.remove(event);` / `backupTagsData.remove(event);` / that.tagsList = data; / that.tagsAdminList = backupTagsData;  | - 最后 就是删除当前选中的元素了。然后把删除元素的数组重新再赋值给 tag的数组（也就是原tag数组列表） |

#### 第6点 if (navbarName === oldval) {} 分析：

![sss](http://120.79.222.255/icon-tagOld.png)

#### `第7点 删除元素：`

```js
Array.prototype.indexOf = function(val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    let index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
/**
 *  数组对象去重
 */
mapFilter (arr) {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1))
},
```


## tag关闭代码部分：

```js
/**
 *  tag 删除
 */
onTagsClose (event) {
    let that = this
    // 删除缓存的 tag主的数组列表数据
    removeStore('tagsData')
    let navbarName = getStore('navbarName')
    let oldval = that.oldvalNames
    // console.log('当前状态：' + navbarName);
    // console.log('旧的状态：' + oldval);

    let data = that.tagsList
    let backupData = that.tagsList
    let backupTagsData = that.mapFilter(that.tagsAdminList)
    // 当前选中的元素
    let del = event
    let { title } = del
    let { name } = del

    if (that.tagsList.length === 1) {
        this.$Message.error({
            content: '小主~ 再删就快没掉了啦',
            duration: 3,
            background: true,
            onClose: () => {}
        })
    } else {
        // 删除当前 event元素 在原数组数据
        // 问题
        for (let i = 0; i < backupData.length; i++) {
            if (backupData[i].name == navbarName && backupData[i].name == name) {
                for (let j = 0; j < data.length; j++) {
                    if (data[j].name == oldval) {
                        that.$router.push({path: data[j].router})
                        that.headerNavbarName(data[j].name)
                        that.navbarNames = data[j].name
                        // 旧的状态
                        that.oldTagName = data[j].name
                        // console.log('最新状态：' + that.navbarNames);
                    }
                    backupData.remove(event)
                }
            } else {
                if (navbarName === oldval) {
                    that.$router.push({path: backupData[0].router})
                    that.headerNavbarName(backupData[0].name)
                    that.navbarNames = backupData[0].name
                }
            }
        }
        backupTagsData.remove(event)
        data.remove(event)

        that.tagsAdminList = backupTagsData
        that.tagsList = data
        that.headerTagsData(data)
        console.log('主的数组' + that.tagsList);
        console.log('备份数组' + that.tagsAdminList);
    }
}
```