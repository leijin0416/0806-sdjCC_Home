import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'
import filters from './filters'

import VueWechatTitle from 'vue-wechat-title'  //动态title
import DrawerLayout from 'vue-drawer-layout'

// npm install animate.css --save安装，在引入
import VueClipboard from 'vue-clipboard2'
import animated from 'animate.css'
//预览图片
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

// 全局引用样式
import "./style/reset.scss"
import "./style/common.scss"

/*
*	全局引用
* 	项目所需插件： UI、title、侧滑栏、动画
*/
/* UI框架 */
Vue.use(iView)
// 设置title
Vue.use(VueWechatTitle)
// 响应式侧滑栏
Vue.use(DrawerLayout)
// 动画
Vue.use(animated)
// 点击复制
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true

// 点击预览图片
Vue.use(Viewer)
Viewer.setDefaults({
    defaultOptions: {
        zIndex: 9999
    }
})

Vue.config.productionTip = false

// 如果是非线上环境，加载 VConsole（移动端适用）
// if (process.env.NODE_ENV !== 'production') {
//     var VConsole = require('vconsole/dist/vconsole.min.js');
//     var vConsole = new VConsole();
// }

// 全局过滤器
Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})

/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
