### Vuex 状态管理模式

Vuex Api：https://vuex.vuejs.org/zh/api

```js
    npm install vuex --save
```

vuex 是一个专门为vue.js应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化。vuex 解决了组件之间同一状态的共享问题。

![vuex](https://leijin0416.coding.me/images/08_04/icon-hd_0915.jpg) 


知识点：https://github.com/LeeGitHub0817/summary

知识点：https://www.jianshu.com/p/5624362cd1f4

```js
/**
 * 核心：
    state – 存放状态
    getters – state的计算属性
    mutations – 更改状态的逻辑，同步操作
    actions – 提交mutation，异步操作
    mudules – 将store模块化
 */

//模块成为带有命名空间的模块
namespaced: true
```
store/modules/index.js

store/store.js

将 store 进行拆分，有利于我们更好的管理项目中的状态，以及使我们的项目维护更加加单高效。各个模块之间的开发互相不影响。

---

### 在组件中调用：

通过`store.js` 的`localData`暴露出的属性;

#### 1、main.js 注册store

```js
/**
 *  Vue 实例上得将 挂载 store
 */
import store from './store'

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
```

#### 2、组件

("localData", [ ]) - 模块名（嵌套层级要写清楚）;

```js
// 辅助函数
import { mapState, mapMutations, mapActions, mapGetters } from "vuex"

export default {
    name: 'template',
    //实时监听
    watch: {
        'user_Session': {
            handler: function(newer, older) {
                if (newer == null) {
                    return
                } else {
                    // methods中定义好的获取数据列表的方法
                    this.getList(newer);
                    //console.log(newer);
                }
            },
    　　　　deep: true
        },
        
    },
    computed: {
        //取
        ...mapGetters("localData", ["user_Session", ]),
    },
    methods: {
        //传
        ...mapMutations("localData", ['handleUserSession', ]),

        OnActivesClick(val){
            //console.log(val);
            this.handleUserSession(val);
        },
        getList(val) {},
    },
}
```

#### 辅助函数 -这里用到了es6的扩展运算符

- ...mapMutations("localData") - localData 是指 modules 文件夹下的 localData.js

- "handleUserSession" - localData.js 文件中的 mutations 里的方法，在上面的 @click 中执行并传入实参