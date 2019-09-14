### Vuex 状态管理模式
```js
    npm install vuex --save
```
vuex 解决了组件之间同一状态的共享问题

知识点：https://github.com/LeeGitHub0817/summary

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
store/mutations/index.js

store/store.js

将 store 进行拆分，有利于我们更好的管理项目中的状态，以及使我们的项目维护更加加单高效。各个模块之间的开发互相不影响。

#### 在模块中调用：

1、main.js 注册store
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

2、模板

通过`store.js` 的`localData`暴露出的属性

"localData" - 模块名（嵌套层级要写清楚）

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